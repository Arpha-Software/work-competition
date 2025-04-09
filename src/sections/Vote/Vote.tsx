'use client';

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCookie } from 'cookies-next';

import { WorkCard } from "@/components/WorkCard";
import { Loader } from "@/components/Loader";
import { LoginModal } from "../../components/LoginModal";
import { getSubmissions, likeSubmission, type Submission } from '@/api/submissions';
import type { Work } from '@/utils/types';
import { usePathname } from "next/navigation";

type VoteProps = {
  category: string;
  subcategory: string;
};

const transformSubmissionToWork = (submission: Submission): Work => ({
  id: submission.id,
  title: submission.fullName,
  subtitle: submission.category,
  fileAccessLink: {
    accessType: 'public',
    url: `${submission.file.accessLink}`,
    mimeType: submission.file.mimeType
  },
  likes: submission.numberOfVotes,
  date: submission.submittedAt,
  region: submission.region,
  public: submission.public,
  hidden: submission.hidden,
  currentUserVoted: submission.currentUserVoted
});

export const Vote = ({ category, subcategory }: VoteProps) => {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await getSubmissions('all', category, subcategory);

        const publicSubmissions = response.content.filter(
          submission => submission.public && !submission.hidden
        );

        const transformedWorks = publicSubmissions.map(transformSubmissionToWork);

        setWorks(transformedWorks);
      } catch (error: any) {
        console.error('Error fetching submissions:', error);
        toast.error('Помилка при завантаженні робіт');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorks();
  }, [category]);

  const handleLike = async (id: number) => {
    const token = getCookie('authToken');

    if (!token) {
      localStorage.setItem('lastRoute', pathname);

      setSelectedWorkId(id);
      setIsLoginModalOpen(true);

      return;
    }

    try {
      const response = await likeSubmission(id);

      if (response.status !== 200) {
        if (response.status === 409) {
          toast.error("Ви вже голосували за цю роботу!");
        } else {
          toast.error("Помилка при голосуванні");
        }
        return;
      }

      setWorks((prevWorks) =>
        prevWorks.map((work) =>
          work.id === id
            ? {
                ...work,
                currentUserVoted: true,
                likes: work.likes + 1
              }
            : work
        )
      );

      localStorage.removeItem('lastRoute');

      toast.success("Ваш голос успішно зараховано!");
    } catch (error) {
      console.error('Error voting for submission:', error);
      toast.error("Помилка при голосуванні");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-28 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {works.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Немає робіт для голосування в цій категорії</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-10">
          {works.map(({ id, title, likes, currentUserVoted, fileAccessLink }) => (
            <WorkCard key={id}>
              <WorkCard.File fileAccessLink={fileAccessLink} />

              <div className="flex flex-col p-4">
                <WorkCard.LikeCount
                  count={likes}
                />

                <WorkCard.Title title={title} className="h-24 mt-4 mb-4" />

                <WorkCard.ButtonWrap
                  isLiked={currentUserVoted || false}
                  onClick={() => handleLike(id)}
                >
                  Подобається
                </WorkCard.ButtonWrap>
              </div>
            </WorkCard>
          ))}
        </section>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

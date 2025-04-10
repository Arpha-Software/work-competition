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
import { PAGE_SIZE } from '@/utils/constants';

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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        const response = await getSubmissions('all', category, subcategory, page, PAGE_SIZE);

        const transformedWorks = response.content.map(transformSubmissionToWork);

        setWorks(transformedWorks);
        setTotalPages(response.totalPages);
      } catch (error: any) {
        console.error('Error fetching submissions:', error);
        toast.error('Помилка при завантаженні робіт');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorks();
  }, [category, subcategory, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
    } catch (error: any) {
      console.error('Error voting for submission:', error);

      if (error.status === 400) {
        toast.error(error.response.data.title);
        return;
      }

      toast.error("Помилка при голосуванні");
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-28 flex justify-center items-center">
          <Loader />
        </div>
      ) : works.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Немає робіт для голосування в цій категорії</p>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {works.map(({ id, title, likes, currentUserVoted, fileAccessLink }) => (
              <WorkCard key={id} className="justify-self-center w-full max-w-[350px]">
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

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
              >
                &#60;
              </button>

              <span>{page + 1} із {totalPages}</span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page + 1 >= totalPages}
                className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
              >
                &#62;
              </button>
            </div>
          )}
        </>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

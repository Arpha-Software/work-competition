'use client';

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getWorksByCategoryId, likeWork } from "@/api/works";
import WorkCard from "@/components/WorkCard";
import { Loader } from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";  // To handle modal navigation

type VoteProps = {
  category: string;
  subcategory: string;
};

type Work = {
  id: number;
  fullName: string;
  numberOfLikes: number;
  alreadyVoted: boolean;
  fileAccessLink: {
    accessType: string;
    url: string;
    mimeType: string;
  };
};

export const Vote = ({ category, subcategory }: VoteProps) => {
  const { accessToken, isAuthenticated } = useAuth();
  const router = useRouter();

  const [works, setWorks] = useState<Work[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(9);
  const [initialLoad, setInitialLoad] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        const response = await getWorksByCategoryId(category, subcategory, pageSize, page);
        setWorks(response.content);
        setTotalPages(response.totalPages);
      } catch (error: any) {
        toast.error('Не вдалось отримати роботи.');
      } finally {
        setInitialLoad(false);
        setIsLoading(false);
      }
    };

    fetchWorks();
  }, [category, page, pageSize]);

  const handleLike = async (id: number) => {
    if (!isAuthenticated) {
      router.push('/login');

      return;
    }

    const response = await likeWork(id, accessToken);

    if (!response.ok) {
      toast.error("Ви вже голосували за цю роботу!");
      return;
    }

    setWorks((prevWorks) =>
      prevWorks.map((work) =>
        work.id === id ? { ...work, alreadyVoted: true } : work
      )
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-10">
        {isLoading && (
          <div className="w-full h-28 flex justify-center items-center">
            <Loader />
          </div>
        )}

        {works.map(({ id, fullName, numberOfLikes, alreadyVoted, fileAccessLink }) => (
          <WorkCard key={id}>
            <WorkCard.File fileAccessLink={fileAccessLink} />

            <div className="flex flex-col p-4">
              <WorkCard.LikeCount
                count={numberOfLikes + (alreadyVoted ? 1 : 0)}
              />

              <WorkCard.Title title={fullName} className="h-24 mt-4 mb-4" />

              <WorkCard.ButtonWrap
                isLiked={alreadyVoted}
                onClick={() => handleLike(id)}
              >
                Подобається
              </WorkCard.ButtonWrap>
            </div>
          </WorkCard>
        ))}
      </section>

      {initialLoad && (
        <div className="w-full h-28 flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="w-full h-10 flex justify-center items-center">
        {!initialLoad && works.length === 0 && <div>Робіт не знайдено.</div>}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 mx-2 bg-primary-50 rounded disabled:opacity-50"
          >
            &#60;
          </button>

          <span>{page + 1} із {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 mx-2 bg-primary-50 rounded disabled:opacity-50"
          >
            &#62;
          </button>
        </div>
      )}
    </div>
  );
};

import { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";

import { getWorksByCategoryId, likeWork } from "@/api/works";
import { shuffleItems } from "@/tools/helpers";

import WorkCard from "@/components/WorkCard";
import { Loader } from "@/components/Loader";

type VoteProps = {
  category: string;
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

export const Vote = ({ category }: VoteProps) => {
  const [works, setWorks] = useState<Work[]>([]);
  const [visibleWorks, setVisibleWorks] = useState<Work[]>([]);
  const [page, setPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await getWorksByCategoryId(category, false);

        setWorks(response);
        setVisibleWorks(response.slice(0, 6));
      } catch (error: any) {
        toast.error(error.details);
      } finally {
        setInitialLoad(false);
      }
    };

    fetchWorks();
  }, [category]);

  const handleLike = async (id: number) => {
    const response = await likeWork(id);

    if (!response.ok) {
      toast.error("Ви вже голосували за цю роботу!");
      return;
    }

    setVisibleWorks((prevWorks) =>
      prevWorks.map((work) =>
        work.id === id ? { ...work, alreadyVoted: true } : work
      )
    );
  };

  const loadMoreWorks = useCallback(() => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      const newVisibleWorks = works.slice(0, nextPage * 9);
      setVisibleWorks(newVisibleWorks);
      return nextPage;
    });
  }, [works]);

  useEffect(() => {
    if (loaderRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreWorks();
          }
        },
        {
          root: null,
          rootMargin: "20px",
          threshold: 1.0,
        }
      );

      observer.observe(loaderRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [loadMoreWorks]);

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-10">
        {visibleWorks.map(({ id, fullName, numberOfLikes, alreadyVoted, fileAccessLink }) => (
          <WorkCard key={id}>
            <WorkCard.File fileAccessLink={fileAccessLink} />

            <div className="flex flex-col p-4">
              {category === "Мистецтво, що рятує життя" ? (
                <WorkCard.LikeCount
                  count={numberOfLikes + (alreadyVoted ? 1 : 0)}
                />
              ) : null}

              <WorkCard.Title title={fullName} className="h-24 mt-4 mb-4" />

              {category === "Мистецтво, що рятує життя" ? (
                <WorkCard.ButtonWrap
                  isLiked={alreadyVoted}
                  onClick={() => handleLike(id)}
                >
                  Подобається
                </WorkCard.ButtonWrap>
              ) : null}
            </div>
          </WorkCard>
        ))}
      </section>
      {initialLoad && (
        <div className="w-full h-28 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div ref={loaderRef} className="w-full h-10 flex justify-center items-center">
        {!initialLoad && visibleWorks.length < works.length && <Loader />}
      </div>
    </div>
  );
};

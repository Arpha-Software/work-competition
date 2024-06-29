import { useState, useEffect, use } from "react";
import toast from "react-hot-toast";

import { getWorksByCategoryId, likeWork } from "@/api/works";

import WorkCard from "@/components/WorkCard";
import { Loader } from "@/components/Loader";
import { shuffleItems } from "@/tools/helpers";

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
}

export const Vote = ({ category }: VoteProps) => {
  const [works, setWorks] = useState<Work[] | null>(null);
  const [likedCards, setLikedCards] = useState<number[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const forVoting = category === "Мистецтво, що рятує життя";

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await getWorksByCategoryId(category, forVoting);
        setWorks(shuffleItems(response));
        setInitialLoad(false);
      } catch (error: any) {
        toast.error(error.details);
      }
    };

    if (initialLoad) {
      fetchWorks();
    }
  }, [category, forVoting, initialLoad]);

  const handleLike = async (id: number) => {
    const response = await likeWork(id);

    if (!response.ok) {
      toast.error("Ви вже голосували за цю роботу!");
      return;
    }

    setLikedCards([...likedCards, id]);
  };

  if (!works) {
    return (
      <div className="w-full flex justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-10">
      {works.map(({ id, fullName, numberOfLikes, alreadyVoted, fileAccessLink }) => (
        <WorkCard key={id}>
          <WorkCard.File fileAccessLink={fileAccessLink} />

          <div className="flex flex-col p-4">
            {category === "Мистецтво, що рятує життя" ? (
              <WorkCard.LikeCount
                count={numberOfLikes + (likedCards.includes(id) ? 1 : 0)}
              />
            ) : null}

            {/* <WorkCard.Subtitle subtitle={author} className="mt-4 mb-2" /> */}

            <WorkCard.Title title={fullName} className="h-24 mt-4 mb-4" />

            {category === "Мистецтво, що рятує життя" ? (
              <WorkCard.ButtonWrap
                isLiked={alreadyVoted || likedCards.includes(id)}
                onClick={() => handleLike(id)}
              >
                Подобається
              </WorkCard.ButtonWrap>
            ) : null}
          </div>
        </WorkCard>
      ))}
    </section>
  );
};

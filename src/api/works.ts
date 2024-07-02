import { shuffleItems } from "@/tools/helpers";

export const getWorksByCategoryId = async (categoryName: string, isApproved: boolean) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${categoryName}?forVoting=${isApproved}`);

  if (!response.ok) {
    throw new Error("Failed to fetch works");
  }

  const works = await response.json();
  const shuffledWorks = shuffleItems(works);

  return shuffledWorks;
};

export const likeWork = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/vote`, {
    method: "PUT",
  });

  return response;
};

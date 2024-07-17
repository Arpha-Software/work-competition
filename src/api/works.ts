import { shuffleItems } from "@/tools/helpers";

export const getWorksByCategoryId = async (
  categoryName: string,
  subCategoryName: string,
  size: number,
  page: number,
  isApproved: boolean,
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${categoryName}?subcategory=${subCategoryName}&size=${size}&page=${page}&forVoting=true`);

  if (!response.ok) {
    throw new Error("Failed to fetch works");
  }

  const works = await response.json();
  const shuffledWorks = shuffleItems(works.content);

  return { shuffledWorks, ...works };
};

export const likeWork = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/vote`, {
    method: "PUT",
  });

  return response;
};

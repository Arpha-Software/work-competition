import { shuffleItems } from "@/tools/helpers";

export const getWorksByCategoryId = async (
  categoryName: string,
  subCategoryName: string,
  size: number,
  page: number,
  accessToken: string,
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${categoryName}?subcategory=${subCategoryName}&size=${size}&page=${page}&forVoting=true`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch works");
  }

  const works = await response.json();
  const shuffledWorks = shuffleItems(works.content);

  return { shuffledWorks, ...works };
};

export const likeWork = async (id: number, accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/vote`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return response;
};

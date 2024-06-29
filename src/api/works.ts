export const getWorksByCategoryId = async (categoryName: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${categoryName}`);

  if (!response.ok) {
    throw new Error("Failed to fetch works");
  }

  return response.json();
};

export const likeWork = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/vote`, {
    method: "PUT",
  });

  return response;
};

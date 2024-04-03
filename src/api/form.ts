export async function submitForm(data: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    method: "POST",
    body: data,
  });

  if (response.ok) {
    return { success: true };
  }

  return { success: false };
}

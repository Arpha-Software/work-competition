import toast from "react-hot-toast";

export async function submitForm(data: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    toast.error('Не вдалося відправити, перевірте будь ласка введені дані!');
    return;
  }

  return response.json();
}

export async function putFile(file: any, url: string) {
  const response = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "x-ms-blob-type": "BlockBlob",
    }
  });

  if (!response.ok) {
    toast.error('Не вдалося відправити, перевірте будь ласка введені дані!');
    return;
  }

  toast.success('Дані успішно відправлені!');
  return response;
}

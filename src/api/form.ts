export async function submitForm(data: any) {
  console.log("data", data);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  });

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

  return response;
}

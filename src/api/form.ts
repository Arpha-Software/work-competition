import toast from "react-hot-toast";

export async function submitForm(data: any, file: File) {
  try {
    const formData = new FormData();

    const requestData = {
      ...data,
      agreement: data.agreement ? "YES" : "NO",
      ...(data.additionalInfo ? { comment: data.additionalInfo } : {}),
    };

    if (requestData.additionalInfo) {
      delete requestData.additionalInfo;
    }

    const requestBlob = new Blob([JSON.stringify(requestData)], { type: 'application/json' });
    formData.append('request', requestBlob);

    formData.append('file', file, file.name);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error submitting form:', errorData);

      if (errorData.detail?.includes('file')) {
        toast.error('Неправильний формат файлу. Будь ласка, перевірте файл та спробуйте ще раз.');
      }

      const errors = errorData?.errors?.map((err: any) => ({
        errorMessage: err.errorMessage || 'Невідома помилка'
      })) || [];

      throw {
        message: 'Form submission failed',
        errors,
      };
    }

    return response.json();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
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

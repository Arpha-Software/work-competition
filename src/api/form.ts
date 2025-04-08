import toast from "react-hot-toast";

export async function submitForm(data: any, file: File) {
  try {
    // Create a FormData object
    const formData = new FormData();
    
    // Convert agreement to "YES" or "NO"
    const requestData = {
      ...data,
      agreement: data.agreement ? "YES" : "NO",
      // Rename additionalInfo to comment if it exists
      ...(data.additionalInfo ? { comment: data.additionalInfo } : {}),
    };
    
    // Remove additionalInfo if it exists to avoid duplication
    if (requestData.additionalInfo) {
      delete requestData.additionalInfo;
    }
    
    // Add the request data as a JSON Blob
    const requestBlob = new Blob([JSON.stringify(requestData)], { type: 'application/json' });
    formData.append('request', requestBlob);
    
    // Add the file with its original type
    formData.append('file', file, file.name);
    
    // Send the request
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header, let the browser set it with the boundary
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error submitting form:', errorData);
      
      // Check if the error response contains a specific message about file format
      if (errorData.detail?.includes('file')) {
        toast.error('Неправильний формат файлу. Будь ласка, перевірте файл та спробуйте ще раз.');
      } else {
        toast.error('Не вдалося відправити, перевірте будь ласка введені дані!');
      }
      throw new Error('Form submission failed');
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

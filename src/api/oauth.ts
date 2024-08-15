export async function exchangeCode(payload: any, provider: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exchange-code/${provider}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error exchanging code:', error);
    });

  return response;
}

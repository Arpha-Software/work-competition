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

export async function authorization(payload: any, provider: string) { 
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/${provider}`, {
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
      console.error('Error authorising:', error);
    });

  return response;
}

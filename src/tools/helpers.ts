export const cutFileName = (name: string) => name.length > 10 ? `${name.slice(0, 10)}...` : name;

export const repeatArray = (arr: string[], count: number) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(...arr);
  }
  return result;
};

export const shuffleItems = (array: Array<any>) => {
  return array.sort(() => Math.random() - 0.5);
};

export const decodeToken = (token: string) => {
  try {
    if (typeof token !== 'string' || token.split('.').length < 2) {
      console.error('Invalid token format');
      return null;
    }
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      console.error('Invalid token: Missing payload');
      return null;
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    const decoded = JSON.parse(jsonPayload);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

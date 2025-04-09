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
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = atob(base64);
  const decoded = JSON.parse(jsonPayload);

  return decoded;
}

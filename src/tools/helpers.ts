export const cutFileName = (name: string) => name.length > 10 ? `${name.slice(0, 10)}...` : name;

export const repeatArray = (arr: string[], count: number) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(...arr);
  }
  return result;
};

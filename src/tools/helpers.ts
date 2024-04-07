export const cutFileName = (name: string) => name.length > 10 ? `${name.slice(0, 10)}...` : name;

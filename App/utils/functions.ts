export const getNotNullValues = (arr: any[]) => {
  const newArr = arr.filter(el => el !== null && el !== undefined);
  return newArr;
};

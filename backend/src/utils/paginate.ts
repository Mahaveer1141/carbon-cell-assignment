export function paginate(data: any[], page: number, limit: number) {
  page--;
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
}

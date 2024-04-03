export async function fetchData(url: string): Promise<any> {
  return (await fetch(url)).json();
}

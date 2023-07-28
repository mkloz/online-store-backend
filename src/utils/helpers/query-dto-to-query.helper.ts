export function queryDtoToQuery(
  object: Record<string, string | number | undefined>,
): string {
  return Object.keys(object)
    .reduce(
      (query, value) =>
        object[value] ? `${query}&${value}=${object[value]}` : query,
      '',
    )
    .replace(/^&/, '');
}

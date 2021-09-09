export function getMapping(obj: Record<string, any>) {
  return [
    obj,
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [obj[key]]: key,
      }),
      {}
    ),
  ]
}

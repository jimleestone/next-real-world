export function isInArray<T, A extends T>(item: T, array: ReadonlyArray<A>): item is A {
  return array.includes(item as A);
}

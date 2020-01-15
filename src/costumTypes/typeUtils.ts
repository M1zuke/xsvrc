export function isAction<T>(object: any, action: string): object is T {
  return object.type === action;
}

export function stringify<T extends Record<string, number>>(
  o: T
): {
  [k in keyof T]: string;
} {
  return Object.fromEntries(
    Object.entries(o).map(([k, v]) => [k, v.toString()])
  ) as { [k in keyof T]: string };
}

export function getFormData(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
  return Object.fromEntries(new FormData(e.target as HTMLFormElement));
}

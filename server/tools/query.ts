import { Op } from "@sequelize/core";

export function nonNullable<T>(a: T): a is NonNullable<T> {
  return Boolean(a);
}
export function queryTowhere<
  T extends Record<string, string | number | [number, number] | undefined>
>(q: T) {
  return Object.fromEntries(
    Object.entries(q)
      .filter(([k, v]) => nonNullable(v))
      .map(([k, v]) => [
        k,
        Array.isArray(v)
          ? {
              [Op.between]: v,
            }
          : v,
      ])
  );
}

const o: {
  a?: number | undefined;
} = {
  a: Math.random() > 0.5 ? 1 : undefined,
};

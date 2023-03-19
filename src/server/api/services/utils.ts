// Exclude keys from model
export function exclude<T, Key extends keyof T>(
  model: T,
  keys: Key[]
): Omit<T, Key> {
  for (let key of keys) {
    delete model[key];
  }
  return model;
}

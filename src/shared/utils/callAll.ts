interface CallBack<Params extends unknown[]> {
  (...args: Params): void
}
export const callAll =
  <Params extends unknown[]>(...fns: Array<CallBack<Params> | undefined>) =>
  (...args: Params) =>
    fns.forEach((fn) => typeof fn === 'function' && fn(...args))

let timer: NodeJS.Timeout;

/**
 * Returns a function that delays invoking callback until after delay milliseconds have elapsed since the last time the returned function was invoked.
 * @param callback
 * @param delay
 */
export const debounceEvent = (callback: (event: Event) => void, delay: number) => (event: Event) => {
  clearTimeout(timer);

  timer = setTimeout(
    () => {
      callback.apply(this, [event]);
    },
    delay,
  );
};
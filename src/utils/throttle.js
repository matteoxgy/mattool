export function throttle(fn, time) {
  let timer = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();

      clearTimeout(timer);
      timer = null;
    }, time);
  };
}

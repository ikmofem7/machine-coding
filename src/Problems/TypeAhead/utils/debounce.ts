// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (func: (args: any) => void, delay: number = 300) => {
  let timer;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export { debounce };

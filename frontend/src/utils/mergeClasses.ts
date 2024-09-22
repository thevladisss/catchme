export const mergeClasses = (...classes: string[]) => {
  return classes.reduce((accum, className) => {
    return `${accum} ${className}`;
  }, "");
};

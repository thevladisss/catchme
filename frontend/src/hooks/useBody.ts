export const useBody = () => {
  const preventScroll = () => {
    const initialHeight = document.body.style.height;
    const initialOverflow = document.body.style.overflowY;

    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.height = initialHeight;
      document.body.style.overflowY = initialOverflow;
    };
  };

  return { preventScroll };
};

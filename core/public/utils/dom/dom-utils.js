export const loadScript = (src, cb) => {
  const headElement = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.onload = cb;
  script.src = src;

  headElement.appendChild(script);
};

export default {
  loadScript,
};

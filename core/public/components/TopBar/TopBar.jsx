// eslint-disable-next-line no-unused-vars
const createTopBarTemplate = React => ({
  className = '',
  children,
}) =>
  <div className={`top-bar ${className}`}>
    {children}
  </div>;

export default createTopBarTemplate;

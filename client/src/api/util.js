export const getBaseUrl = () => {
    if (process.env.NODE_ENV === "production")
      return `${process.env.REACT_APP_API}`;
    if (process.env.NODE_ENV === "preview")
      return `${process.env.REACT_APP_API}`;
    return "http://localhost:8000";
  };
import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useSelector } from "react-redux";

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();

  const { currentClient} = useSelector((state) => state.client);


  let pageName = "";

  if (currentClient) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
};

export default PageRender;

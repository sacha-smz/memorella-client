import React from "react";

import "./Page.scss";

const Page = ({ className, children }) => (
  <div className={"page-container " + className}>{children}</div>
);

export default Page;

import React from "react";

const Page = ({ className, children }) => (
  <div className={"page-container " + className}>{children}</div>
);

export default Page;

import React, { useCallback } from "react";
import { useHistory, Link as Anchor } from "react-router-dom";

const Link = props => {
  const history = useHistory();

  const { children, to } = props;

  const redirect = useCallback(() => {
    history.push(to);
  }, [history, to]);

  return React.isValidElement(children) ? (
    <children.type {...children.props} onClick={redirect} />
  ) : (
    <Anchor {...props} />
  );
};

export default Link;

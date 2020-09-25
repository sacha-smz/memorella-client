import { useEffect } from "react";

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};

export default Logout;

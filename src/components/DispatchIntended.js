import React, { useEffect } from "react";

const DispatchIntended = ({ dispatchIntended }) => {
  useEffect(() => {
    dispatchIntended();
  }, [dispatchIntended]);
  return <></>;
};

export default DispatchIntended;

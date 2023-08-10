import React from "react";
import ErrorImage from "../../Images/Error.png";

const ErrorPage = () => {
  return (
    <React.Fragment>
      <img
        src={ErrorImage}
        alt="Error"
        style={{
          width: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
          height:"80%",
          position: "absolute",
          top: "100px",
        }}
      />
    </React.Fragment>
  );
};

export default ErrorPage;

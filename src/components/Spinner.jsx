import React from "react";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ScaleLoader color={"#123abc"} loading={true} css={override} size={150} />
    </div>
  );
};

export default LoadingIndicator;

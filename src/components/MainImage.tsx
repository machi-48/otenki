import React from "react";

type Props = {
  name: string;
  isLoading: boolean;
  isError: boolean;
};

const imageName = (name: string, isLoading: boolean, isError: boolean) => {
  if (isLoading) {
    return "wait";
  } else if (isError) {
    return "error";
  } else {
    return name;
  }
};

export const MainImage: React.FC<Props> = (Props) => (
  <img
    src={`./weather/${imageName(
      Props.name,
      Props.isLoading,
      Props.isError
    )}.png`}
    width="600"
    height="600"
    alt={Props.name}
  />
);

export default MainImage;

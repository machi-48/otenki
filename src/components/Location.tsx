import React from "react";

type Props = {
  address: string;
};

export const Location: React.FC<Props> = (Props) => (
  <div className="content__location">{Props.address}</div>
);

export default Location;

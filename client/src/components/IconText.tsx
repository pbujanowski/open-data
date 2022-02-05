import React from "react";

type IconTextProps = {
  icon: React.ElementType;
  text: string;
};

const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {React.createElement(icon)}
      <span>{text}</span>
    </div>
  );
};

export default IconText;

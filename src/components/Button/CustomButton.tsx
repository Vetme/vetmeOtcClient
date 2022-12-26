import React from "react";
import { Button } from ".";
import { IconWrapper, Loader } from "..";
import { Loading } from "../Icons";

interface BtnI {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  classNames?: string;
}

const CustomButton = ({
  classNames,
  text,
  onClick,
  loading,
  disabled,
}: BtnI) => {
  return (
    <Button className={`${classNames}`} disabled={disabled} onClick={onClick}>
      {text}
      {loading && <Loading />}
    </Button>
  );
};

export default CustomButton;

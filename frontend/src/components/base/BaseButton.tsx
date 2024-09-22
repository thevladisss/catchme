import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import { ComponentChildren } from "../../interface/ComponentChildren";
import { mergeClasses } from "../../utils/mergeClasses";

type BaseButtonProps = React.HTMLProps<any> &
  ComponentChildren &
  ButtonProps & {
    fontSize?: string;
    width?: string;
    height?: string;
  };

const defaultProps = {
  color: "primary",
};

export default function BaseButton(props: BaseButtonProps) {
  const { fontSize, width, height, children, ...passThroughProps } = props;

  return <Button {...passThroughProps}>{children}</Button>;
}

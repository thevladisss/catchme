import * as React from "react"
import {Button} from "@mui/material";
import {ComponentChildren} from "../../interface/ComponentChildren";
import {mergeClasses} from "../../utils/mergeClasses";

type BaseButtonProps = React.HTMLProps<any> & ComponentChildren & {
  fontSize?: string;
  width?: string;
  height?: string;
};

const defaultProps = {
  color: "primary"
};

export default function BaseButton(props: BaseButtonProps) {

  return (<Button { ...props}>
      {props.children}
  </Button>)
}

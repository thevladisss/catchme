import { Dialog, DialogProps } from "@mui/material";
import * as React from "react";
import { ComponentChildren } from "../../interface/ComponentChildren";

type BaseDialogProps = React.HTMLProps<any> &
  Partial<ComponentChildren> &
  DialogProps & {};

export default function BaseDialog(props: BaseDialogProps) {
  return <Dialog {...props}>{props.children}</Dialog>;
}

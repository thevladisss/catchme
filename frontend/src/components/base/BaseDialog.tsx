import { Dialog, DialogProps } from "@mui/material";
import * as React from "react";

type BaseDialogProps = React.HTMLProps<any> &
  React.PropsWithChildren<DialogProps & {}>

export default function BaseDialog(props: BaseDialogProps) {
  return <Dialog {...props}>{props.children}</Dialog>;
}

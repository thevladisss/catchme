import { Dialog, DialogProps } from "@mui/material";
import * as React from "react";

type BaseDialogProps = React.HTMLProps<any> &
  Partial<{ children: React.ReactNode; }> &
  DialogProps & {};

export default function BaseDialog(props: BaseDialogProps) {
  return <Dialog {...props}>{props.children}</Dialog>;
}

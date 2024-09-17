import {Dialog} from "@mui/material";
import * as React from "react";
import {ComponentChildren} from "../../interface/ComponentChildren";

type BaseDialogProps = React.HTMLProps<any> & Partial<ComponentChildren> & {
  open: boolean
};

export default function BaseDialog(props: BaseDialogProps) {

  return (
    <Dialog open={props.open}>{props.children}</Dialog>
  );
}

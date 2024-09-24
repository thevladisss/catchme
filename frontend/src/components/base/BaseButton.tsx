import * as React from "react";
import { Button, ButtonProps } from "@mui/material";
import { mergeClasses } from "../../utils/mergeClasses";
import { useMemo } from "react";

type BaseButtonProps = React.HTMLProps<any> &
  React.PropsWithChildren<
    ButtonProps & {
      fontSize?: string;
      width?: string;
      height?: string;
      square?: boolean;
    }
  >;

const defaultProps = {
  color: "primary",
};

export default function BaseButton(props: BaseButtonProps) {
  const { square, fontSize, width, height, children, ...passThroughProps } =
    props;

  const styles = useMemo(() => {
    return Object.assign({}, square ? { borderRadius: 0 } : {});
  }, [square, fontSize, height, width]);

  return (<>
    <Button style={styles} {...passThroughProps}>
      {children}
    </Button>
  </>);
}

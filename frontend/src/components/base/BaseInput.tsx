import { TextField, TextFieldProps } from "@mui/material";

type BaseInputProps = TextFieldProps & {};
export default function BaseInput(props: BaseInputProps) {
  return <TextField {...props}></TextField>;
}

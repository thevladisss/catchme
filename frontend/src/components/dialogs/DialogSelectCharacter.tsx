import BaseDialog from "../base/BaseDialog";
import BaseButton from "../base/BaseButton";
import {IconButton, Color} from "@mui/material"
import "./DialogSelectCharacter.css";
import { ChangeEvent} from "react";

type DialogSelectCharacterProps = {
  open: boolean;

  onCharacterSelected: (settings: {color: string}) => void;
  onBack: () => void;
}
export default function DialogSelectCharacter(props: DialogSelectCharacterProps) {

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    props.onCharacterSelected({color: value})
  }

  return (
    <BaseDialog className="dialog-select-character" open={props.open} maxWidth="lg">{
      <div>
        <div className="dialog-select-character-header">
          <BaseButton onClick={props.onBack}>Back</BaseButton>
        </div>
        <div className="dialog-select-character-content">
          <p className="row justify-center p-2">
            <input type="color" onChange={handleColorChange} />
          </p>
          <div className="p-2">
            Something
          </div>
        </div>
      </div>
    }</BaseDialog>
  )
}

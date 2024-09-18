import BaseDialog from "../base/BaseDialog";
import BaseButton from "../base/BaseButton";
import {IconButton, Color} from "@mui/material"
import "./DialogSelectCharacter.css";
import {ChangeEvent, useState} from "react";
import BaseInput from "../base/BaseInput";

type DialogSelectCharacterProps = {
  open: boolean;
  color: string;
  nickname: string;

  onCharacterSaved: (settings: {color: string, nickname: string}) => void;
  onBack: () => void;
}
export default function DialogSelectCharacter(props: DialogSelectCharacterProps) {

  const [character, setCharacter] = useState({
    nickname: props.nickname ? props.nickname : "",
    color: props.color ? props.color : ""
  })
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setCharacter((prevState) => ({...prevState, color: value}))
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setCharacter((prevState) => ({...prevState, nickname: value}))
  }

  const handleSaveCharacter = () => {
    props.onCharacterSaved(character)
  }

  return (
    <BaseDialog className="dialog-select-character" open={props.open} maxWidth="lg">{
      <div>
        <div className="dialog-select-character-header">
          <BaseButton onClick={props.onBack}>Back</BaseButton>
        </div>
        <div className="dialog-select-character-content">
            <form onSubmit={(e) => e.preventDefault()} className="w-full p-2">
              <div className="form-control flex items-center gap-1">
                <label htmlFor="colorPicker">
                  Select color for your character
                </label>
                <input name="colorPicker" id="colorPicker" type="color" onChange={handleColorChange} defaultValue={character.color} />
              </div>
              <div className="form-control flex items-center gap-1 mt-2">
                <label htmlFor="nicknameInput">
                  Select name of your character
                </label>
                <BaseInput size="small" name="nicknameInput" id="nicknameInput" type="text" onChange={handleChangeName} defaultValue={character.nickname} />
              </div>
            </form>
        </div>
        <div className="p-2 dialog-select-character-actions">
          <BaseButton onClick={handleSaveCharacter}>
            Save
          </BaseButton>
        </div>
      </div>
    }</BaseDialog>
  )
}

import BaseDialog from "../base/BaseDialog";
import BaseButton from "../base/BaseButton";
import { IconButton, Color, Typography } from "@mui/material";
import "./DialogSelectCharacter.css";
import { ChangeEvent, FormEvent, useState } from "react";
import BaseInput from "../base/BaseInput";

type DialogSelectCharacterProps = {
  open: boolean;
  color: string;
  nickname: string;

  onCharacterSaved: (settings: { color: string; nickname: string }) => void;
  onBack: () => void;
};
export default function DialogSelectCharacter(
  props: DialogSelectCharacterProps,
) {
  const [character, setCharacter] = useState({
    nickname: props.nickname ? props.nickname : "",
    color: props.color ? props.color : "",
  });
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setCharacter((prevState) => ({ ...prevState, color: value }));
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setCharacter((prevState) => ({ ...prevState, nickname: value }));
  };

  const handleSaveCharacter = () => {
    props.onCharacterSaved(character);
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    handleSaveCharacter();
  };

  return (
    <BaseDialog
      className="dialog-select-character"
      open={props.open}
      maxWidth="lg"
    >
      {
        <div>
          <div className="dialog-select-character-header">
            <Typography className="flex items-center pl-2">
              Character settings
            </Typography>
            <BaseButton onClick={props.onBack}>Back</BaseButton>
          </div>
          <div className="dialog-select-character-content">
            <div className="mb-2">Customize your character</div>
            <form onSubmit={handleSubmitForm} className="w-full">
              <div className="form-control flex items-center gap-1">
                <label htmlFor="colorPicker">
                  Select color for your character
                </label>
                <input
                  name="colorPicker"
                  id="colorPicker"
                  type="color"
                  onChange={handleColorChange}
                  defaultValue={character.color}
                />
              </div>
              <div className="form-control flex items-center gap-1 mt-2">
                <label htmlFor="nicknameInput">
                  Select name of your character
                </label>
                <BaseInput
                  size="small"
                  name="nicknameInput"
                  id="nicknameInput"
                  type="text"
                  onChange={handleChangeName}
                  defaultValue={character.nickname}
                />
              </div>
              <div className="p-2 dialog-select-character-actions">
                <BaseButton color="error" type="submit" variant="contained">
                  Save
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      }
    </BaseDialog>
  );
}

import {useEffect, useReducer, useState} from "react";
import DialogSelectCharacter from "../../components/dialogs/DialogSelectCharacter";
import PlayContainer from "../../components/PlayContainer";
import BaseButton from "../../components/base/BaseButton";
export default function Playground() {

  const [isShowingSelectCharacter, showSelectCharacter] = useState(true)

  const [character, setCharacter] = useState({
    nickname: "",
    color: ""
  })

  const [color, setColor] = useState("")
  const handleCharacterSelected = ({color, nickname}: {color: string, nickname: string}) => {
    setCharacter((prevState) => ({...prevState, color, nickname}))
    showSelectCharacter(false)
  }
  const handleBack = () => {
    showSelectCharacter(false)
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-6xl mb-4 font-bold text-white"> SNAKY.IO </h1>
      </div>
      <div>
        <div className="flex justify-end">
          <BaseButton onClick={() => {showSelectCharacter(true)}} variant="contained" color="primary">
            Change character
          </BaseButton>
        </div>
        <PlayContainer nickname={character.nickname} color={character.color}></PlayContainer>
      </div>
      <DialogSelectCharacter
        nickname={character.nickname}
        color={character.color}
        onCharacterSelected={handleCharacterSelected}
        onBack={handleBack}
        open={isShowingSelectCharacter}
      ></DialogSelectCharacter>
    </div>
  )
}

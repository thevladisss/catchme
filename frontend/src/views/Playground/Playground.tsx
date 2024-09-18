import {useEffect, useReducer, useState} from "react";
import DialogSelectCharacter from "../../components/dialogs/DialogSelectCharacter";
import PlayContainer from "../../components/PlayContainer";
export default function Playground() {

  const [isShowingSelectCharacter, showSelectCharacter] = useState(true)

  const [color, setColor] = useState("")
  const handleCharacterSelected = ({ color }: {color: string}) => {
    setColor(color)
    showSelectCharacter(false)
  }
  const handleBack = () => {
    showSelectCharacter(false)
  }

  return (
    <div>
      <div className="flex justify-center">
        <PlayContainer color={color}></PlayContainer>
      </div>
      <DialogSelectCharacter
        onCharacterSelected={handleCharacterSelected}
        onBack={handleBack}
        open={isShowingSelectCharacter}
      ></DialogSelectCharacter>
    </div>
  )
}

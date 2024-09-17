import {useState} from "react";
import DialogSelectCharacter from "../../components/dialogs/DialogSelectCharacter";

export default function Playground() {

  const [isShowingSelectCharacter, showSelectCharacter] = useState(true)

  return (
    <div>
      <DialogSelectCharacter open={isShowingSelectCharacter}></DialogSelectCharacter>
    </div>
  )
}

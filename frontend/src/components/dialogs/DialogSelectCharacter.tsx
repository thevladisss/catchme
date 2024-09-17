import BaseDialog from "../base/BaseDialog";

type DialogSelectCharacterProps = {
  open: boolean;
}
export default function DialogSelectCharacter(props: DialogSelectCharacterProps) {

  return (
    <BaseDialog className="dialog-select-character" open={props.open}>{
      <div>
        <p className="row justify-center p-2">
          Select your hero
        </p>
        <div className="p-2">
          Something
        </div>
      </div>
    }</BaseDialog>
  )
}

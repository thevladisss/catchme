import {Link} from "react-router-dom"
import BaseButton from "../../components/base/BaseButton";

export default function Home() {
  return (<div className="w-full h-full flex flex-col items-center justify-center">
    <div className="bg-white rounded-sm w-1/2 h-1/3">
      <Link to='/playground'>
        <BaseButton className="border-2 border-black" fontSize="24px">
          Play
        </BaseButton>
      </Link>
    </div>
  </div>)
}

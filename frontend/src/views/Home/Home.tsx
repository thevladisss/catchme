import { Link } from "react-router-dom";
import BaseButton from "../../components/base/BaseButton";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="bg-white rounded-sm w-1/2 p-4">
        <Link className="block w-full" to="/playground">
          <BaseButton color="error" style={{height: "64px"}} className="border-2 border-black w-full" fontSize="64px">
            Play
          </BaseButton>
        </Link>
        <Link className="block w-full" to="/playground">
          <BaseButton color="error" style={{height: "64px"}} className="border-2 border-black w-full" fontSize="64px">
            Settings
          </BaseButton>
        </Link>
        <Link className="block w-full" to="/playground">
          <BaseButton color="error" style={{height: "64px"}} className="border-2 border-black w-full" fontSize="64px">
            Invite
          </BaseButton>
        </Link>
        <Link className="block w-full" to="/playground">
          <BaseButton color="error" style={{height: "64px"}} className="border-2 border-black w-full" fontSize="64px">
            Star github
          </BaseButton>
        </Link>
      </div>
    </div>
  );
}

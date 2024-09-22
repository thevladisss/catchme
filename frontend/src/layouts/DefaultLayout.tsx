import BaseButton from "../components/base/BaseButton";
import { Outlet } from "react-router-dom";
import "./DefaultLayout.css";
import styles from "./DefaultLayout.module.css";

export default function DefaultLayout() {
  const list = [
    {
      action: "View computers",
    },
  ];

  return (
    <>
      <div className="bg-red-500 p-4 h-screen">
        <div className="flex gap-10 h-full">
          <main className="w-full h-full">
            <Outlet></Outlet>
          </main>
        </div>
      </div>
    </>
  );
}

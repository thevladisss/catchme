import styled from "@emotion/styled";
import {useTheme} from "@mui/material";

export function Logo() {

  const {palette} = useTheme()

  return (
    <div style={{width: 'min(90%, 400px)'}} className="flex justify-center items-center bg-white mx-auto">
      <h1 style={{color: palette.primary.main}} className="text-6xl mb-4 font-bold primary"> CATCHme </h1>
    </div>
  );
}

import { useEffect, useState } from "react";

import { useColorScheme, IconButton } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

function ThemeToggle({ sx }: { sx: SxProps }) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="lg"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
      sx={sx}
    >
      {mode === "light" ? <RiMoonClearLine /> : <RiSunLine />}
    </IconButton>
  );
}

export default ThemeToggle;

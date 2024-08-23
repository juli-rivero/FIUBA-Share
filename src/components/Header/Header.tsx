import { useColorScheme, Divider, Button } from "@mui/joy";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import icon from "../../assets/icono.jpeg";
import GitHubLogo from "../../assets/github.svg";

import ThemeToggle from "../UI/ThemeToggle";

import { useState } from "react";
import Navegacion from "./Navegacion";
import Info from "./Info";

function Header({ breadcrumb }: { breadcrumb: string[] }) {
  const [scaleLogo, setScaleLogo] = useState(1);
  const { mode } = useColorScheme();

  return (
    <>
      <header
        style={{
          borderBottom: "1px solid",
          display: "grid",
          gridTemplateColumns: "auto 1px 4fr auto auto auto",
          columnGap: "1rem",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingInline: "1rem",
        }}
      >
        <Link
          to="/"
          onMouseOver={() => setScaleLogo(1.1)}
          title="Inicio"
          onMouseLeave={() => setScaleLogo(1)}
          style={{ transform: `scale(${scaleLogo})` }}
        >
          <img
            style={{
              height: "3rem",
              width: "3rem",
              filter: mode == "dark" ? "invert(1)" : "invert(0)",
            }}
            src={icon}
            alt="Icon"
          />
        </Link>
        <Divider orientation="vertical" />

        {!isMobile && <Navegacion breadcrumb={breadcrumb} />}

        <Button
          sx={{
            height: "fit-content",
            width: "fit-content",
            marginLeft: "auto",
            marginBlock: "1rem",
            textWrap: "wrap",
          }}
          color="neutral"
          variant="soft"
          disabled={true}
        >
          Iniciar sesión con GitHub
          <img
            src={GitHubLogo}
            style={{
              width: "1.5rem",
              height: "1.5rem",
              paddingLeft: 4,
              filter: mode == "dark" ? "invert(1)" : "invert(0)",
            }}
            alt="Logo"
          />
        </Button>

        <Info />

        <ThemeToggle
          sx={{
            borderRadius: "50%",
            boxShadow: "sm",
          }}
        />
      </header>
      {isMobile && <Navegacion breadcrumb={breadcrumb} />}
    </>
  );
}

export default Header;

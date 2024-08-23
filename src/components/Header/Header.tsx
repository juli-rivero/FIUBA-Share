import { useColorScheme, Divider, Button } from "@mui/joy";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import icon from "../../assets/icono.jpeg";
import { RiGithubFill } from "react-icons/ri";

import ThemeToggle from "../UI/ThemeToggle";

import { Dispatch, SetStateAction, useState } from "react";
import Navegacion from "./Navegacion";
import Info from "./Info";

function Header({ breadcrumb, setBreadcrumb }: { breadcrumb: string[], setBreadcrumb: Dispatch<SetStateAction<string[]>> }) {
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
          onClick={()=>setBreadcrumb([])}
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
            display:"flex",
            gap:".5rem"
          }}
          color="neutral"
          variant="soft"
          disabled={true}
        >
          Iniciar sesión con GitHub
          <RiGithubFill size="1.25rem" />
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

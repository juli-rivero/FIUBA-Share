import {
  Breadcrumbs,
  Card,
  CardContent,
  useColorScheme,
  Divider,
  Button,
} from "@mui/joy";
import { isMobile } from "react-device-detect";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, resolvePath } from "react-router-dom";

import icon from "../assets/icono.jpeg";
import GitHubLogo from "../assets/github.svg";

import ThemeToggle from "./UI/ThemeToggle";

import { useState } from "react";

function Navegacion({ breadcrumb }: { breadcrumb: string[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [hash, search] = location.hash.split("?");
  const path = hash.slice(1);

  return (
    <Breadcrumbs
      size="md"
      separator={<RiArrowRightSLine />}
      aria-label="breadcrumbs"
    >
      {breadcrumb.map((nombre, index) => (
        <Link
          key={index}
          style={{ textDecoration: "none" }}
          reloadDocument={breadcrumb.length - 1 == index}
          to={resolvePath(
            {
              pathname: "../".repeat(breadcrumb.length - 1 - index),
              search: search ? search.split("&").slice(0, index).join("&") : "",
            },
            path
          )}
        >
          <Card
            onMouseOver={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            size="sm"
            color="neutral"
            variant={hover === index ? "outlined" : "soft"}
          >
            <CardContent>{nombre}</CardContent>
          </Card>
        </Link>
      ))}
    </Breadcrumbs>
  );
}

function Header({ breadcrumb }: { breadcrumb: string[] }) {
  const [scaleLogo, setScaleLogo] = useState(1);
  const { mode } = useColorScheme();

  return (
    <>
      <header
        style={{
          borderBottom: "1px solid",
          display: "grid",
          gridTemplateColumns: "auto 1px 4fr auto auto",
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

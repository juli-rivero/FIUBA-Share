import {
  Breadcrumbs,
  Card,
  CardContent,
  useColorScheme,
  Divider,
  Button,
} from "@mui/joy";
import { useMediaQuery, useTheme } from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

import icon from "../assets/icono.jpeg";
import GitHubLogo from "../assets/github.svg";

import ThemeToggle from "./utils/ThemeToggle";

import { useState } from "react";
import { ItemBreadCrumb } from "../data/interfaces";

function Navegacion({
  breadcrumb,
}: {
  breadcrumb: ItemBreadCrumb[];
}) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Breadcrumbs
      size="md"
      separator={<KeyboardArrowRightRounded />}
      aria-label="breadcrumbs"
    >
      {breadcrumb.map(({ nombre, href }, index: number) => (
        <Link
          key={index}
          style={{ textDecoration: "none" }}
          reloadDocument={!href}
          to={href || location.search}
        >
          <Card
            onMouseOver={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            color="neutral"
            variant={hover === index ? "solid" : "soft"}
          >
            <CardContent>{nombre}</CardContent>
          </Card>
        </Link>
      ))}
    </Breadcrumbs>
  );
}

function Header({
  breadcrumb,
}: {
  breadcrumb: ItemBreadCrumb[];
}) {
  const { mode } = useColorScheme();
  const theme = useTheme();
  const esCelular = useMediaQuery(theme.breakpoints.down("md"));

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
        <Link to="/">
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

        {!esCelular && <Navegacion breadcrumb={breadcrumb} />}

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
      {esCelular && <Navegacion breadcrumb={breadcrumb} />}
    </>
  );
}

export default Header;

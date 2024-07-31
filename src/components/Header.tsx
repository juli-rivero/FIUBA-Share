import { Breadcrumbs, Link, useColorScheme, Divider, Button } from "@mui/joy";
import { useMediaQuery, useTheme } from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";

import icon from "../assets/icono.jpeg";
import GitHubLogo from "../assets/github.svg";

import ThemeToggle from "./utils/ThemeToggle";

function Navegacion({ itemsBreadcrumb }: { itemsBreadcrumb: Array<string> }) {
  return (
    <Breadcrumbs
      size="md"
      separator={<KeyboardArrowRightRounded />}
      aria-label="breadcrumbs"
    >
      {itemsBreadcrumb.map((item: string, index: number) => (
        <Link
          key={item}
          paddingBlock="0.5rem"
          paddingInline="1rem"
          color="neutral"
          href="#"
          variant={index == itemsBreadcrumb.length - 1 ? "outlined" : "plain"}
          underline="none"
        >
          {item}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

function Header({ itemsBreadcrumb }: { itemsBreadcrumb: Array<string> }) {
  const { mode } = useColorScheme();
  const theme = useTheme();
  const esCelular = useMediaQuery(theme.breakpoints.down("md"));
  console.log(esCelular);

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
        <Link href="/">
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

        {!esCelular && <Navegacion itemsBreadcrumb={itemsBreadcrumb} />}

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
      {esCelular && <Navegacion itemsBreadcrumb={itemsBreadcrumb} />}
    </>
  );
}

export default Header;

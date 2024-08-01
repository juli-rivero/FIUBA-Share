import logoDark from "../assets/FI_Share-dark.svg";
import logoLight from "../assets/FI_Share-light.svg";

import {
  Button,
  Typography,
  typographyClasses,
  AspectRatio,
  Box,
  Container,
} from "@mui/joy";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

import ThemeToggle from "./utils/ThemeToggle";
import { useColorScheme } from "@mui/joy/styles";

function Home() {
  const { mode } = useColorScheme();
  return (
    <>
      <ThemeToggle
        sx={{
          position: "fixed",
          zIndex: 999,
          top: "1rem",
          right: "1rem",
          borderRadius: "50%",
          boxShadow: "sm",
        }}
      />
      <Box
        sx={{
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Container
          sx={(theme) => ({
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 10,
            gap: 4,
            [theme.breakpoints.up(834)]: {
              flexDirection: "row",
              gap: 6,
            },
            [theme.breakpoints.up(1199)]: {
              gap: 12,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              maxWidth: "50ch",
              textAlign: "center",
              flexShrink: 999,
              [theme.breakpoints.up(834)]: {
                minWidth: 420,
                alignItems: "flex-start",
                textAlign: "initial",
              },
              [`& .${typographyClasses.root}`]: {
                textWrap: "balance",
              },
            })}
          >
            <Typography
              level="h1"
              fontWeight="xl"
              fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
              Visualiza las resoluciones de los trabajos prácticos de FIUBA.
            </Typography>
            <Typography
              fontSize="lg"
              textColor="text.secondary"
              lineHeight="lg"
            >
              Compara con otros trabajos prácticos, saca nuevas ideas, guíate
              para un trabajo a entregar, date una idea de como es una materia,
              de como se maneja el curso y más.
            </Typography>
            <Link to="materias">
              <Button
                size="lg"
                endDecorator={<ArrowForward fontSize="large" />}
              >
                Explorar
              </Button>
            </Link>
            <Typography>
              Queres subir tu resolución?{" "}
              <Link to="" style={{ fontWeight: "bold" }}>
                Iniciar sesion con GitHub
              </Link>
            </Typography>
          </Box>
          <AspectRatio
            ratio={507 / 338}
            variant="plain"
            maxHeight={300}
            sx={(theme) => ({
              minWidth: 300,
              alignSelf: "stretch",
              [theme.breakpoints.up(834)]: {
                alignSelf: "initial",
                flexGrow: 1,
                "--AspectRatio-maxHeight": "520px",
                "--AspectRatio-minHeight": "400px",
              },
              flexBasis: "50%",
            })}
          >
            <img
              style={{ objectFit: "contain" }}
              src={mode == "dark" ? logoDark : logoLight}
              alt="Logo de Fi Share"
            />
          </AspectRatio>
        </Container>
      </Box>
    </>
  );
}

export default Home;

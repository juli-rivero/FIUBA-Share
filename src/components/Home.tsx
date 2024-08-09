import logoDark from "../assets/FI_Share-dark.svg";
import logoLight from "../assets/FI_Share-light.svg";

import {
  Button,
  Typography,
  typographyClasses,
  AspectRatio,
  Box,
  Container,
  Stack,
  List,
  ListItem,
  Chip,
  ListItemContent,
  ListSubheader,
  Dropdown,
  IconButton,
  MenuButton,
  Menu,
} from "@mui/joy";
import { ArrowForward, InfoOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

import ThemeToggle from "./utils/ThemeToggle";
import { useColorScheme } from "@mui/joy/styles";

function Home() {
  const { mode } = useColorScheme();
  return (
    <>
      <Stack direction="row-reverse" gap={2} margin={2} justifyContent="end">
        <ThemeToggle
          sx={{
            borderRadius: "50%",
            boxShadow: "sm",
          }}
        />
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
            size="lg"
            variant="soft"
            color="neutral"
          >
            <InfoOutlined />
          </MenuButton>
          <Menu
            sx={{
              width: "15rem",
              padding: 2,
              display: "block",
              textAlign: "justify",
            }}
            placement="bottom-end"
            modifiers={[{ name: "offset", options: { offset: [0, 20] } }]}
          >
            Este sitio es un remake de{" "}
            <a target="_blank" href="https://fede.dm/FIUBA-Repos/">
              FIUBA-Repos
            </a>
            , pero aun así ambos sitios cumplen propositos diferentes.
          </Menu>
        </Dropdown>
        <Link
          to="materias"
          style={{
            borderRadius: "50%",
            boxShadow: "sm",
          }}
        >
          <Button size="lg" endDecorator={<ArrowForward fontSize="large" />}>
            Explorar
          </Button>
        </Link>
      </Stack>
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
                minWidth: 500,
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
              color="primary"
              fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
              Visualiza las resoluciones de los TPs de FIUBA.
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

            <Box>
              <Typography
                padding={0}
                margin={0}
                level="title-lg"
                fontWeight={800}
                color="primary"
              >
                Subir tu propia resolucion es sencillo:
              </Typography>
              <List sx={{ gap: 1 }}>
                <ListItem sx={{ alignItems: "start" }}>
                  <ListSubheader
                    sx={{
                      whiteSpace: "nowrap",
                      padding: 0,
                      minHeight: "1.5rem",
                    }}
                  >
                    Opcion 1:{" "}
                  </ListSubheader>
                  <ListItemContent>
                    <Link
                      to=""
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Iniciar sesion con GitHub
                    </Link>{" "}
                    (En progreso)
                  </ListItemContent>
                </ListItem>
                <ListItem sx={{ alignItems: "start" }}>
                  <ListSubheader
                    sx={{
                      whiteSpace: "nowrap",
                      padding: 0,
                      minHeight: "1.5rem",
                    }}
                  >
                    Opcion 2:{" "}
                  </ListSubheader>
                  <ListItemContent>
                    <Typography>
                      Copiar y pegar el topic en tu repositorio.
                    </Typography>
                    <Typography>
                      No olvides también de agregarle el topic{" "}
                      <Chip component="span">fiuba</Chip>
                    </Typography>
                  </ListItemContent>
                </ListItem>
              </List>
            </Box>
            <Typography
              fontSize="lg"
              textColor="text.secondary"
              lineHeight="lg"
            >
              Visitá{" "}
              <a target="_blank" href="https://fede.dm/FIUBA-Repos/">
                FIUBA-Repos
              </a>
              , donde vas a ver repositorios <b>tendencia</b> y otras opciones,
              como una <b>clasificacion por materias</b>
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

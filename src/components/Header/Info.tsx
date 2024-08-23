import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Divider,
  Dropdown,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  Modal,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import ImgZoom from "../UI/ImgZoom";

function Info() {
  const [index, setIndex] = useState<number | null>(null);
  const [verImagen, setVerImagen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <Dropdown open={openDropdown} onOpenChange={(_,open) => setOpenDropdown(open)}>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
        size="lg"
        variant="soft"
        color="neutral"
      >
        <RiInformationLine />
      </MenuButton>
      <Menu
        sx={{
          width: "min-content",
          padding: 2,
          display: "block",
          textAlign: "justify",
        }}
        placement="bottom-end"
        modifiers={[{ name: "offset", options: { offset: [0, 20] } }]}
      >
        <Typography>
          Este sitio es un remake de{" "}
          <a target="_blank" href="https://fede.dm/FIUBA-Repos/">
            FIUBA-Repos
          </a>
          , pero aun así ambos sitios cumplen propositos diferentes.
        </Typography>
        <AccordionGroup sx={{ width: 400, marginTop: "1rem" }}>
          <Accordion
            expanded={index === 0}
            onChange={(_, expanded) => setIndex(expanded ? 0 : null)}
          >
            <AccordionSummary sx={{ fontSize: "large", fontWeight: 500 }}>
              👀​ De que se trata FIUBA Share
            </AccordionSummary>
            <AccordionDetails>
              La idea es tener todos los repositorios (resoluciones de finales,
              parciales, etc) de cualquier curso de la Facultad de Ingenieria de
              la UBA en un mismo lugar.
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={index === 1}
            onChange={(_, expanded) => setIndex(expanded ? 1 : null)}
          >
            <AccordionSummary sx={{ fontSize: "large", fontWeight: 500 }}>
              🤔 Qué se puede hacer
            </AccordionSummary>
            <AccordionDetails>
              <List marker="disc">
                <ListItem>
                  Comparar tus resoluciones con la de los demas
                </ListItem>
                <ListItem>Sacar nuevas ideas</ListItem>
                <ListItem>Tener una guía para un tp a entregar</ListItem>
                <ListItem>
                  Darse una idea de como es un curso (que lenguaje usa, cuantos
                  tps tiene, cuanto aprendes)
                </ListItem>
                <ListItem>
                  Tener una valoracion de los demás al compartir lo tuyo
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={index === 2}
            onChange={(_, expanded) => setIndex(expanded ? 2 : null)}
          >
            <AccordionSummary sx={{ fontSize: "large", fontWeight: 500 }}>
              🗿 Cómo subo mi repositorio
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lo único que hay que hacer es copiar los topics que aparecen al
                ir un curso en especifico y pegarlos en los topics de tu
                repositorio de github que queres subir.
              </Typography>
              <ImgZoom
                style={{margin:"1rem"}}
                onClick={() => setVerImagen(true)}
                src="./guia-subir-repo.jpeg"
                alt="[imagen que muestra donde se encuentran los topics en tu repo de GitHub]"
              />
              <Divider sx={{marginBlock:"1rem", padding:"1px"}} />
              <Typography level="body-sm">
                La idea en un futuro es, ademas de tener la opcion de arriba, poder loguearte con tu cuenta de GitHub y poder agregar el repo desde este sitio.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </Menu>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={verImagen}
        onClose={() => {
            setVerImagen(false)
            setOpenDropdown(true)
        }}
      >
        <img
          style={{ maxWidth: "80vw", maxHeight: "80vh" }}
          src="./guia-subir-repo.jpeg"
          alt="[imagen que muestra donde se encuentran los topics en tu repo de GitHub]"
        />
      </Modal>
    </Dropdown>
  );
}

export default Info;

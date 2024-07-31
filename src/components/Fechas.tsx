import {materias} from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Stack, Link } from "@mui/joy";
import { Unstable_Grid } from "@mui/system";

function Fechas() {
  const [URLSearchParams] = useSearchParams();
  const materiaId = URLSearchParams.get("materia");
  console.log(materiaId);
  
  const materia = materias.find((materia) => materia.id == materiaId);
  if (!materia) return "Error, materia no encontrada";
  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header itemsBreadcrumb={["Materias", materia.nombre]} />
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {materia.fechas.map(({ año, cuatrimestre }) => (
          <Link
            key={`${año}-${cuatrimestre}`}
            underline="none"
            color="neutral"
            variant="soft"
            padding="1.5rem"
            borderRadius={4}
            href={`./cursos?materia=${materiaId}&anio=${año}&cuatrimestre=${cuatrimestre}`}
          >
            {`${año} - ${cuatrimestre}° Cuatrimestre`}
          </Link>
        ))}
      </Unstable_Grid>
    </Stack>
  );
}

export default Fechas;

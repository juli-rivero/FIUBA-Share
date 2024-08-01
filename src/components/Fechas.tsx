import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Stack, Card, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useState } from "react";

function Fechas() {
  const [URLSearchParams] = useSearchParams();
  const [hover, setHover] = useState<number | null>(null);

  const materiaId = URLSearchParams.get("materia");

  const materia = materias.find((materia) => materia.id == materiaId);
  if (!materia) return "Error, materia no encontrada";
  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header
        itemsBreadcrumb={[
          { nombre: "Materias", href: "../" },
          { nombre: materia.nombre },
        ]}
      />
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {materia.fechas.map(({ año, cuatrimestre }, index) => (
          <Link
          style={{ textDecoration: "none" }}
          key={`${año}-${cuatrimestre}`}

          to={`./cursos?materia=${materiaId}&anio=${año}&cuatrimestre=${cuatrimestre}`}
        >
          <Card
            onMouseOver={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            color="neutral"
            variant={hover === index ? "solid" : "soft"}
          >
            <CardContent>            {`${año} - ${cuatrimestre}° Cuatrimestre`}
          </CardContent>
          </Card>
        </Link>
        ))}
      </Unstable_Grid>
    </Stack>
  );
}

export default Fechas;

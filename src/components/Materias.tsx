import { materias } from "../data/data.json";

import Header from "./Header";
import { Stack, Card, CardContent } from "@mui/joy";
import { Unstable_Grid } from "@mui/system";
import { Link } from "react-router-dom";
import { useState } from "react";

function Materias() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header itemsBreadcrumb={[{ nombre: "Materias" }]} />
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {materias.map(({ nombre, id }, index) => (
          <Link
            style={{ textDecoration: "none" }}
            key={id}
            to={`fechas?materia=${id}`}
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
      </Unstable_Grid>
    </Stack>
  );
}

export default Materias;

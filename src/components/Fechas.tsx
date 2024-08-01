import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Stack, Card, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { Fecha, ItemBreadCrumb } from "../data/interfaces";

function Fechas() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<number | null>(null);

  const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([]);
  const [fechas, setFechas] = useState<Fecha[]>([]);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    setBreadcrumb([
      { nombre: "Materias", href: "../" },
      { nombre: materia!.nombre },
    ]);
    setFechas(materia!.fechas);
  }, []);

  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header
        breadcrumb={breadcrumb}
      />
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {fechas.map(({ año, cuatrimestre }, index) => (
          <Link
            style={{ textDecoration: "none" }}
            key={`${año}-${cuatrimestre}`}
            to={`./cursos?materia=${searchParams.get("materia")}&anio=${año}&cuatrimestre=${cuatrimestre}`}
          >
            <Card
              onMouseOver={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              color="neutral"
              variant={hover === index ? "solid" : "soft"}
            >
              <CardContent>
                {`${año} - ${cuatrimestre}° Cuatrimestre`}
              </CardContent>
            </Card>
          </Link>
        ))}
      </Unstable_Grid>
    </Stack>
  );
}

export default Fechas;

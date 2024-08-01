import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Stack, Card, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { Curso, ItemBreadCrumb } from "../data/interfaces";

function Cursos() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<number | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    const fecha = materia!.fechas.find((fecha) => 
      fecha.año.toString() == searchParams.get("anio") &&
        fecha.cuatrimestre.toString() == searchParams.get("cuatrimestre")
    );
    
    setBreadcrumb([
      { nombre: "Materias", href: "../../" },
      { nombre: materia!.nombre, href: "../" },
      { nombre: `${fecha!.año} - ${fecha!.cuatrimestre}° Cuatrimestre` },
    ]);
    setCursos(fecha!.cursos);
  }, []);

  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header breadcrumb={breadcrumb} />
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {cursos.map(({ id, nombre }, index) => (
          <Link
            style={{ textDecoration: "none" }}
            key={index}
            to={`./tps?materia=${searchParams.get(
              "materia"
            )}&anio=${searchParams.get("anio")}&cuatrimestre=${searchParams.get(
              "cuatrimestre"
            )}&curso=${id}`}
          >
            <Card
              onMouseOver={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              color="neutral"
              variant={hover === index ? "solid" : "soft"}
            >
              <CardContent>{`${id} - ${nombre}`}</CardContent>
            </Card>
          </Link>
        ))}
      </Unstable_Grid>
    </Stack>
  );
}

export default Cursos;

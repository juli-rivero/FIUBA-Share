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
  const [hover, setHover] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    const periodo = materia!.periodos.find(
      (periodo) => periodo.id == searchParams.get("periodo")
    );

    setBreadcrumb([
      { nombre: "Materias", href: "../../" },
      {
        nombre: materia!.nombre,
        href: `../?materia=${searchParams.get("materia")}`,
      },
      { nombre: `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre` },
    ]);
    setCursos(periodo!.cursos);
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
        {cursos.map(({ id, nombre }) => (
          <Link
            style={{ textDecoration: "none" }}
            key={id}
            to={`./tps?materia=${searchParams.get(
              "materia"
            )}&periodo=${searchParams.get("periodo")}&curso=${id}`}
          >
            <Card
              onMouseOver={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
              color="neutral"
              variant={hover === id ? "solid" : "soft"}
            >
              <CardContent>{`${nombre}`}</CardContent>
            </Card>
          </Link>
        ))}
      </Unstable_Grid>
    </Stack>
  );
}

export default Cursos;

import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Stack, Card, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { ItemBreadCrumb, TP } from "../data/interfaces";

function TPs() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<number | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([]);
  const [tps, setTps] = useState<TP[]>([]);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    const periodo = materia!.periodos.find(
      (periodo) => periodo.id == searchParams.get("periodo")
    );
    const curso = periodo!.cursos.find(
      (curso) => curso.id == searchParams.get("curso")
    );

    setBreadcrumb([
      { nombre: "Materias", href: "../../../" },
      {
        nombre: materia!.nombre,
        href: `../../?materia=${searchParams.get("materia")}`,
      },
      {
        nombre: `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre`,
        href: `../?materia=${searchParams.get(
          "materia"
        )}&periodo=${searchParams.get("periodo")}`,
      },
      { nombre: `${curso!.nombre}` },
    ]);
    setTps(curso!.tps);
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
        {tps.map(({ id, nombre }, index) => (
          <Link
            style={{ textDecoration: "none" }}
            key={index}
            to={`./repos?materia=${searchParams.get(
              "materia"
            )}&periodo=${searchParams.get("periodo")}&curso=${searchParams.get(
              "curso"
            )}&tp=${id}`}
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

export default TPs;

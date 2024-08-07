import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { TP } from "../data/interfaces";
import useSetBreadcrumb from "../hooks/useSetBreadcrumb";

function TPs() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<number | null>(null);

  const [tps, setTps] = useState<TP[]>([]);
  const setBreadcrumb = useSetBreadcrumb();

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
      { nombre: "Materias" },
      { nombre: materia!.nombre },
      { nombre: `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre` },
      { nombre: `${curso!.nombre}` },
    ]);
    setTps(curso!.tps);
  }, []);

  return (
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
  );
}

export default TPs;

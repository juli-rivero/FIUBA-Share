import { useOutletContext, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { OutletContextType, TP } from "../data/interfaces";
import CardOverflowReposCount from "./utils/CardOverflowReposCount";

function TPs() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<string | null>(null);

  const [tps, setTps] = useState<TP[]>([]);
  const { setBreadcrumb, materias } = useOutletContext<OutletContextType>();

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
      "Materias",
      materia!.nombre,
      `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre`,
      `${curso!.nombre}`,
    ]);
    setTps(curso!.tps);
  }, [materias, setBreadcrumb, searchParams]);

  return (
    <Unstable_Grid
      sx={{ height: "100%" }}
      container
      gap={4}
      padding={8}
      overflow="auto"
      alignItems="center"
      justifyContent="center"
    >
      {tps.map(({ id, nombre, repos }) => (
        <Link
          style={{ textDecoration: "none" }}
          key={id}
          to={`./repos?materia=${searchParams.get(
            "materia"
          )}&periodo=${searchParams.get("periodo")}&curso=${searchParams.get(
            "curso"
          )}&tp=${id}`}
        >
          <Card
            orientation="horizontal"
            onMouseOver={() => setHover(id)}
            onMouseLeave={() => setHover(null)}
            color="neutral"
            variant={hover === id ? "solid" : "soft"}
          >
            <CardContent>{`${id} - ${nombre}`}</CardContent>
            <CardOverflowReposCount reposCount={repos.length} />
          </Card>
        </Link>
      ))}
    </Unstable_Grid>
  );
}

export default TPs;

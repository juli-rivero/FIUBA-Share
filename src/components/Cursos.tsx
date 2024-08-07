import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import { Card, CardContent, List, ListItem, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { Curso } from "../data/interfaces";
import useSetBreadcrumb from "../hooks/useSetBreadcrumb";

function Cursos() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<string | null>(null);
  const setBreadcrumb = useSetBreadcrumb();
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    const periodo = materia!.periodos.find(
      (periodo) => periodo.id == searchParams.get("periodo")
    );

    setBreadcrumb([
      { nombre: "Materias" },
      { nombre: materia!.nombre },
      { nombre: `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre` },
    ]);
    setCursos(periodo!.cursos);
  }, [searchParams, setBreadcrumb]);

  return (
    <Unstable_Grid
      sx={{ height: "100%" }}
      container
      gap={4}
      alignItems="center"
      justifyContent="center"
    >
      {cursos.map(({ id, nombre, docentes }) => (
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
            <CardContent>
              <Typography level="title-lg">{nombre}</Typography>
              <List>
                {docentes.split(",").map((docente) => (
                  <ListItem sx={{fontSize:".85rem"}} key={docente}>{docente}</ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Unstable_Grid>
  );
}

export default Cursos;

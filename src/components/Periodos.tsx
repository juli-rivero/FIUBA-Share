import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { Fecha } from "../data/interfaces";
import useSetBreadcrumb from "../hooks/useSetBreadcrumb";

function Periodos() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<string | null>(null);

  const [periodos, setPeriodos] = useState<Fecha[]>([]);
  const setBreadcrumb = useSetBreadcrumb();

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    setBreadcrumb([{ nombre: "Materias" }, { nombre: materia!.nombre }]);
    setPeriodos(materia!.periodos);
  }, [setBreadcrumb, searchParams]);

  return (
    <Unstable_Grid
      sx={{ height: "100%" }}
      container
      gap={4}
      alignItems="center"
      justifyContent="center"
    >
      {periodos.map(({ año, cuatrimestre, id }) => (
        <Link
          style={{ textDecoration: "none" }}
          key={id}
          to={`./cursos?materia=${searchParams.get("materia")}&periodo=${id}`}
        >
          <Card
            onMouseOver={() => setHover(id)}
            onMouseLeave={() => setHover(null)}
            color="neutral"
            variant={hover === id ? "solid" : "soft"}
          >
            <CardContent>
              {`${año} - ${cuatrimestre}° Cuatrimestre`}
            </CardContent>
          </Card>
        </Link>
      ))}
    </Unstable_Grid>
  );
}

export default Periodos;

import { useOutletContext, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { OutletContextType, Periodo } from "../data/interfaces";
import CardOverflowReposCount from "./utils/CardOverflowReposCount";

function Periodos() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<string | null>(null);

  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const { materias, setBreadcrumb } = useOutletContext<OutletContextType>();

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    setBreadcrumb([ "Materias", materia!.nombre ]);
    setPeriodos(materia!.periodos);
  }, [setBreadcrumb, materias, searchParams]);

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
      {periodos.map(({ año, cuatrimestre, id, reposCount }) => (
        <Link
          style={{ textDecoration: "none" }}
          key={id}
          to={`./cursos?materia=${searchParams.get("materia")}&periodo=${id}`}
        >
          <Card
            orientation="horizontal"
            onMouseOver={() => setHover(id)}
            onMouseLeave={() => setHover(null)}
            color="neutral"
            variant={hover === id ? "solid" : "soft"}
          >
            <CardContent>
              {`${año} - ${cuatrimestre}° Cuatrimestre`}
            </CardContent>
            <CardOverflowReposCount reposCount={reposCount}/>
          </Card>
        </Link>
      ))}
    </Unstable_Grid>
  );
}

export default Periodos;

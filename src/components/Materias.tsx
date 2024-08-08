import { Card, CardContent } from "@mui/joy";
import { Unstable_Grid } from "@mui/system";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { OutletContextType } from "../data/interfaces";
import CardOverflowReposCount from "./utils/CardOverflowReposCount";

function Materias() {
  const [hover, setHover] = useState<string | null>(null);
  const { setBreadcrumb, materias } = useOutletContext<OutletContextType>();
  useEffect(() => {
    setBreadcrumb([{ nombre: "Materias" }]);
  }, [setBreadcrumb]);

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
      {materias.map(({ nombre, id, reposCount }) => (
        <Link
          style={{ textDecoration: "none" }}
          key={id}
          to={`periodos?materia=${id}`}
        >
          <Card
            orientation="horizontal"
            onMouseOver={() => setHover(id)}
            onMouseLeave={() => setHover(null)}
            color="neutral"
            variant={hover === id ? "solid" : "soft"}
          >
            <CardContent>{nombre}</CardContent>
            <CardOverflowReposCount reposCount={reposCount} />
          </Card>
        </Link>
      ))}
    </Unstable_Grid>
  );
}

export default Materias;

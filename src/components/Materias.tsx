import { materias } from "../data/data.json";

import { Card, CardContent } from "@mui/joy";
import { Unstable_Grid } from "@mui/system";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSetBreadcrumb from "../hooks/useSetBreadcrumb";

function Materias() {
  const [hover, setHover] = useState<string | null>(null);
  const setBreadcrumb = useSetBreadcrumb()
  useEffect(()=> {
    setBreadcrumb([{nombre:"Materias"}])
  }, [setBreadcrumb])
  
  return (
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {materias.map(({ nombre, id }) => (
          <Link
            style={{ textDecoration: "none" }}
            key={id}
            to={`periodos?materia=${id}`}
          >
            <Card
              onMouseOver={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
              color="neutral"
              variant={hover === id ? "solid" : "soft"}
            >
              <CardContent>{nombre}</CardContent>
            </Card>
          </Link>
        ))}
      </Unstable_Grid>
  );
}

export default Materias;

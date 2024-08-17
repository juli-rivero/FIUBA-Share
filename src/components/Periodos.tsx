import { useOutletContext, useSearchParams } from "react-router-dom";
import { Card, CardContent, IconButton } from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { OutletContextType, Periodo, SortPeriodos } from "../data/interfaces";
import CardOverflowReposCount from "./utils/CardOverflowReposCount";
import SortIcon from "./utils/SortIcon";

function Periodos() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<string | null>(null);
  const [sort, setSort] = useState<SortPeriodos>("periodo");

  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const { materias, setBreadcrumb } = useOutletContext<OutletContextType>();

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    setBreadcrumb(["Materias", materia!.nombre]);
    setPeriodos(materia!.periodos);
  }, [setBreadcrumb, materias, searchParams]);

  const sortPeriodo = ({ id: a }: { id: string }, { id: b }: { id: string }) =>
    a < b ? 1 : -1;
  const sortReposCount = (
    { reposCount: a }: { reposCount: number },
    { reposCount: b }: { reposCount: number }
  ) => b - a;

  return (
    <>
      <IconButton
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
        }}
        color="neutral"
        variant="soft"
        onClick={() => {
          switch (sort) {
            case "periodo":
              setSort("reposCount");
              break;
            case "reposCount":
              setSort("periodo");
              break;
          }
        }}
      >
        <SortIcon sort={sort} />
      </IconButton>
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        padding={8}
        overflow="auto"
        alignItems="center"
        justifyContent="center"
      >
        {periodos
          .toSorted(sort == "periodo" ? sortPeriodo : sortReposCount)
          .map(({ año, cuatrimestre, id, reposCount }) => (
            <Link
              style={{ textDecoration: "none" }}
              key={id}
              to={`./cursos?materia=${searchParams.get(
                "materia"
              )}&periodo=${id}`}
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
                <CardOverflowReposCount reposCount={reposCount} />
              </Card>
            </Link>
          ))}
      </Unstable_Grid>
    </>
  );
}

export default Periodos;

import { useOutletContext, useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Curso, OutletContextType } from "../typescript/interfaces";
import CardOverflowReposCount from "./UI/CardOverflowReposCount";
import useSort, { Sort, SortCursos } from "../hooks/useSort";
import SortIconButton from "./UI/SortIconButton";

function Cursos() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<string | null>(null);
  const [sort, setSort, sortFunctions] = useSort<SortCursos>(Sort.ReposCount);
  const { setBreadcrumb, materias } = useOutletContext<OutletContextType>();
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );

    setBreadcrumb(["Materias", materia!.nombre]);

    setCursos(materia!.cursos);
  }, [searchParams, setBreadcrumb, materias]);

  return (
    <>
      <SortIconButton
        onClick={() => {
          switch (sort) {
            case "az":
              setSort(Sort.ReposCount);
              break;
            case "reposCount":
              setSort(Sort.Az);
              break;
          }
        }}
        sort={sort}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Grid
          sx={{ height: "fit-content", maxHeight: "100%" }}
          container
          gap={4}
          padding={8}
          overflow="auto"
          alignItems="stretch"
          justifyContent="center"
        >
          {cursos
            .toSorted(sortFunctions[sort])
            .map(({ id, nombre, docentes, repos }) => (
              <Link
                style={{ textDecoration: "none", flexGrow: 1 }}
                key={id}
                to={`./repos?materia=${searchParams.get(
                  "materia"
                )}&curso=${id}`}
              >
                <Card
                  sx={{ height: "100%" }}
                  orientation="horizontal"
                  onMouseOver={() => setHover(id)}
                  onMouseLeave={() => setHover(null)}
                  color="neutral"
                  variant={hover === id ? "solid" : "soft"}
                >
                  <CardContent>
                    <Typography level="title-lg">{nombre}</Typography>
                    <List>
                      {docentes.split(",").map((docente) => (
                        <ListItem sx={{ fontSize: ".85rem" }} key={docente}>
                          {docente}
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardOverflowReposCount reposCount={repos.length} />
                </Card>
              </Link>
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default Cursos;

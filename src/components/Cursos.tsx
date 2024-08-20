import { useOutletContext, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { Curso, OutletContextType, SortCursos } from "../data/interfaces";
import CardOverflowReposCount from "./utils/CardOverflowReposCount";
import SortIcon from "./utils/SortIcon";
import { Repository } from "../data/githubInterfaces";

function Cursos() {
  const [searchParams] = useSearchParams();
  const [hover, setHover] = useState<string | null>(null);
  const [sort, setSort] = useState<SortCursos>("reposCount");
  const { setBreadcrumb, materias } = useOutletContext<OutletContextType>();
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    const periodo = materia!.periodos.find(
      (periodo) => periodo.id == searchParams.get("periodo")
    );

    setBreadcrumb([
      "Materias",
      materia!.nombre,
      `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre`,
    ]);
    console.log(periodo?.cursos);

    setCursos(periodo!.cursos);
  }, [searchParams, setBreadcrumb, materias]);

  const sortAlfabetico = (
    { nombre: a }: { nombre: string },
    { nombre: b }: { nombre: string }
  ) => (a > b ? 1 : -1);
  const sortReposCount = (
    { repos: a }: { repos: Repository[] },
    { repos: b }: { repos: Repository[] }
  ) => b.length - a.length;

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
            case "a-z":
              setSort("reposCount");
              break;
            case "reposCount":
              setSort("a-z");
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
        {cursos
          .toSorted(sort == "a-z" ? sortAlfabetico : sortReposCount)
          .map(({ id, nombre, docentes, repos }) => (
            <Link
              style={{ textDecoration: "none" }}
              key={id}
              to={`./repos?materia=${searchParams.get(
                "materia"
              )}&periodo=${searchParams.get("periodo")}&curso=${id}`}
            >
              <Card
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
      </Unstable_Grid>
    </>
  );
}

export default Cursos;

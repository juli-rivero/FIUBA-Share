import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { Typography, Skeleton, Stack, Grid } from "@mui/joy";
import { useEffect, useState } from "react";
import CartaRepo from "./CartaRepo";
import { OutletContextType, Periodo, Actividad } from "../../typescript/interfaces";
import { Repository } from "../../typescript/githubInterfaces";
import useSort, { Sort, SortRepos } from "../../hooks/useSort";
import SortIconButton from "../UI/SortIconButton";
import Topics from "./Topics";
import Filtros from "./Filtros";
import { transformarParaUrl } from "../../utils/transformText";

function Repos() {
  const { materiaName, cursoName } = useParams();
  const [searchParams] = useSearchParams();
  const { setBreadcrumb, materias, loading } =
    useOutletContext<OutletContextType>();
  const [topics, setTopics] = useState<string[]>(["fiuba"]);
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [sort, setSort, sortFunctions] = useSort<SortRepos>(Sort.Points);

  useEffect(() => {
    const materia = materias.find(
      (materia) => transformarParaUrl(materia.nombre) == materiaName
    );
    if (!materia) return;
    const curso = materia.cursos.find(
      (curso) => transformarParaUrl(curso.nombre) == cursoName
    );
    if (!curso) return;

    setBreadcrumb(["Materias", materia.nombre, `${curso.nombre}`]);
    setRepos(() => {
      const filtros = new Set<string>();
      if (searchParams.has("periodo")) {
        filtros.add(searchParams.get("periodo")!);
      }
      if (searchParams.has("actividad")) {
        filtros.add(searchParams.get("actividad")!);
      }
      if (filtros.size) {
        return curso.repos.filter(
          (repo) => repo.topics.intersection(filtros).size === filtros.size
        );
      }
      return curso.repos;
    });
    setTopics(()=>{
      topics.length = 0;
      topics.push("fiuba")
      topics.push(materia.id)
      topics.push(curso.id)
      if (searchParams.has("periodo")) {
        topics.push(searchParams.get("periodo")!);
      }
      if (searchParams.has("actividad")) {
        topics.push(searchParams.get("actividad")!);
      }
      return topics
    })
    setPeriodos(curso.periodos);
    setActividades(curso.actividades);
  }, [setBreadcrumb, searchParams, materias]);

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-around"
        margin="1rem"
        gap={4}
      >
        <Topics topics={topics}/>
        <Filtros periodos={periodos} actividades={actividades}/>
      </Stack>
      <SortIconButton
        onClick={() => {
          switch (sort) {
            case "az":
              setSort(Sort.Recent);
              break;
            case "recent":
              setSort(Sort.Points);
              break;
            case "points":
              setSort(Sort.Az);
              break;
          }
        }}
        sort={sort}
      />
      <Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        padding={8}
        overflow="auto"
        alignItems="center"
        justifyContent="center"
      >
        {repos.length == 0
          ? !loading && (
              <Typography>
                No hay ningun repositorio. Sé el primero en agregar uno!
              </Typography>
            )
          : repos
              .toSorted(sortFunctions[sort])
              .map((repo, index) => (
                <CartaRepo repositorio={repo} key={index} />
              ))}
        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: 4 }}
            width={340}
            height={200}
          />
        )}
      </Grid>
    </>
  );
}

export default Repos;

import { useOutletContext, useSearchParams } from "react-router-dom";
import { Typography, Skeleton, Stack } from "@mui/joy";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import CartaRepo from "./CartaRepo";
import { OutletContextType, Periodo, Tp } from "../../typescript/interfaces";
import { Repository } from "../../typescript/githubInterfaces";
import useSort, { Sort, SortRepos } from "../../hooks/useSort";
import SortIconButton from "../UI/SortIconButton";
import Topics from "./Topics";
import Filtros from "./Filtros";

function Repos() {
  const [searchParams] = useSearchParams();
  const { setBreadcrumb, materias, loading } =
    useOutletContext<OutletContextType>();
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [tps, setTps] = useState<Tp[]>([]);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [sort, setSort, sortFunctions] = useSort<SortRepos>(Sort.Points);

  useEffect(() => {
    const materiaId = searchParams.get("materia"),
      cursoId = searchParams.get("curso"),
      tpId = searchParams.get("tp"),
      periodoId = searchParams.get("periodo");

    const materia = materias.find((materia) => materia.id == materiaId);
    if (!materia) return;
    const curso = materia.cursos.find((curso) => curso.id == cursoId);
    if (!curso) return;

    setBreadcrumb(["Materias", materia.nombre, `${curso.nombre}`]);
    setPeriodos(curso.periodos);
    setTps(curso.tps);
    setRepos(() => {
      const filtros = new Set<string>();
      if (periodoId) filtros.add(periodoId);
      if (tpId) filtros.add(tpId);
      if (filtros.size)
        return curso.repos.filter(
          (repo) => repo.topics.intersection(filtros).size === filtros.size
        );
      return curso.repos;
    });
  }, [setBreadcrumb, searchParams, materias]);

  return (
    <>
      <Stack direction="row" flexWrap="wrap" justifyContent="space-around" margin="1rem" gap={4}>
        <Topics />
        <Filtros periodos={periodos} tps={tps} totalRepos={repos.length} />
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
      <Unstable_Grid
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
      </Unstable_Grid>
    </>
  );
}

export default Repos;

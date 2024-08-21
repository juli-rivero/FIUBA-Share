import { useOutletContext, useSearchParams } from "react-router-dom";
import { Typography, Skeleton } from "@mui/joy";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import CartaRepo from "./CartaRepo";
import { OutletContextType } from "../data/interfaces";
import { Repository } from "../data/githubInterfaces";
import Topics from "./utils/Topics";
import useSort, { Sort, SortRepos } from "../hooks/useSort";
import SortIconButton from "./utils/SortIconButton";

function Repos() {
  const [searchParams] = useSearchParams();
  const { setBreadcrumb, materias, loading } =
    useOutletContext<OutletContextType>();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [sort, setSort, sortFunctions] = useSort<SortRepos>(Sort.Points);

  useEffect(() => {
    const materiaId = searchParams.get("materia"),
      periodoId = searchParams.get("periodo"),
      cursoId = searchParams.get("curso");

    const materia = materias.find((materia) => materia.id == materiaId);
    const periodo = materia!.periodos.find(
      (periodo) => periodo.id == periodoId
    );
    const curso = periodo!.cursos.find((curso) => curso.id == cursoId);

    setBreadcrumb([
      "Materias",
      materia!.nombre,
      `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre`,
      `${curso!.nombre}`,
    ]);
    setRepos(curso!.repos);
  }, [setBreadcrumb, searchParams, materias]);

  return (
    <>
      <Topics />
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

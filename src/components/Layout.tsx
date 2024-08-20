import Header from "./Header";
import { Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { ItemBreadCrumb } from "../data/interfaces";
import useFiubaRepos from "../hooks/useFiubaRepos";
import json from "../data/data.json";

function Layout() {
  const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([]);
  const [fiubaRepos, partialLoading] = useFiubaRepos();
  const [procesing, setProcesing] = useState(false);
  const materias = useMemo(() => {
    setProcesing(true);

    const materias = json.materias.map((materia) => {
      let countReposEnMateria = 0;
      const periodos = materia.periodos.map((periodo) => {
        let countReposEnPeriodo = 0;
        const cursos = periodo.cursos.map((curso) => {
          const topicKeysSet = new Set([materia.id, periodo.id, curso.id]);
          const repos = fiubaRepos.filter(
            (fiubaRepo) =>
              topicKeysSet.size ===
              fiubaRepo.topics.filter((topic) => topicKeysSet.has(topic.toUpperCase())).length
          );
          countReposEnPeriodo += repos.length;
          return { ...curso, repos };
        });
        countReposEnMateria += countReposEnPeriodo;
        return { ...periodo, cursos, reposCount: countReposEnPeriodo };
      });

      return { ...materia, periodos, reposCount: countReposEnMateria };
    });
    setProcesing(false);
    return materias;
  }, [fiubaRepos]);
  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header breadcrumb={breadcrumb} />
      <Outlet
        context={{
          setBreadcrumb,
          materias,
          loading: partialLoading || procesing,
        }}
      />
    </Stack>
  );
}

export default Layout;

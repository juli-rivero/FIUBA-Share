import Header from "./Header/Header";
import { Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import useFiubaRepos from "../hooks/useFiubaRepos";
import json from "../data/data.json";

function Layout() {
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [fiubaRepos, partialLoading] = useFiubaRepos();
  const [procesing, setProcesing] = useState(false);
  const materias = useMemo(() => {
    setProcesing(true);

    const materias = json.materias.map((materia) => {
      let countReposEnMateria = 0;
      const cursos = materia.cursos.map((curso) => {
        const topicKeysSet = new Set(
          [materia.id, curso.id].map((k) => k.toLowerCase())
        );
        const repos = fiubaRepos.filter(
          (fiubaRepo) =>
            topicKeysSet.size ===
            fiubaRepo.topics.intersection(topicKeysSet).size
        );
        const periodos = curso.periodos.map((periodo) => ({
          ...periodo,
          reposCount: repos.filter((r) => r.topics.has(periodo.id)).length,
        }));
        const tps = [1, 2, 3, 4].map((id) => ({
          id,
          reposCount: repos.filter((r) => r.topics.has(`tp-${id}`)).length,
        }));
        countReposEnMateria += repos.length;
        return { ...curso, periodos, tps, repos };
      });

      return { ...materia, cursos, reposCount: countReposEnMateria };
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

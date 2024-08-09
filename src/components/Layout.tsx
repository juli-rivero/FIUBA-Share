import Header from "./Header";
import { Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { ItemBreadCrumb } from "../data/interfaces";
import useData from "../hooks/useData";
import json from "../data/data.json";
import { Repository } from "../data/githubInterfaces";

function Layout() {
  const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([]);
  const [data, partialLoading] = useData();
  const [procesing, setProcesing] = useState(false);
  const materias = useMemo(() => {
    setProcesing(true);
    const reposPorTp = new Map<string, Repository[]>();
    data.forEach((repo) => {
      repo.topics.forEach((topic) => {
        if (!reposPorTp.has(topic)) {
          reposPorTp.set(topic, []);
        }
        reposPorTp.get(topic)?.push(repo);
      });
    });

    const materias = json.materias.map((materia) => {
      let countReposEnMateria = 0;
      const periodos = materia.periodos.map((periodo) => {
        let countReposEnPeriodo = 0;
        const cursos = periodo.cursos.map((curso) => {
          let countReposEnCurso = 0;
          const tps = curso.tps.map((tp) => {
            const topicKey = `${materia.id}-${periodo.id}-${curso.id}-${tp.id}`;
            const repos = reposPorTp.get(topicKey.toLowerCase()) || [];

            countReposEnCurso += repos.length;
            return { ...tp, repos };
          });
          countReposEnPeriodo += countReposEnCurso;
          return { ...curso, tps, reposCount: countReposEnCurso };
        });
        countReposEnMateria += countReposEnPeriodo;
        return { ...periodo, cursos, reposCount: countReposEnPeriodo };
      });

      return { ...materia, periodos, reposCount: countReposEnMateria };
    });
    setProcesing(false);
    return materias;
  }, [data]);
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

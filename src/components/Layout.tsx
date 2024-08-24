import Header from "./Header/Header";
import { Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import useFiubaRepos from "../hooks/useFiubaRepos";
import json from "../data/data.json";
import { transformarParaUrl } from "../utils/transformText";

const actividades = [
  "Conjunto de actividades",
  "Final",
  "Parcial 1",
  "Parcial 2",
  "Ejercicios",
  "TP 1",
  "TP 2",
  "TP 3",
  "TP 4",
  "TP 5",
];

function Layout() {
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [fiubaRepos, partialLoading] = useFiubaRepos();
  const [procesing, setProcesing] = useState(false);
  const materias = useMemo(() => {
    setProcesing(true);

    const materias = json.materias.map((materia) => {
      let reposCountEnMateriaConClasificacion = 0;
      const reposEnMateria = fiubaRepos.filter((r) =>
        r.topics.has(materia.id.toLowerCase())
      );
      const cursos = materia.cursos.map((curso) => {
        const repos = reposEnMateria.filter((repoEnMateria) =>
          repoEnMateria.topics.has(curso.id.toLowerCase())
        );
        reposCountEnMateriaConClasificacion += repos.length;

        return {
          ...curso,

          periodos: curso.periodos.map((periodo) => ({
            ...periodo,
            reposCount: repos.filter((r) => r.topics.has(periodo.id)).length,
          })),

          actividades: actividades.map((nombre) => {
            const id = transformarParaUrl(nombre);
            return {
              id,
              nombre,
              reposCount: repos.filter((r) => r.topics.has(id)).length,
            };
          }),

          repos,
        };
      });

      return {
        ...materia,
        cursos,
        reposCount: {
          conClasificacion: reposCountEnMateriaConClasificacion,
          sinClasificacion: reposEnMateria.length
        },
      };
    });
    setProcesing(false);
    return materias;
  }, [fiubaRepos]);
  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header breadcrumb={breadcrumb} setBreadcrumb={setBreadcrumb} />
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

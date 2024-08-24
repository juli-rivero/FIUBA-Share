import { useOutletContext, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/joy";
import { useEffect, useState } from "react";
import { Curso, OutletContextType } from "../../typescript/interfaces";
import useSort, { Sort, SortCursos } from "../../hooks/useSort";
import SortIconButton from "../UI/SortIconButton";
import { transformarParaUrl } from "../../utils/transformText";
import CursoCard from "./CursoCard";

function Cursos() {
  const { materiaName } = useParams();
  const [sort, setSort, sortFunctions] = useSort<SortCursos>(Sort.ReposCount);
  const { setBreadcrumb, materias } = useOutletContext<OutletContextType>();
  const [materiaId, setMateriaId] = useState<string>();
  const [reposCountSinClasificacion, setReposCountSinClasificacion] = useState<number>(0);
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const materia = materias.find(
      (materia) => transformarParaUrl(materia.nombre) == materiaName
    );

    setBreadcrumb([materia!.nombre]);

    setCursos(materia!.cursos);
    setMateriaId(materia!.id)
    setReposCountSinClasificacion(materia!.reposCount.sinClasificacion)
  }, [setBreadcrumb, materias]);

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
              <CursoCard
                key={id}
                nombre={nombre}
                docentes={docentes}
                reposCount={repos.length}
                href={transformarParaUrl(nombre)}
              />
            ))}
            <CursoCard
              nombre={"Todos los cursos"}
              href={`https://fede.dm/FIUBA-Repos/?c=${materiaId}`}
              reposCount={reposCountSinClasificacion}
              target="_blank"
            />

        </Grid>
      </Box>
    </>
  );
}

export default Cursos;

import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import { Typography, Skeleton, Chip } from "@mui/joy";
import { CopyAllOutlined } from "@mui/icons-material";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import useData from "../hooks/useData";
import CartaRepo from "./CartaRepo";
import useSetBreadcrumb from "../hooks/useSetBreadcrumb";

function Repos() {
  const [searchParams] = useSearchParams();
  const [topic, setTopic] = useState<string | null>(null);
  const [repos, partialLoading] = useData(topic);
  const setBreadcrumb = useSetBreadcrumb();

  useEffect(() => {
    const materiaId = searchParams.get("materia"),
      periodoId = searchParams.get("periodo"),
      cursoId = searchParams.get("curso"),
      tpId = searchParams.get("tp");

    setTopic(`${materiaId}-${periodoId}-${cursoId}-${tpId}`);

    const materia = materias.find((materia) => materia.id == materiaId);
    const periodo = materia!.periodos.find(
      (periodo) => periodo.id == periodoId
    );
    const curso = periodo!.cursos.find((curso) => curso.id == cursoId);
    const tp = curso!.tps.find((tp) => tp.id == tpId);

    setBreadcrumb([
      { nombre: "Materias" },
      { nombre: materia!.nombre },
      { nombre: `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre` },
      { nombre: `${curso!.nombre}` },
      { nombre: `${tp!.id} - ${tp!.nombre}` },
    ]);
  }, [setBreadcrumb, searchParams]);

  return (
    <>
      {topic && (
        <Typography
          variant="soft"
          display="flex"
          alignItems="center"
          width="fit-content"
          margin={2}
          paddingInline={1}
          paddingBlock={0.5}
          marginLeft="auto"
        >
          Topic:
          <Chip
          component="span"
            variant="outlined"
            sx={{ borderRadius: 2, marginInline: 1, bgcolor: "inherit" }}
          >
            {topic}

            <CopyAllOutlined sx={{ cursor: "pointer", marginLeft: 1 }} />
          </Chip>
        </Typography>
      )}
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {repos.length == 0
          ? !partialLoading && (
              <Typography>
                No hay ningun repositorio en este trabajo práctico. Se el
                primero en agregar uno!
              </Typography>
            )
          : repos.map((repo, index) => (
              <CartaRepo repositorio={repo} key={index} />
            ))}
        {partialLoading && (
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

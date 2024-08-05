import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Stack, Typography, Skeleton, Chip } from "@mui/joy";
import { CopyAllOutlined } from "@mui/icons-material";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { ItemBreadCrumb } from "../data/interfaces";
import useData from "../hooks/useData";
import CartaRepo from "./CartaRepo";

function Repos() {
  const [searchParams] = useSearchParams();
  const topic = `${searchParams.get("materia")}-${searchParams.get(
    "periodo"
  )}-${searchParams.get(
    "curso"
  )}-${searchParams.get("tp")}`;
  const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([]);
  const [repos, partialLoading] = useData(topic);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    const periodo = materia!.periodos.find(
      (periodo) => periodo.id == searchParams.get("periodo")
    );
    const curso = periodo!.cursos.find(
      (curso) => curso.id == searchParams.get("curso")
    );
    const tp = curso!.tps.find((tp) => tp.id == searchParams.get("tp"));

    setBreadcrumb([
      { nombre: "Materias", href: "../../../../" },
      {
        nombre: materia!.nombre,
        href: `../../../?materia=${searchParams.get("materia")}`,
      },
      {
        nombre: `${periodo!.año} - ${periodo!.cuatrimestre}° Cuatrimestre`,
        href: `../../?materia=${searchParams.get(
          "materia"
        )}&periodo=${searchParams.get("periodo")}`,
      },
      {
        nombre: `${curso!.id} - ${curso!.nombre}`,
        href: `../?materia=${searchParams.get(
          "materia"
        )}&periodo=${searchParams.get("periodo")}&curso=${searchParams.get("curso")}`,
      },
      { nombre: `${tp!.id} - ${tp!.nombre}` },
    ]);
  }, []);

  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header breadcrumb={breadcrumb} />
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
          variant="outlined"
          sx={{ borderRadius: 2, marginInline: 1, bgcolor: "inherit" }}
        >
          {topic}

          <CopyAllOutlined sx={{ cursor: "pointer", marginLeft: 1 }} />
        </Chip>
      </Typography>
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
    </Stack>
  );
}

export default Repos;

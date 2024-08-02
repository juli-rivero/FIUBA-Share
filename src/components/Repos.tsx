import { materias } from "../data/data.json";

import { useSearchParams } from "react-router-dom";
import Header from "./Header";
import { Stack, Card, CardContent, Typography, Skeleton, Chip } from "@mui/joy";
import {CopyAllOutlined} from "@mui/icons-material"
import { Link } from "react-router-dom";
import { Unstable_Grid } from "@mui/system";
import { useEffect, useState } from "react";
import { ItemBreadCrumb } from "../data/interfaces";
import useData from "../hooks/useData";

function Repos() {
  const [searchParams] = useSearchParams();
  const topic = `${searchParams.get("materia")}-${searchParams.get(
    "anio"
  )}-${searchParams.get("cuatrimestre")}-${searchParams.get(
    "curso"
  )}-${searchParams.get("tp")}`;
  const [hover, setHover] = useState<number | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<ItemBreadCrumb[]>([]);
  const [repos, partialLoading] = useData(topic);

  useEffect(() => {
    const materia = materias.find(
      (materia) => materia.id == searchParams.get("materia")
    );
    const fecha = materia!.fechas.find(
      (fecha) =>
        fecha.año.toString() == searchParams.get("anio") &&
        fecha.cuatrimestre.toString() == searchParams.get("cuatrimestre")
    );
    const curso = fecha!.cursos.find(
      (curso) => curso.id == searchParams.get("curso")
    );
    const tp = curso!.tps.find((tp) => tp.id == searchParams.get("tp"));

    setBreadcrumb([
      { nombre: "Materias", href: "../../../" },
      {
        nombre: materia!.nombre,
        href: `../../?materia=${searchParams.get("materia")}`,
      },
      {
        nombre: `${fecha!.año} - ${fecha!.cuatrimestre}° Cuatrimestre`,
        href: `../?materia=${searchParams.get(
          "materia"
        )}&anio=${searchParams.get("anio")}&cuatrimestre=${searchParams.get(
          "cuatrimestre"
        )}`,
      },
      {
        nombre: `${curso!.id} - ${curso!.nombre}`,
        href: `../?materia=${searchParams.get(
          "materia"
        )}&anio=${searchParams.get("anio")}&cuatrimestre=${searchParams.get(
          "cuatrimestre"
        )}&curso=${searchParams.get("curso")}`,
      },
      { nombre: `${tp!.id} - ${tp!.nombre}` },
    ]);
  }, []);

  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header breadcrumb={breadcrumb} />
      <Typography variant="soft" display="flex" alignItems="center" width="fit-content" margin={2} paddingInline={1} paddingBlock={.5} marginLeft="auto">
        Topic:
        <Chip variant="outlined" sx={{borderRadius:2, marginInline:1, bgcolor:"inherit"}}>{topic}

        <CopyAllOutlined sx={{cursor:"pointer", marginLeft:1}}/>
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
          : repos.map(({ name, html_url }, index) => (
              <Link
                style={{ textDecoration: "none" }}
                key={index}
                to={html_url}
              >
                <Card
                  onMouseOver={() => setHover(index)}
                  onMouseLeave={() => setHover(null)}
                  color="neutral"
                  variant={hover === index ? "solid" : "soft"}
                >
                  <CardContent>{`${name}`}</CardContent>
                </Card>
              </Link>
            ))}
        {partialLoading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: 4 }}
            width={210}
            height={60}
          />
        )}
      </Unstable_Grid>
    </Stack>
  );
}

export default Repos;

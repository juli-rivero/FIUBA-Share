import { Card, CardContent, Grid } from "@mui/joy";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { OutletContextType } from "../typescript/interfaces";
import CardOverflowReposCount from "./UI/CardOverflowReposCount";
import useSort, { Sort, SortMaterias } from "../hooks/useSort";
import SortIconButton from "./UI/SortIconButton";
import { transformarParaUrl } from "../utils/transformText";

function Materias() {
  const [hover, setHover] = useState<string | null>(null);
  const [sort, setSort, sortFunctions] = useSort<SortMaterias>(Sort.ReposCount);
  const { setBreadcrumb, materias } = useOutletContext<OutletContextType>();
  useEffect(() => {
    setBreadcrumb(["Materias"]);
  }, [setBreadcrumb]);

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
      <Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        padding={8}
        overflow="auto"
        alignItems="center"
        justifyContent="center"
      >
        {materias
          .toSorted(sortFunctions[sort])
          .map(({ nombre, id, reposCount }) => (
            <Link
              style={{ textDecoration: "none", flexGrow: 1 }}
              key={id}
              to={transformarParaUrl(nombre)}
            >
              <Card
                orientation="horizontal"
                onMouseOver={() => setHover(id)}
                onMouseLeave={() => setHover(null)}
                color="neutral"
                variant={hover === id ? "solid" : "soft"}
              >
                <CardContent>{nombre}</CardContent>
                <CardOverflowReposCount reposCount={reposCount} />
              </Card>
            </Link>
          ))}
      </Grid>
    </>
  );
}

export default Materias;

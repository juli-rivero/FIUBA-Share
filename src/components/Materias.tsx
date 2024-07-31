import materias from "../data/materias.json";

import Header from "./Header";
import { Stack, Link } from "@mui/joy";
import { Unstable_Grid } from "@mui/system";

function Materias() {
  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header itemsBreadcrumb={["Materias"]} />
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={4}
        alignItems="center"
        justifyContent="center"
      >
        {materias.map(({ nombre, id }) => (
          <Link
            underline="none"
            color="neutral"
            variant="soft"
            padding="1.5rem"
            borderRadius={4}
            href={`./fechas?materia=${id}`}
          >
            {nombre}
          </Link>
        ))}
      </Unstable_Grid>
    </Stack>
  );
}

export default Materias;

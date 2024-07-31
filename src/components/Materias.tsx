import materias from "../data/materias.json";

import Header from "./Header";
import { Card, CardContent, Stack } from "@mui/joy";
import { Unstable_Grid } from "@mui/system";

function Materias() {
  return (
    <Stack sx={{ height: "100%" }} gridTemplateRows="auto 2fr">
      <Header />
      <Unstable_Grid
        sx={{ height: "100%" }}
        container
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        {materias.map(({ nombre }) => (
          <Unstable_Grid>
            <Card variant="soft" size="lg">
              <CardContent>{nombre}</CardContent>
            </Card>
          </Unstable_Grid>
        ))}
      </Unstable_Grid>
    </Stack>
  );
}

export default Materias;

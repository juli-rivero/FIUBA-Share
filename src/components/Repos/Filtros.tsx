import { Card, CardContent, Option, Select, Stack } from "@mui/joy";
import { Periodo, Tp } from "../../typescript/interfaces";
import { useSearchParams } from "react-router-dom";
import CardOverflowReposCount from "../UI/CardOverflowReposCount";

const Label = ({
  label,
  reposCount,
}: {
  label: string;
  reposCount: number;
}) => (
  <Card
    size="sm"
    variant="plain"
    sx={{ background: "inherit", width: "100%", fontSize:"md" }}
    orientation="horizontal"
  >
    <CardContent>{label}</CardContent>
    <CardOverflowReposCount reposCount={reposCount} />
  </Card>
);

function Filtro({
  options,
  clave,
}: {
  clave: string;
  options: Array<{ value: string | null; label: React.ReactNode }>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Select
      defaultValue={options[0].value}
      slotProps={{listbox:{sx:{padding:0}}}}
      onChange={(_e, newValue) => {
        newValue == ""
          ? searchParams.set(clave, newValue)
          : searchParams.delete(clave);
        setSearchParams(searchParams);
      }}
      sx={{ minWidth: 160 }}
      renderValue={(option) =>
        option?.ref.current?.firstElementChild?.firstElementChild
              ?.textContent
      }
    >
      {" "}
      {options.map(({ value, label }, index) => (
        <Option key={index} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
}

function Filtros({
  periodos,
  tps,
  totalRepos,
}: {
  periodos: Periodo[];
  tps: Tp[];
  totalRepos: number;
}) {
  return (
    <Stack direction="row" flexGrow={2} justifyContent="center" gap="min(2rem,3vw)" >
      <Filtro
        clave="periodo"
        options={[
          {
            label: <Label label="Todos los periodos" reposCount={totalRepos} />,
            value: "",
          },
          ...periodos.map(({ año, cuatrimestre, id, reposCount }) => ({
            label: (
              <Label
                label={`${año} - ${cuatrimestre}° Cuatrimestre`}
                reposCount={reposCount}
              />
            ),
            value: id,
          })),
        ]}
      />
      <Filtro
        clave="tp"
        options={[
          {
            label: <Label label="Todos los tps" reposCount={totalRepos} />,
            value: "",
          },
          ...tps.map(({ id, reposCount }) => ({
            label: <Label label={`TP ${id}`} reposCount={reposCount} />,
            value: id,
          })),
        ]}
      />
    </Stack>
  );
}

export default Filtros;

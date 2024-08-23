import {
  Card,
  CardContent,
  IconButton,
  Option,
  Select,
  SelectStaticProps,
  Stack,
} from "@mui/joy";
import { Actividad, Periodo } from "../../typescript/interfaces";
import { useSearchParams } from "react-router-dom";
import CardOverflowReposCount from "../UI/CardOverflowReposCount";
import { useRef } from "react";
import { RiCloseLine } from "react-icons/ri";

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
    sx={{ background: "inherit", width: "100%", fontSize: "md" }}
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
  const action: SelectStaticProps["action"] = useRef(null);
  return (
    <Select
      action={action}
      value={searchParams.get(clave)}
      placeholder={`Filtrar por ${clave}`}
      slotProps={{ listbox: { sx: { padding: 0 } } }}
      onChange={(_e, newValue) => {
        newValue
          ? searchParams.set(clave, newValue)
          : searchParams.delete(clave);
        setSearchParams(searchParams);
      }}
      {...(searchParams.has(clave) && {
        // display the button and remove select indicator
        // when user has selected a value
        endDecorator: (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onMouseDown={(event) => {
              // don't open the popup when clicking on this button
              event.stopPropagation();
            }}
            onClick={() => {
              searchParams.delete(clave);
              setSearchParams(searchParams);
              action.current?.focusVisible();
            }}
          >
            <RiCloseLine />
          </IconButton>
        ),
        indicator: null,
      })}
      sx={{ minWidth: 160 }}
      renderValue={(option) =>
        option?.ref.current?.firstElementChild?.firstElementChild?.textContent
      }
    >
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
  actividades,
}: {
  periodos: Periodo[];
  actividades: Actividad[];
}) {
  return (
    <Stack
      direction="row"
      flexGrow={2}
      justifyContent="center"
      gap="min(2rem,3vw)"
    >
      <Filtro
        clave="periodo"
        options={periodos.map(({ año, cuatrimestre, id, reposCount }) => ({
          label: (
            <Label
              label={`${año} - ${cuatrimestre}° Cuatrimestre`}
              reposCount={reposCount}
            />
          ),
          value: id,
        }))}
      />
      <Filtro
        clave="actividad"
        options={actividades.map(({ id, nombre, reposCount }) => ({
          label: <Label label={nombre} reposCount={reposCount} />,
          value: id,
        }))}
      />
    </Stack>
  );
}

export default Filtros;

import { CopyAllOutlined } from "@mui/icons-material";
import { Chip, Stack, Typography } from "@mui/joy";
import { useSearchParams } from "react-router-dom";

const Topic = ({
  value,
}: {
  value?: string | null;
}) => (
  <>
    { value && (
        <Chip
          component="span"
          variant="outlined"
          sx={{ borderRadius: 2, bgcolor: "inherit" }}
        >
          {value}
          <CopyAllOutlined sx={{ cursor: "pointer", marginLeft: 1 }} />
        </Chip>
    )}
  </>
);

function Topics() {
  const [searchParams] = useSearchParams();

  return (
    <Stack direction="row" justifyContent="flex-end" margin="1rem" gap={.5}>
      <Typography marginRight={1}>Topics:</Typography>
      <Topic  value="fiuba" />
      <Topic  value={searchParams.get("materia")} />
      <Topic  value={searchParams.get("periodo")} />
      <Topic  value={searchParams.get("curso")} />
    </Stack>
  );
}

export default Topics;

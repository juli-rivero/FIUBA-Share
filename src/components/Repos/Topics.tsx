import { RiPencilLine } from "react-icons/ri";
import { Chip, Stack, Typography } from "@mui/joy";

const Topic = ({ value }: { value?: string | null }) => (
  <>
    {value && (
      <Chip
        component="span"
        variant="outlined"
        sx={{ borderRadius: 2, bgcolor: "inherit" }}
      >
        {value}
        <RiPencilLine style={{ marginLeft: ".5rem" }} />
      </Chip>
    )}
  </>
);

function Topics({topics}: {topics:string[]}) {
  return (
    <Stack
      direction="row"
      flexGrow={1}
      justifyContent="flex-end"
      alignItems="center"
      gap={0.5}
    >
      <Typography marginRight={1}>Topics:</Typography>
      {topics.map(value=><Topic key={value} value={value} />)}
    </Stack>
  );
}

export default Topics;

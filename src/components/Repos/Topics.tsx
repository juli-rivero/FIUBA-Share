import { RiPencilLine } from "react-icons/ri";
import { Chip, Stack, Typography } from "@mui/joy";

const Topic = ({ value }: { value: string }) => {
  return (
      <Chip
        component="span"
        variant="outlined"
        sx={{ borderRadius: 2, bgcolor: "inherit", fontFamily:"monospace" }}
      >
        {value}
        <RiPencilLine onClick={()=>{

        }} style={{ marginLeft: ".5rem" }} />
      </Chip>
)}

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
      {topics.map(value=><Topic key={value} value={value.toLowerCase()} />)}
    </Stack>
  );
}

export default Topics;

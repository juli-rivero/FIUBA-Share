import { CardOverflow, Skeleton, Typography } from "@mui/joy";
import GithubReposIcon from "./GithubReposIcon";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../typescript/interfaces";

const CardOverflowReposCount = ({ reposCount }: { reposCount: number }) => {
  const {loading} = useOutletContext<OutletContextType>()
  return (
  <CardOverflow sx={{ alignItems: "start", gap: 1, marginLeft:1 }}>
    {loading
    ? <Skeleton variant="text" width="1rem" sx={{fontSize:"1rem", padding:0}} />
    :<Typography fontSize="sm" fontFamily="monospace" textColor="gray">
      {reposCount}
    </Typography>
    }
    <GithubReposIcon fill="gray" />
  </CardOverflow>
)};
export default CardOverflowReposCount;

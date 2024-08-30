import { CardOverflow, Skeleton, Typography } from "@mui/joy";
import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../../typescript/interfaces";
import { RiGitRepositoryLine } from "react-icons/ri";

const CardOverflowReposCount = ({ reposCount }: { reposCount: number }) => {
  const { loading } = useOutletContext<OutletContextType>();
  return (
    <CardOverflow
      sx={{ alignItems: "start", gap: 1, marginLeft: 1, position: "relative" }}
    >
      <Typography
        fontSize="sm"
        fontFamily="monospace"
        textAlign="center"
        position="relative"
        textColor="gray"
      >
        {reposCount}
        <Skeleton
          loading={loading}
          variant="overlay"
          animation="pulse"
          sx={{ inset: 0, background: "transparent" }}
          content={reposCount.toString()}
        />
      </Typography>
      <RiGitRepositoryLine fill="gray" />
    </CardOverflow>
  );
};
export default CardOverflowReposCount;

import {
  RiGitRepositoryLine,
  RiCalendarEventLine,
  RiSortAlphabetAsc,
  RiStarLine,
  RiCalendarScheduleLine,
} from "react-icons/ri";
import { IconButton, Tooltip, useColorScheme } from "@mui/joy";
import { Sort } from "../../hooks/useSort";

interface ISortIcon {
  sort: Sort;
}
const SortIcon = ({ sort }: ISortIcon) => {
  const { mode } = useColorScheme();
  switch (sort) {
    case "az":
      return (
        <Tooltip
          placement="left-end"
          modifiers={[{ name: "offset", options: { offset: [0, 16] } }]}
          title="Ordenado por orden alfabético"
        >
          <div>
            <RiSortAlphabetAsc />
          </div>
        </Tooltip>
      );
    case "periodo":
      return (
        <Tooltip
          placement="left-end"
          modifiers={[{ name: "offset", options: { offset: [0, 16] } }]}
          title="Ordenado por actualidad"
        >
          <div>
            <RiCalendarEventLine />
          </div>
        </Tooltip>
      );
    case "points":
      return (
        <Tooltip
          placement="left-end"
          modifiers={[{ name: "offset", options: { offset: [0, 16] } }]}
          title="Ordenado por puntos"
        >
          <div>
            <RiStarLine />
          </div>
        </Tooltip>
      );
    case "recent":
      return (
        <Tooltip
          placement="left-end"
          modifiers={[{ name: "offset", options: { offset: [0, 16] } }]}
          title="Ordenado por más reciente"
        >
          <div>
            <RiCalendarScheduleLine />
          </div>
        </Tooltip>
      );
    case "reposCount":
      return (
        <Tooltip
          placement="left-end"
          modifiers={[{ name: "offset", options: { offset: [0, 16] } }]}
          title="Ordenado por cantidad de repositorios"
        >
          <div>
            <RiGitRepositoryLine fill={mode == "dark" ? "white" : "black"} />
          </div>
        </Tooltip>
      );
  }
};

function SortIconButton({
  onClick,
  sort,
}: {
  onClick: React.MouseEventHandler;
  sort: Sort;
}) {
  return (
    <IconButton
      sx={{
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
      }}
      color="neutral"
      variant="soft"
      onClick={onClick}
    >
      <SortIcon sort={sort} />
    </IconButton>
  );
}
export default SortIconButton;

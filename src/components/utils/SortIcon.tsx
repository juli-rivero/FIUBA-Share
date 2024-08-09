import {
  EventNote,
  FormatListNumbered,
  Schedule,
  SortByAlpha,
  StarBorder,
} from "@mui/icons-material";
import {
  SortCursos,
  SortMaterias,
  SortPeriodos,
  SortRepos,
  SortTPs,
} from "../../data/interfaces";
import GithubReposIcon from "./GithubReposIcon";
import { Tooltip, useColorScheme } from "@mui/joy";

interface ISortIcon {
  sort: SortMaterias | SortPeriodos | SortCursos | SortTPs | SortRepos;
}
const SortIcon = ({ sort }: ISortIcon) => {
  const { mode } = useColorScheme();
  switch (sort) {
    case "a-z":
      return (
        <Tooltip
          placement="left-end"
          modifiers={[{ name: "offset", options: { offset: [0, 16] } }]}
          title="Ordenado por orden alfabético"
        >
          <div>
            <SortByAlpha />
          </div>
        </Tooltip>
      );
    case "id":
      return (
        <Tooltip
          placement="left-end"
          modifiers={[{ name: "offset", options: { offset: [0, 16] } }]}
          title="Ordenado por ID"
        >
          <div>
            <FormatListNumbered />
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
            <EventNote />
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
            <StarBorder />
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
            <Schedule />
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
            <GithubReposIcon fill={mode == "dark" ? "white" : "black"} />
          </div>
        </Tooltip>
      );
  }
};
export default SortIcon;

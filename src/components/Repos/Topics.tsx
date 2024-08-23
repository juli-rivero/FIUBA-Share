import { RiStickyNoteAddLine, RiCheckDoubleLine } from "react-icons/ri";
import { Chip, ChipDelete, Stack, Tooltip, Typography } from "@mui/joy";
import { useState } from "react";

const Topic = ({ value }: { value: string }) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  return (
    <Tooltip
      placement="top"
      arrow
      open={openTooltip != null}
      color={openTooltip === "¡Copiado!" ? "primary" : "warning"}
      onOpen={() => setTimeout(() => setOpenTooltip(null), 3000)}
      title="¡Copiado!"
    >
      <Chip
        variant="outlined"
        sx={{
          borderRadius: 2,
          bgcolor: "inherit",
          fontFamily: "monospace",
          gap: ".5rem",
        }}
        endDecorator={
          <ChipDelete style={{ background: "inherit", cursor: "default" }}>
            {openTooltip ? (
              <RiCheckDoubleLine />
            ) : (
              <RiStickyNoteAddLine
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => {
                  navigator.clipboard
                    .writeText(value)
                    .then(() => setOpenTooltip("¡Copiado!"))
                    .catch(() => setOpenTooltip("No se pudo copiar"));
                  setHover(false)
                }}
                style={{
                  padding: ".1rem",
                  cursor: "pointer",
                  borderRadius: "1px",
                  background: hover ? "#aaaa" : "inherit",
                  boxSizing: "border-box",
                }}
              />
            )}
          </ChipDelete>
        }
      >
        {value}
      </Chip>
    </Tooltip>
  );
};

function Topics({ topics }: { topics: string[] }) {
  return (
    <Stack
      direction="row"
      flexGrow={1}
      justifyContent="flex-end"
      alignItems="center"
      gap={0.5}
    >
      <Typography marginRight={1}>Topics:</Typography>
      {topics.map((value) => (
        <Topic key={value} value={value.toLowerCase()} />
      ))}
    </Stack>
  );
}

export default Topics;

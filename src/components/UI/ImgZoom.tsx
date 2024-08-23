import { Card, CardCover } from "@mui/joy";
import { CSSProperties, MouseEventHandler } from "react";

function ImgZoom({
  src,
  alt,
  style,
  onClick
}: {
  src: string;
  alt?: string;
  style?: CSSProperties;
  onClick: MouseEventHandler<HTMLElement>
}) {
  return (
    <>
      <Card
        variant="plain"
        sx={{
          position: "relative",
          width: 300,
          bgcolor: "initial",
          p: 0,
          cursor:"zoom-in"
        }}
          onClick={onClick}
      >
        <img
          src={src}
          alt={alt}
          style={{...style}}
        />
        <CardCover
          className="gradient-cover"
          sx={{
            "&:hover, &:focus-within": {
              opacity: 1,
            },
            opacity: 0,
            transition: ".3s ease",
            background:
              "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
          }}
        >
        </CardCover>
      </Card>
      
    </>
  );
}

export default ImgZoom;

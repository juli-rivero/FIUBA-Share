import { Breadcrumbs, Card, CardContent } from "@mui/joy";
import { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, resolvePath } from "react-router-dom";

function Navegacion({ breadcrumb }: { breadcrumb: string[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [hash, search] = location.hash.split("?");
  const path = hash.slice(1);

  return (
    <Breadcrumbs
      size="md"
      separator={<RiArrowRightSLine />}
      aria-label="breadcrumbs"
    >
      {breadcrumb.map((nombre, index) => (
        <Link
          key={index}
          style={{ textDecoration: "none" }}
          reloadDocument={breadcrumb.length - 1 == index}
          to={resolvePath(
            {
              pathname: "../".repeat(breadcrumb.length - 1 - index),
              search: search ? search.split("&").slice(0, index).join("&") : "",
            },
            path
          )}
        >
          <Card
            onMouseOver={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            size="sm"
            color="neutral"
            variant={hover === index ? "outlined" : "soft"}
          >
            <CardContent>{nombre}</CardContent>
          </Card>
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default Navegacion;

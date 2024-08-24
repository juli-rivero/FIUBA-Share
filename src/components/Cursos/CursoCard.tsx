import { Card, CardContent, List, ListItem, Typography } from "@mui/joy"
import { Link } from "react-router-dom"
import { HTMLAttributeAnchorTarget, useState } from "react";
import CardOverflowReposCount from "../UI/CardOverflowReposCount";

function CursoCard({nombre,docentes,reposCount, href, target}: {nombre:string, docentes?:string, reposCount:number; href: string; target?: HTMLAttributeAnchorTarget}) {
    const [hover, setHover] = useState(false);

   return (<Link
    style={{ textDecoration: "none", flexGrow: 1 }}
    to={href}
    target={target}
  >
    <Card
      sx={{ height: "100%" }}
      orientation="horizontal"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      color="neutral"
      variant={hover ? "solid" : "soft"}
    >
      <CardContent style={{...(!docentes && {alignItems:"center", justifyContent:"center"})}}>
        <Typography level="title-lg">{nombre}</Typography>
        {docentes &&
        <List>
          {docentes.split(",").map((docente) => (
            <ListItem sx={{ fontSize: ".85rem" }} key={docente}>
              {docente}
            </ListItem>
          ))}
        </List>
        }
      </CardContent>
      <CardOverflowReposCount reposCount={reposCount} />
    </Card>
  </Link>)
}

export default CursoCard
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Typography,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { Repository } from "../../typescript/githubInterfaces";
import useContributors from "../../hooks/useContributors";

const CartaRepo = ({ repositorio }: { repositorio: Repository }) => {
  const {
    name,
    full_name,
    description,
    html_url,
    owner,
    contributors_url,
    updated_at,
    score,
  } = repositorio;
  const [contributors, loading] = useContributors(contributors_url);

  return (
    <Card
      variant="outlined"
      sx={{
        width: 340,
        // to make the card resizable
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to={owner.html_url} title={owner.login}>
          <Avatar src={owner.avatar_url} size="lg" />
        </Link>
        <Link
          to={html_url + "/graphs/contributors"}
          title="Contributors"
          style={{ textDecoration: "none" }}
        >
          <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
            {loading ? (
              <>
                <Avatar>?</Avatar>
                <Avatar>?</Avatar>
                <Avatar>?</Avatar>
              </>
            ) : (
              contributors.length > 1 && (
                <>
                  {contributors.slice(0, 3).map(({ avatar_url, id }) => (
                    <Avatar key={id} src={avatar_url} />
                  ))}
                  {contributors.length > 3 && <Avatar />}
                </>
              )
            )}
          </AvatarGroup>
        </Link>
      </Box>
      <CardContent>
        <Link to={html_url}>
          <Typography level="title-lg">{name}</Typography>
          <Typography level="title-sm">{full_name}</Typography>
        </Link>
        <Typography level="body-sm">{description}</Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
          <Typography level="body-xs" whiteSpace="nowrap">
            {score + " puntos"}
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">
            {"Actualizado el " +
              new Date(updated_at).toLocaleString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
              })}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default CartaRepo;

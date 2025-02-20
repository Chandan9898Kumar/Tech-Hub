import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexFlow: "column",
  top: "100px",
  position: "relative",
} as const; // Type is readonly.

const imageStyle = {
  width: 320,
  height: "auto",
  my: { xs: 5, sm: 10 },
} as const; // Type is readonly:
const NotFoundView = () => {
  const navigate = useNavigate();

  const handleHomeClick = (): void => {
    navigate("/");
  };
  return (
    <Container style={containerStyle}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Oops! Something Went Wrong
      </Typography>

      <Typography sx={{ color: "text.secondary" }}>
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps
        you&apos;ve mistyped the URL? Be sure to check your spelling.
      </Typography>

      <Box
        component="img"
        src="https://free.minimals.cc/assets/illustrations/illustration-404.svg"
        sx={imageStyle}
        loading="lazy"
        alt="404 illustration"
      />

      <Button
        size="large"
        variant="contained"
        color="inherit"
        onClick={handleHomeClick}
      >
        Go to home
      </Button>
    </Container>
  );
};

NotFoundView.displayName = "NotFound";

export default NotFoundView;

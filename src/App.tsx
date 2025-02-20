import "./App.css";
import Header from "@/Pages/Header/Header";
import Router from "@Router/Router";
import Footer from "@/Pages/Footer/Footer";
import { Box } from "@mui/material";
function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Ensures minimum height is full viewport height
          position: "relative", // For proper stacking context
          overflow: "auto", // Handles overflow content
          paddingBottom: "footerHeight", // Add padding to prevent footer overlap
          // You can use theme.spacing() or direct pixel/rem values

          // Make responsive using breakpoints
          "@media (max-width: 600px)": {
            paddingBottom: "mobileFooterHeight",
          },

          // Ensure proper content flow
          "& > *": {
            position: "relative",
            width: "100%",
          },
        }}
      >
        <Router />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;

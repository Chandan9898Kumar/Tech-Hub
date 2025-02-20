import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
export default function PrimarySearchAppBar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <HistoryIcon />
          </Badge>
        </IconButton>
        <p>History</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <DarkModeIcon />
        </IconButton>
        <p>Mode</p>
      </MenuItem>
    </Menu>
  );

  // Animation variants
  const headerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <motion.div initial="hidden" animate="visible" variants={headerVariants}>
        <AppBar
          position="static"
          sx={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.125)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            color: "black",
          }}
        >
          <Toolbar>
            <motion.div whileHover="hover" variants={iconVariants}>
              <Tooltip title="Home">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <LocalMallIcon />
                </IconButton>
              </Tooltip>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Tech - Hub
              </Typography>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* Wrap each IconButton with motion.div for hover animation */}
              <motion.div whileHover="hover" variants={iconVariants}>
                <Tooltip title="Order History">
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={4} color="error">
                      <HistoryIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </motion.div>

              <motion.div whileHover="hover" variants={iconVariants}>
                <Tooltip title="Add To Cart">
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={17} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </motion.div>

              <motion.div whileHover="hover" variants={iconVariants}>
                <IconButton size="large" edge="end" color="inherit">
                  <DarkModeIcon />
                </IconButton>
              </motion.div>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <motion.div whileHover="hover" variants={iconVariants}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </motion.div>
            </Box>
          </Toolbar>
        </AppBar>
      </motion.div>
      {renderMobileMenu}
    </Box>
  );
}

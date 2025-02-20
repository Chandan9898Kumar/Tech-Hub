import { motion } from "framer-motion";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

// Animation variants
const footerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 8,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const Footer = () => {
  
  const socialLinks = [
    { icon: <Facebook />, label: "Facebook", url: "#" },
    { icon: <Twitter />, label: "Twitter", url: "#" },
    { icon: <Instagram />, label: "Instagram", url: "#" },
    { icon: <LinkedIn />, label: "LinkedIn", url: "#" },
    { icon: <GitHub />, label: "GitHub", url: "#" },
  ];

  const contactInfo = [
    { icon: <Email />, text: "contact@techhub.com" },
    { icon: <Phone />, text: "+1 234 567 890" },
    { icon: <LocationOn />, text: "123 Tech Street, Digital City" },
  ];

  return (
    <motion.footer
    initial="hidden"
    whileInView="visible"
    variants={footerVariants}
    viewport={{ once: true }}
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(255, 255, 255, 0.125)",
      padding: "2rem 0",
      width: "100%", // Ensure full width
      position: "relative", // Changed from fixed to relative
      bottom: 0,
      left: 0,
      right: 0,
    }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Tech Hub
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Your one-stop destination for all things tech. We provide the latest
                gadgets and accessories with exceptional service.
              </Typography>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Quick Links
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {["Home", "Products", "About Us", "Contact", "Support"].map(
                  (link) => (
                    <motion.div
                      key={link}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ cursor: "pointer" }}
                      >
                        {link}
                      </Typography>
                    </motion.div>
                  )
                )}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    {info.icon}
                    <Typography variant="body2" color="textSecondary">
                      {info.text}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 4,
              flexWrap: "wrap",
            }}
          >
            {socialLinks.map((social, index) => (
              <motion.div key={index} variants={iconVariants} whileHover="hover">
                <IconButton
                  color="primary"
                  aria-label={social.label}
                  component="a"
                  href={social.url}
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 4 }}
          >
            © {new Date().getFullYear()} Tech Hub. All rights reserved.
          </Typography>
        </motion.div>
      </Container>
    </motion.footer>
  );
};

export default Footer;

import { memo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";

const Input = ({ id, label, value, name, type, placeholder, onChange }) => {
  // Animation variants
  const inputVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={inputVariants}
      whileHover={{ scale: 1.01 }}
      whileFocus={{ scale: 1.02 }}
    >
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 0, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id={id}
          label={label}
          value={value}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      </Box>
    </motion.div>
  );
};

export default memo(Input);

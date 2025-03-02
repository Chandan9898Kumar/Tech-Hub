import { memo, FC, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";

interface InputProps {
  id: string;
  label: string;
  value: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: FC<InputProps> = ({
  id,
  label='text',
  value,
  name='text',
  type='text',
  placeholder='text',
  onChange,
  className=""
}) => {
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
          className={className}
          variant="outlined"
          InputProps={{
            sx: {
              position: 'relative',
            }
          }}
        />
      </Box>
    </motion.div>
  );
};

export default memo(Input);

import Button from "@mui/material/Button";
import { FC, memo } from "react";

interface ButtonProps {
  variant: "text" | "outlined" | "contained";
  size: "small" | "medium" | "large";
  onClick: () => void;
  className: string;
  disabled: boolean;
  children: React.ReactNode;
}

type Optional = Partial<ButtonProps>;

const ButtonBase: FC<Optional> = ({
  variant = "text",
  size = "medium",
  onClick = () => {},
  className = "",
  disabled = false,
  children,
}) => {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      size={size}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default memo(ButtonBase);

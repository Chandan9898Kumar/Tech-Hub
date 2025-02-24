import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography } from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo } from "react";
const Style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
} as const;

const StyleDiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px auto",
} as const;

interface PaginationProps {
  totalPage: number;
  itemPerPage?: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPage,
  activePage,
  onPageChange,
}) => {
  const next = (): void => {
    if (activePage <= 10) {
      onPageChange(activePage + 1);
    }
  };

  const prev = (): void => {
    if (activePage >= 1) {
      onPageChange(activePage - 1);
    }
  };

  return (
    <div className="flex items-center gap-8" style={StyleDiv}>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={activePage === 1}
        style={Style}
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography
        color="gray"
        className="font-normal"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        Page{" "}
        <strong className="text-gray-900">
          <AnimatePresence mode="wait">
            <motion.span
              key={activePage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-8 text-center font-medium"
            >
              {activePage}
            </motion.span>
          </AnimatePresence>
        </strong>{" "}
        of <strong className="text-gray-900">{totalPage}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={activePage === totalPage}
        style={Style}
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export default memo(Pagination);

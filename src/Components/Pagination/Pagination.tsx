import { memo, FC } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  const next = ():void => {
    if (activePage <= 10) {
      onPageChange(activePage + 1);
    }
  };

  const prev = ():void => {
    if (activePage >= 1) {
      onPageChange(activePage - 1);
    }
  };

  return (
    <div className="flex items-center gap-8" style={Style}>
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
        Page <strong className="text-gray-900">{activePage}</strong> of{" "}
        <strong className="text-gray-900">{totalPage}</strong>
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

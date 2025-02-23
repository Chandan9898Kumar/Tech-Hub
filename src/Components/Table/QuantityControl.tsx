// components/QuantityControl/QuantityControl.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ButtonBase from "@Components/Button/Button";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityControlProps) => {
  return (
    <div className="flex items-center gap-2 bg-purple-50 rounded-lg p-1 w-fit">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <ButtonBase
          variant="text"
          size="small"
          onClick={onDecrease}
          className="h-8 w-8 hover:bg-purple-100 transition-colors"
        >
          <Minus className="h-4 w-4 text-purple-600" />
        </ButtonBase>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.span
          key={quantity}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="w-8 text-center font-medium"
        >
          {quantity}
        </motion.span>
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <ButtonBase
          variant="text"
          size="small"
          onClick={onIncrease}
          className="h-8 w-8 hover:bg-purple-100 transition-colors"
        >
          <Plus className="h-4 w-4 text-purple-600" />
        </ButtonBase>
      </motion.div>
    </div>
  );
};

export default QuantityControl;

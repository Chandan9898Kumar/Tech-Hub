// components/CartTable/CartTable.tsx
import { motion, AnimatePresence } from "framer-motion";
import QuantityControl from "./QuantityControl";
import ProductImage from "./ProductImage";
import { Trash2 } from "lucide-react";
import ButtonBase from "@Components/Button/Button";
import { Products } from "../../Data/Data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

interface cartItem extends Products {
  quantity: number;
}

interface CartTableProps {
  items: cartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

type OmittedRow = Omit<CartTableProps, "items">;

interface CartTableRow extends OmittedRow {
  item: cartItem;
  index: number;
}

const CartTable = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartTableProps) => {
  return (
    <Table>
      <TableCaption>Your shopping cart items.</TableCaption>
      <TableHeader>
        <TableRow className="bg-purple-50/50">
          <TableHead className="font-semibold text-purple-900">
            Product
          </TableHead>
          <TableHead className="font-semibold text-purple-900">Name</TableHead>
          <TableHead className="font-semibold text-purple-900">Price</TableHead>
          <TableHead className="font-semibold text-purple-900">
            Quantity
          </TableHead>
          <TableHead className="font-semibold text-purple-900">
            Subtotal
          </TableHead>
          <TableHead className="font-semibold text-purple-900">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {items.map((item, index) => (
            <CartTableRow
              key={item.id}
              item={item}
              index={index}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
};

// CartTableRow component
const CartTableRow = ({
  item,
  index,
  onUpdateQuantity,
  onRemoveItem,
}: CartTableRow) => {
  return (
    <motion.tr
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1 },
      }}
      exit={{ opacity: 0, y: -20 }}
      className="group"
    >
      <TableCell>
        <ProductImage image={item.image} name={item.name} />
      </TableCell>
      <TableCell className="font-medium text-purple-900">{item.name}</TableCell>
      <TableCell className="text-purple-700">
        ${item.price.toFixed(2)}
      </TableCell>
      <TableCell>
        <QuantityControl
          quantity={item.quantity}
          onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
        />
      </TableCell>
      <TableCell className="font-semibold text-purple-900">
        <AnimatePresence mode="wait">
          <motion.span
            key={item.price * item.quantity}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-8 text-center font-medium"
          >
            ${(item.price * item.quantity).toFixed(2)}
          </motion.span>
        </AnimatePresence>
      </TableCell>
      <TableCell>
        <ButtonBase
          variant="text"
          size="small"
          className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          onClick={() => onRemoveItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </ButtonBase>
      </TableCell>
    </motion.tr>
  );
};

export default CartTable;

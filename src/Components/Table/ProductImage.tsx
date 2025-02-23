// components/ProductImage/ProductImage.tsx
import { motion } from 'framer-motion';

interface ProductImageProps {
  image: string;
  name: string;
}

 const ProductImage = ({ image, name }: ProductImageProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
        loading='lazy'
      />
    </motion.div>
  );
};


export default ProductImage
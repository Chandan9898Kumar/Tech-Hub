import React ,{memo}from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';


interface ProductProps{
    name:string
    price:number
    image:string
    description:string
}

const Product: React.FC<ProductProps> = ({ name, price, image, description }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Define fixed dimensions based on screen size
  const cardDimensions = {
    width: isMobile ? '100%' : isTablet ? '280px' : 'inherit',
    height: isMobile ? 'auto' : '450px',
  };

  const imageHeight = isMobile ? '200px' : '250px';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
      }}
    >
      <Card
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Box sx={{ height: imageHeight, width: '100%' }}>
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              transition: 'filter 0.3s ease-out, transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            loading='lazy'
          />
        </Box>
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              ${price.toFixed(2)}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              lineHeight: 1.6,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default memo(Product);

import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router';

const fetchProducts = async () => {
  const res = await axios.get('https://ddcameras.com/backend/api/products');
  return res.data.map((product) => ({
    ...product,
    image: product.image.trim(),
    numericPrice: parseFloat(product.price.replace(/[^\d.]/g, '')),
  }));
};

const Items = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('default');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const sortedProducts = useMemo(() => {
    if (sortOption === 'default') return products;
    const sorted = [...products];
    if (sortOption === 'low') return sorted.sort((a, b) => a.numericPrice - b.numericPrice);
    if (sortOption === 'high') return sorted.sort((a, b) => b.numericPrice - a.numericPrice);
    if (sortOption === 'recent') return sorted.sort((a, b) => b.id - a.id);
    return products;
  }, [sortOption, products]);

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            label="Sort By"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="low">Price Low to High</MenuItem>
            <MenuItem value="high">Price High to Low</MenuItem>
            <MenuItem value="recent">Most Recent</MenuItem>
          </Select>
        </FormControl>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {sortedProducts.map((product) => {
  const [priceOnly, duration] = product.price.split(' '); // e.g., ["₹3500.00", "60"]
  return (
    <div
    key={product.id}
    className="group relative p-4 shadow hover:shadow-md transition cursor-pointer "
    onClick={()=>navigate(`/${product.id}`)}
  >
    {/* ONE LINE BADGE */}
    <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded z-50">
      {product.one_line}
    </div>
  
    {/* IMAGE */}
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-58 object-contain mb-2 transform transition-transform duration-200 group-hover:scale-110 z-0"
    />
  
    {/* PRODUCT DETAILS */}
    <div className='z-10'>
    <h2 className="font-bold text-lg ">{product.name}</h2>
    <p className="mt-2 font-semibold ">
      {priceOnly} | {duration}
    </p>
    </div>
 
  </div>
  );
})}

        </div>
      )}
    </div>
  );
};

export default Items;

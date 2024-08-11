import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../services/apiService';
import { setProducts } from '../redux/slices/productSlice';
import ProductCard from './ProductCard';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      dispatch(setProducts(data));
    };

    loadProducts();
  }, [dispatch]);

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;

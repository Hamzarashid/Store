'use client';
import { useParams } from 'next/navigation';
import ProductDetails from '../../components/productdetail/ProductDetail';

const ProductPage = () => {
  const { id } = useParams();

  return <ProductDetails id={id} />;
};

export default ProductPage;

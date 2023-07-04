import { ProductDetail } from './components/ProductDetail';
import { notFound } from 'next/navigation';
import serverApi from '@/config/ServerApi';

export async function generateMetadata({ params }) {
  const { data: product } = await serverApi().get(`/store/products/${params?.productName}`);

  return {
    title: product.name,
  }
}

export default async function SingleProduct({ params }) {
  const { data: product } = await serverApi().get(`/store/products/${params?.productName}`);
  if (!product) return notFound();

  return (
    <>
      <ProductDetail product={product} />
    </>
  )
}

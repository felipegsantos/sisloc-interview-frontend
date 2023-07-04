import Image from 'next/image'
import { ProductGrid } from './products/components/ProductGrid';
import { TopBar } from './components/TopBar';

export const metadata = {
  title: 'Produtos em oferta - alugue já o seu!'
}

export default async function Home() {
  return (
    <>
    <TopBar />
    <ProductGrid />
    </>
  )
}

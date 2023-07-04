import { cookies } from 'next/headers';
import { CartItems } from './components/CartItems'
import { TopBar } from '../components/TopBar';

export const metadata = {
  title: 'Carrinho',
}

export default async function Cart() {
  const sessionCart = cookies().get('SESSION_CART')?.value;

  return (
    <>
      <TopBar />
      <div className="flex container mx-auto shadow-md rounded-md my-10">
        <div className="w-full bg-white px-8 py-8">
          <div className="flex justify-between border-b pb-4 mb-4">
            <h1 className="font-medium text-2xl">Meu Carrinho</h1>
            <h2 className="font-medium">3 Items</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
            <h3 className="font-semibold text-gray-600 text-xs uppercase col-span-3">Produto</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase col-span-2 text-center">Quantidade</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase col-span-2 text-center">Total</h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase col-span-1 text-center"></h3>
          </div>

          <CartItems sessionCart={sessionCart} />
        </div>
      </div>
    </>
  )
}

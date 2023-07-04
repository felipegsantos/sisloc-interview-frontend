import { cookies } from "next/headers";
import { ProductAction } from "./components/ProductAction";
import { ImageAsync } from "../../components/ImageAsync";
import currencyISO from "@/config/Currency";

export const metadata = {
  title: 'Gerenciar produtos',
}

export default async function ProductManagement() {
  const _fetched = await fetch('http://localhost:3000/api/products', {
    headers: {
      'Authorization': 'Bearer ' + cookies().get('sisloc')?.value
    }
  });

  const products = await _fetched.json();

  return (
    <>
      <header className="bg-white shadow">
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Produtos</h1>
          <a href="/panel/products/add?s=common" className="absolute top-10 right-6 font-bold text-indigo-500 text-sm">criar novo produto</a>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-100">
            {products?.map((product) => {
              const media_key = Buffer.from(product.photos[0].path_src, 'utf8').toString('hex');
              return (
                <li key={product.email} className="flex justify-between items-center gap-x-6 py-5">
                  <div className="flex items-center gap-x-4">
                    { media_key && <ImageAsync className="h-20 w-20 flex-none rounded-full overflow-hidden bg-gray-50" media_key={media_key} /> }
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                      <p className="mt-1 truncate text-xs text-gray-500">{product.sku}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm leading-6 text-gray-900">{ product.prices?.map(price => (
                      <p>{ currencyISO(price.amount) } / { price.rent_billing_mode }</p>
                    )) }</div>
                  </div>
                  <ProductAction product={product} />
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </>
  )
}

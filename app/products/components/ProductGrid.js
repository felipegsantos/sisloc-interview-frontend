import { SingleProduct } from "./SingleProduct";

export const ProductGrid = async ({ titlePage }) => {
  const _fetched = await fetch('http://localhost:3000/api/store/products');
  const products = await _fetched.json();

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{ titlePage ? titlePage : <>Ofertas disponíveis</>}</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          { products?.map((product) => <SingleProduct key={product.id} product={product} />) }
        </div>
      </div>
    </div>
  );
}
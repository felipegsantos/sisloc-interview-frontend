import { cookies } from "next/headers";
import { CommonForm } from "../../components/CommonForm";
import { OfferForm } from "../../components/OfferForm";

export const metadata = {
  title: 'Gerenciar produtos',
}

export default async function ProductManagement({ params, searchParams }) {
  const { productId } = params;
  const { s: source } = searchParams;

  const fetched = await fetch(`http://localhost:3000/api/products/${productId}`, {
    headers: {
      'Authorization': 'Bearer ' + cookies().get('sisloc')?.value
    }
  });
  if(!fetched.ok) {
    console.log(fetched);
  }
  const dataReturned = await fetched.json();

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Definições do produto</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {source === 'common' && <CommonForm productCurrent={dataReturned} />}
          {source === 'offer' && <OfferForm productCurrent={dataReturned} />}
        </div>
      </main>
    </>
  )
}

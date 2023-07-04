import { cookies } from "next/headers";
import { CompanyForm } from "./components/CompanyForm";

export const metadata = {
  title: 'Gerenciar produtos',
}

export default async function ProductManagement() {
  const _fetched = await fetch('http://localhost:3000/api/companies', {
    headers: {
      'Authorization': 'Bearer ' + cookies().get('sisloc')?.value
    }
  });
  const companies = await _fetched.json();

  return (
    <>
      <header className="bg-white shadow">
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Meus negócios</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

          { companies?.map(company => {
            return company.name
          }) }

          <CompanyForm />

        </div>
      </main>
    </>
  )
}

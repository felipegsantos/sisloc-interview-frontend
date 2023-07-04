import { CommonForm } from "../components/CommonForm";

export const metadata = {
  title: 'Gerenciar produtos',
}

export default async function ProductManagement() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Adicionar novo produto</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <CommonForm />
        </div>
      </main>
    </>
  )
}

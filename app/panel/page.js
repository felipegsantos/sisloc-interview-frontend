import { EyeIcon, TagIcon } from "@heroicons/react/24/outline"

export const metadata = {
  title: 'Inicio - Panel de gerenciamento'
}

export default function PanelManagement() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          
          <div className="flex justify-center align-center space-x-4">
            <a href="/panel/products/add?s=common" className="flex flex-col justify-center align-center w-32 h-40 text-center border rounded px-4 py-2">
              <TagIcon className="w-8 h-8 mx-auto" />
              adicionar produto
            </a>
            <a href="/panel/orders" className="flex flex-col justify-center align-center w-32 h-40 text-center border rounded px-4 py-2">
              <EyeIcon className="w-8 h-8 mx-auto" />
              ver pedidos
            </a>
          </div>

        </div>
      </main>
    </>
  )
}

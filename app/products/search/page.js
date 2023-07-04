import { SearchProductGrid } from "../components/SearchProductGrid";

export const metadata = {
    title: 'Produtos em oferta - alugue já o seu!'
}

export async function generateMetadata({ searchParams }) {
    const { s } = searchParams;

    return {
        title: s,
    }
}

export default async function Search({ searchParams }) {
    const { s } = searchParams;

    return (
        <>
            <SearchProductGrid titlePage={s ? `Busca: ${s}` : `Buscar por todos os produtos`} searchTerm={s} />
        </>
    )
}

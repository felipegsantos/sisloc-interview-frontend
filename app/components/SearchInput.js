"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

export const SearchInput = () => {
    const searchParams = useSearchParams();
    return (
        <div className="relative flex w-full mr-16 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
                <MagnifyingGlassIcon className="w-6 h-6" />
            </div>
            <form action="/products/search" className="w-full">
                <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    name="s"
                    defaultValue={searchParams.get('s')}
                    placeholder="Busque o produto que desejar aqui..." />
            </form>
        </div>
    );
}
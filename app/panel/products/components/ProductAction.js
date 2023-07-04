"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export const ProductAction = ({ product }) => {
    return (
        <div className="hidden sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-3 text-xs leading-5 text-gray-500">
                <a href={`/panel/products/${product?.id}/edit?s=common`}><PencilIcon className="w-4 h-4" /></a>
                <button><TrashIcon className="w-4 h-4" /></button>
            </div>
        </div>
    )
}
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ImageAsync } from "@/app/components/ImageAsync";
import currencyISO from "@/config/Currency";

export const SingleProduct = ({ product }) => {
    const media_key = Buffer.from(product.photos[0].path_src, 'utf8').toString('hex');

    const rentModeTranslate = {
        daily: 'Dia',
        weekly: 'Semana',
        monthly: 'Mês'
    }

    return (
        <div className="bg-white col-span-auto group relative border rounded-md transition duration-150 ease-in-out hover:scale-105 hover:shadow-lg">
            <Link href={`/products/${product.slug}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:shadow-lg group-hover:opacity-75 transition duration-300 ease-in-out group-hover:scale-105 lg:h-80">
                { media_key && <ImageAsync className="h-full w-full object-cover object-center lg:h-full lg:w-full" media_key={media_key} /> }
                </div>
                <div className="mt-4 flex flex-col justify-between">
                    <div>
                        <h3 className="px-4 w-full font-bold text-gray-700">
                            {product.name}
                        </h3>
                    </div>
                    <p className="px-4 w-full font-medium text-gray-900">
                        <span className="text-sm text-gray-400 block">a partir de</span>
                        <span className="font-bold text-xl">{ currencyISO(product.prices[0].amount) }</span> <sub className="relative -top-1">/ { rentModeTranslate[product.prices[0].rent_billing_mode] }</sub>
                    </p>
                </div>
                <div className="my-2 flex space-x-2 justify-center">
                    <div className="flex space-x-2 items-center rounded-md px-4 py-2 text-xs font-bold text-indigo-500">
                        <EyeIcon className="w-5 h-5 mr-1" />
                        ver detalhes
                    </div>
                </div>
            </Link>
        </div>
    );
}
"use client";

import { ImageAsync } from "@/app/components/ImageAsync";
import currencyISO from "@/config/Currency";
import clientApi, { fetcher } from "@/config/clients/ClientApi";
import { removeItemCart } from "@/config/features/CartSlice";
import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useSWR from "swr";

export const CartItems = ({ sessionCart }) => {
    const dispatch = useDispatch();
    const { data, isLoading, mutate } = useSWR(sessionCart && '/carts', (url) => fetcher({
        url,
        headers: {
            'X-Session-Cart': sessionCart
        }
    }));

    const items = [].concat(data?.items || []);

    const { register, control, setValue, watch } = useForm({
        values: data,
    });

    const { fields } = useFieldArray({ name: 'items', control, rules: { required: true } });

    const getOnlyPrices = productId => items.filter(item => {
        return productId ? item.product.id === productId : true;
    }).map(item => {
        return Number(item.product.price_selected.amount) * item.quantity;
    });

    const handleIncreaseQuantity = async (item) => {
        try {
            await clientApi().post('/carts/increase', item, {
                headers: {
                    'X-Session-Cart': sessionCart
                }
            });
            mutate();
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveItemCart = async (item) => {
        try {
            await clientApi().delete('/carts/remove', {
                headers: {
                    'X-Session-Cart': sessionCart
                },
                data: item
            });
            mutate();
            dispatch(removeItemCart({ ...item, sessionId: sessionCart }));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {items.length > 0 ? fields.map((item, key) => {
                const media_key = Buffer.from(item.product.photo, 'utf8').toString('hex');

                return (
                    <div key={item.id} className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 py-4 px-4 items-center rounded-md hover:bg-gray-100">
                        <div className="flex col-span-3">
                            <div className="w-20">
                                {media_key && <ImageAsync className="h-full w-full object-cover object-center" media_key={media_key} />}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm">{item.product.name}</span>
                                <span className="font-semibold text-gray-500 text-xs">SKU {item.product.sku}</span>
                                <span className="font-semibold text-gray-500 text-xs">{currencyISO(item.product.price_selected.amount)}</span>
                            </div>
                        </div>

                        <div className="flex justify-center items-center col-span-2">
                            <button onClick={() => watch(`items.${key}.quantity`) > 1 && handleIncreaseQuantity({ ...item, quantity: watch(`items.${key}.quantity`) - 1 })}>
                                <MinusIcon className="w-5 h-5" />
                            </button>
                            <input {...register(`items.${key}.quantity`, { valueAsNumber: true, min: 1 })} defaultValue={1} readOnly className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mx-2 border text-center w-8 rounded-md" />
                            <button onClick={() => handleIncreaseQuantity({ ...item, quantity: watch(`items.${key}.quantity`) + 1 })}>
                                <PlusIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <span className="text-center col-span-2 my-auto font-semibold text-sm">
                            {currencyISO(
                                item.product.price_selected.amount * watch(`items.${key}.quantity`, 1)
                            )}
                        </span>
                        <button onClick={() => handleRemoveItemCart(item)} className="col-span-1 font-semibold hover:text-red-500 text-gray-500 text-xs">
                            <TrashIcon className="w-5 h-5 ml-auto" />
                        </button>
                    </div>
                );
            }) : <div className="text-md text-center py-4">
                Seu carrinho esta vazio!
                <Link href="/" className="flex font-semibold text-indigo-600 text-sm mt-5 justify-center">
                    ir para lista de produtos
                    <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
            </div>}

            {items.length > 0 &&
                <div className="mt-2 flex justify-between">
                    <Link href="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                        <ArrowLeftIcon className="mr-2 w-5 h-5" />
                        continuar comprando
                    </Link>
                    <button className="bg-green-500 font-semibold hover:bg-green-600 py-3 px-6 text-sm rounded-md text-white"><span className="pr-2">Pagar</span>
                        {currencyISO(
                            _.sum(getOnlyPrices(false))
                        )}
                    </button>
                </div>
            }
        </>
    )
}
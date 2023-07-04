"use client";

import currencyISO from '@/config/Currency';
import { RadioGroup } from '@headlessui/react';
import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/solid';
import { addItemCart } from '@/config/features/CartSlice';
import { ImageAsync } from '@/app/components/ImageAsync';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const ProductDetail = ({ product }) => {
    const dispatch = useDispatch();
    const { control, handleSubmit, watch, formState: { isSubmitting, isSubmitted, errors } } = useForm();

    const rentModeTranslate = {
        daily: 'Dia',
        weekly: 'Semana',
        monthly: 'Mês'
    }

    const breadcrumbs = [{
        name: 'Produtos',
        href: '/'
    }, {
        name: product.name,
        href: `/products/${product.slug}`
    }];

    const addCart = async (values) => {

        try {
            let item = {
                product_id: product?.id,
                price_id: values?.price_selected,
                quantity: 1
            }
            const { data } = await axios.post('/api/cart/session', item);
            item = data?.items?.find(itm => itm.product_id === item.product_id);
            dispatch(addItemCart({ ...item, sessionId: data.session_cart_id }));
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <div>
            <nav className="bg-white py-3" aria-label="Breadcrumb">
                <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    {breadcrumbs.map((breadcrumb, key) => (
                        <li key={key}>
                            <div className="flex items-center">
                                <Link href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                    {breadcrumb.name}
                                </Link>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                    ))}
                    <li className="text-sm">
                        <Link href={`/products/${product.slug}`} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                            {product.name}
                        </Link>
                    </li>
                </ol>
            </nav>

            <div className="mx-auto mt-6 max-w-7xl grid grid-cols-4 gap-2">
                {product.photos?.map((photo, key) => {
                    const media_key = Buffer.from(photo.path_src, 'utf8').toString('hex');
                    return (
                        <div key={key} className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                           {media_key && <ImageAsync className="h-full w-full object-cover object-center" media_key={media_key} />}
                        </div>
                    )
                })}
            </div>

            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                </div>

                <div className="mt-4 lg:row-span-3 lg:mt-0">
                    {Array.isArray(product.prices) && product.prices.length > 0 &&
                        <>
                            <p className="text-gray-500">a partir de</p>
                            <p className="text-3xl tracking-tight text-gray-900">{currencyISO(product.prices[0].amount)} <small> / {rentModeTranslate[product.prices[0].rent_billing_mode]}</small></p>
                        </>
                    }

                    {/* Reviews */}
                    <div className="mt-6">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((_, key) => (
                                    <StarIcon
                                        key={key}
                                        className="text-yellow-500 h-5 w-5 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-400 px-2">5/5 avaliações</p>
                        </div>
                    </div>

                    <form className="mt-10" onSubmit={handleSubmit(addCart)}>
                        <div>
                            <Controller
                                rules={{ required: true }}
                                control={control}
                                defaultValue=""
                                name="price_selected"
                                render={({ field }) => <RadioGroup {...field} className="mt-4">
                                    <div className="flex items-center space-x-3">
                                        {Array.isArray(product.prices) && product.prices.map((price, key) => (
                                            <RadioGroup.Option
                                                key={key}
                                                value={price.id}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        active && checked ? 'border-indigo-500 text-indigo-500' : '',
                                                        !active && checked ? 'border-indigo-500 text-indigo-500' : '',
                                                        'relative -m-0.5 flex text-gray-500 font-medium border border-2 cursor-pointer rounded-md items-center justify-center p-3'
                                                    )
                                                }
                                            >
                                                <RadioGroup.Label as="span">
                                                    {currencyISO(price.amount)} / {rentModeTranslate[price.rent_billing_mode]?.toLowerCase()}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>}
                            />
                            {errors?.price_selected && <span className="text-red-500">É preciso selecionar um preço para prosseguir com a compra</span>}
                        </div>

                        <button
                            type="submit"
                            className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent ${isSubmitted ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}  px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out`}
                            disabled={!watch('price_selected') || isSubmitting || isSubmitted}
                        >
                            {isSubmitting &&
                                <div className="mr-2 animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white-600/50 rounded-full" role="status" aria-label="loading">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }
                            { isSubmitted ? <>Adicionado ao carrinho <CheckBadgeIcon className="ml-2 w-6 h-6" /></> : 'Adicionar ao carrinho' }
                        </button>
                    </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    <div>
                        <h3 className="sr-only">Descrição</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{product.description}</p>
                        </div>
                    </div>

                    <div className="mt-10 border border-bottom border-left border-right rounded-md">
                        <h2 className="font-medium bg-gray-200 rounded-md p-2 text-gray-600">Dimensões</h2>

                        <div className="space-y-4 p-2 text-md text-gray-600">
                            <p><span className="font-bold">Altura</span> {product.height} cm</p>
                            <p><span className="font-bold">Largura</span> {product.width} cm</p>
                            <p><span className="font-bold">Comprimento</span> {product.length} cm</p>
                            <p><span className="font-bold">Peso</span> {product.weight} kg</p>
                        </div>
                    </div>

                    {Array.isArray(product.extra_informations) && product.extra_informations.length > 0 &&
                        <div className="mt-10 border border-bottom border-left border-right rounded-md">
                            <h2 className="font-medium bg-gray-200 rounded-md p-2 text-gray-600">Informações técnicas</h2>

                            <div className="space-y-4 p-2 text-md text-gray-600">
                                {product.extra_informations.map((extraInfo, key) => (
                                    <p key={key}><span className="font-bold">{extraInfo.key}</span> {extraInfo.value}</p>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
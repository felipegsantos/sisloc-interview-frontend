"use client";

import useSWR from "swr";
import clientApi, { fetcher } from "@/config/clients/ClientApi";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export const CommonForm = ({ productCurrent }) => {
    const { data: _companies, error: errorCompany } = useSWR('companies', fetcher);
    const { register, handleSubmit, control, formState: { errors }, } = useForm({
        defaultValues: productCurrent,
    });

    const router = useRouter()

    const onSubmit = async (values) => {
        try {
            let __product;
            if (!productCurrent) {
                const { data } = await clientApi().post('products', values);
                __product = data;
            } else {
                const { data } = await clientApi().patch(`products/${productCurrent?.id}`, values);
                __product = data;
            }
            router.push(`/panel/products/${__product.id}/edit?s=offer`);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                        <div className="sm:col-span-4">
                            <label htmlFor="user_company_id" className="block text-sm font-medium leading-6 text-gray-900">
                                Empresa
                            </label>
                            <div className="mt-2">
                                <Controller
                                    render={({ field }) => (
                                        <select { ...field } className="block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option>Selecione seu negócio</option>
                                            {!errorCompany && _companies?.map(company => {
                                                return <option key={company.id} value={company.user_company.id}>{company.name}</option>;
                                            })}
                                        </select>
                                    )}
                                    control={control}
                                    name="user_company_id"
                                    autoComplete="user_company_id"
                                    defaultValue={productCurrent?.user_company_id}
                                />
                                <small className="text-red-500">{errors?.user_company_id && <>Campo obrigatório</>}</small>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900">
                                SKU
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="sku"
                                    {...register('sku', { required: true })}
                                    autoComplete="sku"
                                    readOnly={!!productCurrent}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 read-only:bg-gray-200"
                                />
                                <small className="text-red-500">{errors?.sku && <>Campo obrigatório</>}</small>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Titulo
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', { required: true })}
                                    autoComplete="name"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <small className="text-red-500">{errors?.name && <>Campo obrigatório</>}</small>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Descrição
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    rows={3}
                                    {...register('description')}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1 sm:col-start-1">
                            <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                peso (kg)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="weight"
                                    {...register('weight', { required: true })}
                                    autoComplete="weight"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <small className="text-red-500">{errors?.weight && <>Campo obrigatório</>}</small>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="width" className="block text-sm font-medium leading-6 text-gray-900">
                                largura (cm)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="width"
                                    {...register('width', { required: true })}
                                    autoComplete="width"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <small className="text-red-500">{errors?.width && <>Campo obrigatório</>}</small>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
                                altura (cm)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="height"
                                    {...register('height', { required: true })}
                                    autoComplete="height"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <small className="text-red-500">{errors?.height && <>Campo obrigatório</>}</small>
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="length" className="block text-sm font-medium leading-6 text-gray-900">
                                comprimento (cm)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="length"
                                    {...register('length', { required: true })}
                                    autoComplete="length"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <small className="text-red-500">{errors?.length && <>Campo obrigatório</>}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <a href="/panel/products" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancelar
                </a>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Salvar e continuar
                </button>
            </div>
        </form>
    );
}
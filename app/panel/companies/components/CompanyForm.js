"use client";

import { useTransition } from "react";
import submitCompanyAction from "./SubmitCompanyAction";
import { useForm } from "react-hook-form";

export const CompanyForm = () => {
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit((values) => startTransition(() => submitCompanyAction(values)))}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', { required: true })}
                                    autoComplete="name"
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <small className="text-red-500">{errors?.name && errors?.name.message}</small>
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
    )
}
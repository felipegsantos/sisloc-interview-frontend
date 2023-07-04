"use client";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useFieldArray } from "react-hook-form";

export const PriceForm = ({ form }) => {
    const { register, control, formState: { errors } } = form;
    const { fields, append, remove } = useFieldArray({ name: 'prices', control, rules: { required: true } });

    return (
        <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                preços
            </label>
            <small className="text-red-500">{errors.prices && <>É necessário preencher os valores de oferta</>}</small>
            <div className="mt-2">
                <button type="button" className="py-3 text-sm text-indigo-500 font-bold" onClick={() => append({ amount: '', rent_billing_mode: '' })}>
                    <PlusIcon className="w-6 h-6" />
                </button>
                {fields.map((price, key) => {
                    return (
                        <Fragment key={key}>
                            <div className="mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor={`amount${key}`} className="block text-sm font-medium leading-6 text-gray-900">
                                        Valor (R$)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id={`amount${key}`}
                                            {...register(`prices.${key}.amount`, { required: true })}
                                            autoComplete={`amount${key}`}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        { errors?.prices &&
                                            <small className="text-red-500">{errors?.prices[key].amount && <>É necessário preencher este campo</>}</small>
                                        }
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor={`rent_billing_mode${key}`} className="block text-sm font-medium leading-6 text-gray-900">
                                        Modo de oferta
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id={`rent_billing_mode${key}`}
                                            {...register(`prices.${key}.rent_billing_mode`, { required: true })}
                                            autoComplete={`rent_billing_mode${key}`}
                                            className="block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value="daily">Diário</option>
                                            <option value="weekly">Semanal</option>
                                            <option value="monthly">Mensal</option>
                                        </select>
                                        { errors?.prices &&
                                            <small className="text-red-500 leading-0">{errors?.prices[key].rent_billing_mode && <>É necessário selecionar frequencia de pagamento</>}</small>
                                        }
                                    </div>
                                </div>

                                <div className="sm:col-1">
                                    {key > 0 &&
                                        <button type="button" className="mt-8 text-sm text-red-500 font-bold" onClick={() => remove(key - 1)}>
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    }
                                </div>
                            </div>
                        </Fragment>
                    );
                })}

            </div>
        </div>
    );
}
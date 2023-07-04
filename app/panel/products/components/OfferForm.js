"use client";

import { useRouter } from "next/navigation";
import { PriceForm } from "./PriceForm";
import clientApi from "@/config/clients/ClientApi";
import { Controller, useForm } from "react-hook-form";
import { SubmitPhotoForm } from "./SubmitPhotoForm";

export const OfferForm = ({ productCurrent }) => {
  const form = useForm({
    defaultValues: productCurrent
  });
  const { handleSubmit, control, formState: { errors } } = form;
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await clientApi().patch(`/products/${productCurrent.id}`, data);
      router.push(`/panel/products`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-4">
              <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                tipo de oferta
              </label>
              <div className="mt-2">
                <Controller
                  render={({ field }) => (
                    <select {...field} className="block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option>Selecione seu negócio</option>
                      <option value="rents">Locação</option>
                      <option value="sales">Venda</option>
                    </select>
                  )}
                  control={control}
                  name="type"
                  autoComplete="type"
                  defaultValue={productCurrent?.type}
                />
              </div>
            </div>

            <PriceForm form={form} />
            <SubmitPhotoForm form={form} product={productCurrent} />

          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Finalizar
        </button>
      </div>
    </form>
  );
}
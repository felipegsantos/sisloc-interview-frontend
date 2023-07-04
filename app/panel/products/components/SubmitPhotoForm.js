"use client";

import { useEffect, useRef, useState } from "react";
import clientApi, { fetcher } from "@/config/clients/ClientApi";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import useSWR from "swr";
import { ImageAsync } from "../../../components/ImageAsync";

export const SubmitPhotoForm = ({ form, product }) => {
    const { data: photos, mutate } = useSWR('/products/medias/' + product.id, fetcher);

    const { register } = form;

    const onSubmitFile = async (ev) => {
        const { target: { files } } = ev;
        ev.preventDefault();

        const formData = new FormData();
        formData.append('photo', files?.item(0));
        formData.append('id', product.id);

        try {
            await clientApi().post('/products/upload', formData);
            mutate();
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="col-span-full">
            <label htmlFor="gallery-photos" className="block text-sm font-medium leading-6 text-gray-900">
                Fotos do produto
            </label>
            <label htmlFor="photos" className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Escolher imagem</span>
                            <input id="photos" {...register('photos')} onChange={(e) => onSubmitFile(e)} type="file" multiple className="sr-only" />
                        </div>
                        <p className="pl-1">ou arraste e solte aqui!</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
            </label>
            <div className="grid grid-cols-6 gap-4 py-4">
                {photos?.map((photo, key) => {
                    const media_key = Buffer.from(photo.path_src, 'utf8').toString('hex');
                    return <div key={key} className="rounded-md border-2 border-indigo-400 overflow-hidden">
                        <ImageAsync media_key={media_key} />
                    </div>
                })}
            </div>
        </div>
    )
}
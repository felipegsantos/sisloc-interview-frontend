"use client";

import Image from "next/image";
import clientApi from "@/config/clients/ClientApi";
import { useEffect, useRef, useState } from "react";

export const ImageAsync = ({ media_key, className }) => {
    const [imageUrlData, setImageUrlData] = useState(null);
    const imageAsyncRef = useRef(null);

    const previewImage = (img, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => callback(reader.result);
        reader.onerror = (e) => alert(JSON.stringify(e));
    };

    const getImageData = async (media_key) => {
        const { data } = await clientApi().get('http://localhost:3000/api/products/medias/view/' + media_key, {
            responseType: 'blob'
        });
        previewImage(data, (url) => {
            setImageUrlData(url);
        });
    }

    useEffect(() => {
        getImageData(media_key);
    }, [])

    return imageUrlData && <Image alt="produtos" ref={imageAsyncRef} className={className + ' object-cover object-center'} width={500} height={500} loading="eager" src={imageUrlData} />
}
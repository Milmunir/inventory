"use client"
import Image from "next/image";
import { useState } from "react";


export default function Img(formid) {
    const [image, setImage] = useState(null);
    const [b64, setb64] = useState('null');
    const [preview, setPreview] = useState('/img/shop.png');

    const handleImageChange = (event) => {
        const reader = new FileReader()
        const file = event.target.files[0];
        setImage(file);
        reader.onloadend = () => {
            const data = JSON.parse(JSON.stringify(reader.result))
            setb64(reader.result)
        };
        reader.readAsDataURL(file)
        // Create a URL for the selected image to preview it
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);        
    };
    return (
        <>
            {preview && (
                <div className="relative flex w-full h-1/2">
                    <Image
                        className="object-contain"
                        src={preview}
                        alt="item image"
                        fill={true}
                    />
                </div>
            )}
            <input
                className="mt-4"
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required={true}
            />
            <input form={formid.formid} type="text" name="base64img" hidden={true} required={true} defaultValue={b64} />
        </>
    )
}
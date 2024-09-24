"use client"
import Image from "next/image";
import { useState } from "react";

export default function Img(data) {
    const [image, setImage] = useState(null);
    const [b64, setb64] = useState('null');
    const [preview, setPreview] = useState(data.imagebefore);

    const handleImageChange = (event) => {
        const reader = new FileReader()
        const file = event.target.files[0];
        setImage(file);
        reader.onloadend = () => {
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
                <div className="relative flex w-full aspect-square">
                    <Image
                        className="object-contain"
                        src={decodeURIComponent(preview)}
                        alt="item image"
                        fill={true}
                        priority
                    />
                </div>
            )}
            <input
                className="mt-4"
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
            />
            <input form={data.formId} type="text" name="base64img" hidden={true} defaultValue={b64} />
        </>
    )
}
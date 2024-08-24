"use client"
import Image from "next/image";
import { useState } from "react";

export default function Img(formid) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('/img/shop.png');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

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
                form={formid.formid}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
            />
        </>
    )
}
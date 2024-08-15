"use client"
import Image from "next/image";
import { useState } from "react";

export default function Img(formid) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

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
                <div style={{ marginTop: '20px' }}>
                    <Image
                        src={preview}
                        alt="Image Preview"
                        width={300}
                        height={300}
                    />
                </div>
            )}
            <input
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
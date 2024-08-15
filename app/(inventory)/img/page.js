import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export default function Img() {
    async function posting(req, res){
        "use server"
        const file = req.get("file");
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}_${uuidv4()}${path.extname(file.name)}`;
        console.log(filename);
        try {
            await writeFile(
                path.join(process.cwd(), "public/uploads/" + filename),
                buffer
            );
            try {
                const saveimg = await prisma.img_test.create({
                    data:{
                        path: filename
                    }
                })
                console.log(saveimg);
                
            } catch (error) {
                console.log(error);
                
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <form action={posting}>
                <input type="file" name="file" id="file"/>
                <button type="submit">Upload</button>
            </form>
        </>
    )
};
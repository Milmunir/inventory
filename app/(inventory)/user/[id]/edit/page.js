import { PrismaClient } from "@prisma/client"
import Image from "next/image"
import { notFound, permanentRedirect, redirect } from "next/navigation"
import Img from "./img"
import path from "path"
import { unlink, writeFile } from "fs/promises";
import { getactiveuser, updateActiveUserCookie, updatesessioncookie } from "@/app/lib/session"
import { customModel } from "@/app/lib/prisma/customodel"

const prisma = new PrismaClient

export default async function UserEdit({ params }) {
    const id = parseInt(params.id)
    const data = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            imgprofile: true
        }
    })
    if (data == null) {
        notFound()
    }
    async function edituser(formdata) {
        "use server"
        const file = formdata.get("image");
        let filename
        if (file.size === 0) {
            console.log('no image');
            filename = data.imgprofile
        }
        else {
            console.log('has image');
            filename = `${Date.now()}${id}${path.extname(file.name)}`;
            if (!file) {
                return NextResponse.json({ error: "No files received." }, { status: 400 });
            }
            const buffer = Buffer.from(await file.arrayBuffer());
            try {
                await unlink("public/img/user/" + data.imgprofile, (err) => {
                    if (err) throw err;
                    console.log('deleted');
                });
                await writeFile(
                    path.join(process.cwd(), "public/img/user/" + filename),
                    buffer
                );
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const uid = await getactiveuser();
            const create = await customModel.user.upUser({
                uid: uid.id,
                id: data.id,
                name: formdata.get('name'),
                imgprofile: filename,
                before: data
            })
            if (uid.id === create.id) {
                updateActiveUserCookie({
                    id: create.id,
                    name: create.name,
                    imgprofile: create.imgprofile,
                    expat: uid.expat
                })
            }
        } catch (error) {
            console.log(error);
        }
        permanentRedirect(`/user/${id}`)
    }
    return (
        <>
            <title>{data.name}</title>
            <div className="">
                <div className="flex w-full">
                    <div>
                        {data.name} DETAIL
                    </div>
                </div>
                <div className="grid grid-cols-[25%_1fr] gap-4 w-full mt-4">
                    <div className="">
                        <Img imagebefore={data.imgprofile == null ? '/img/noimage.jpg' : `/img/user/${data.imgprofile}`} formId={"user-form"} />
                    </div>
                    <div className="break-words grid grid-rows-[min-content_1fr]">
                        <form id="user-form" action={edituser}>
                            <div className="m-2 ml-0">
                                <p className="uppercase font-bold text-xs">Employee ID</p>
                                <p className="font-semibold text-xl">{data.id}</p>
                            </div>
                            <div className="m-0">
                                <label htmlFor="name">Name</label>
                                <input id="name" name="name" type="text" placeholder="name" className="px-3 py-3 placeholder-gray-600 text-blueGray-600 text-gray-800 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full my-2" defaultValue={data.name} />
                            </div>
                        </form>
                        <button className="place-self-end w-48 h-min bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-base px-4 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="submit" form="user-form">UPDATE USER</button>
                    </div>
                </div>
            </div>
        </>
    )
}
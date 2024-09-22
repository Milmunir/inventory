"use client"

import Image from "next/image";
import { useState } from "react";
import { logout } from "@/app/auth/user";
import { usePopper } from "react-popper";

export default function Navbar({ data }) {
    const [open, setOpen] = useState(false);
    const [imgurl, setimgurl] = useState(data.imgprofile === null ? '/img/noimage.jpg' : `/img/user/${data.imgprofile}`);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: 'bottom-end', strategy: 'absolute' });
    return (
        <>
            <nav className="relative top-0 left-0 w-full z-10 bg-pink-600 dark:bg-slate-800 md:flex-row md:flex-nowrap md:justify-start md:flex items-center md:py-4 p-0 hidden">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    <a className="text-white text-sm uppercase inline-block font-semibold" href="/dashboard">Dashboard</a>
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <a className="text-blueGray-500 block" onClick={() => setOpen(!open)} ref={setReferenceElement}>
                            <div className="items-center flex">
                                <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                    <Image
                                        alt="profile picture"
                                        className="w-full rounded-full align-middle border-none shadow-lg"
                                        src={imgurl}
                                        height={300}
                                        width={300}
                                        onError={()=>setimgurl('/img/noimage.jpg')}
                                    />
                                </span>
                            </div>
                        </a>
                        {open && (
                            <div className="flex flex-wrap" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                                <div className="w-40">
                                    <div className="align-middle">
                                        <div className={`py-2box-border bg-white text-base text-left rounded shadow-lg overflow-hidden`}>
                                            <p className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">{data.name}</p>
                                            <hr />
                                            <form action={logout}>
                                                <button className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-left text-gray-600" type="submit">Log Out</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}
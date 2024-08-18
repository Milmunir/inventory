"use client"

import Image from "next/image";
import { useFloating } from "@floating-ui/react"
import { useState } from "react";
import { logout } from "@/app/auth/user";

export default function Navbar({ data }) {
    const [open, setOpen] = useState(false);
    const {refs, floatingStyles} = useFloating({
        placement:'bottom-end',
        strategy:'absolute'
    });
    return (
        <>
            <nav className="relative top-0 left-0 w-full z-10 bg-pink-600 dark:bg-slate-800 md:flex-row md:flex-nowrap md:justify-start md:flex items-center px-4 md:py-4 py-0 hidden">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    <a className="text-white text-sm uppercase inline-block font-semibold" href="/dashboard">Dashboard</a>
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <a className="text-blueGray-500 block" ref={refs.setReference} onClick={()=>setOpen(!open)}>
                            <div className="items-center flex">
                                <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                    <Image
                                        alt="profile picture"
                                        className="w-full rounded-full align-middle border-none shadow-lg"
                                        src={data.picture}
                                        height={300}
                                        width={300}
                                    />
                                </span>
                            </div>
                        </a>
                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-6/12 md:w-4/12 px-4">
                                <div className="align-middle w-full">
                                    <div style={floatingStyles} className={`${open ? 'py-2' : 'max-h-0 p-0'} box-border bg-white text-base text-left rounded shadow-lg overflow-hidden`} ref={refs.setFloating}>
                                        <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">Action</a>
                                        <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">Action</a>
                                        <a href="/auth" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">Action</a>
                                        <hr />
                                        <form action={logout}>
                                            <button className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-gray-600" type="submit">Log Out</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    )
}
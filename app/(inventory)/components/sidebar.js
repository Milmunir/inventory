"use client"
import Image from "next/image";
import { useState } from "react";
import { usePopper } from "react-popper";

export default function Sidebar({ profile }) {
    const [imgurl, setimgurl] = useState(`/img/user/${profile.imgprofile}`);
    const [isopened, setisopened] = useState(false);
    function openmenu(param) {
        setisopened(param)
    }
    const [open, setOpen] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: 'bottom-end', strategy: 'absolute' });
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto" >
                    <button className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" type="button" onClick={() => openmenu(true)}>
                        <i className="text-center fas fa-bars text-gray-900 dark:text-gray-100"></i></button>
                    <a className="md:block text-left md:pb-2 text-gray-900 dark:text-gray-100 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" href="#">
                        Inventory app
                    </a>
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            <a className="text-blueGray-500 block" ref={setReferenceElement} onClick={()=>setOpen(!open)}>
                                <div className="items-center flex">
                                    <span className="w-12 h-12 text-sm text-gray-900 dark:text-gray-100 bg-blueGray-200 inline-flex items-center justify-center rounded-full">
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
                                <div className={`py-2 absolute box-border bg-gray-100 text-base text-left rounded shadow-lg overflow-hidden`} style={styles.popper} id="user-responsive-dropdown" ref={setPopperElement} {...attributes.popper}>
                                    <p className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">{profile.name}</p>
                                    <hr />
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">Another action</a >
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">Something else here</a>
                                    <hr />
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">Seprated link</a>
                                </div>
                            )}
                        </li>
                    </ul>
                    <div className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-2 left-4 md:left-0 right-4 z-40 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 md:p-0 overflow-x-hidden h-auto items-center flex-1 rounded ${isopened ? '' : 'hidden'}`} id="example-collapse-sidebar">
                        <div className="md:min-w-full md:hidden block pb-4 border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" href="">Inventory app</a>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button type="button" className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" onClick={() => openmenu(false)}>
                                        <i className="text-center fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <li className="items-center">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="/dashboard">
                                    <i className="text-center fas fa-tv opacity-75 mr-2 text-sm w-6"></i>
                                    Dashboard
                                </a>
                            </li>
                            <li className="items-center">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="/item">
                                    <i className="text-center fas fa-warehouse mr-2 text-sm w-6"></i>
                                    Item List
                                </a>
                            </li>
                            <li className="items-center">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="/category">
                                    <i className="text-center fas fa-list mr-2 text-sm w-6"></i>
                                    Category List
                                </a>
                            </li>
                            <li className="items-center">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="/user">
                                    <i className="text-center fas fa-user-circle text-blueGray-300 mr-2 text-sm w-6"></i>
                                    User List
                                </a>
                            </li>
                            <li className="items-center">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="/report">
                                    <i className="text-center fas fa-bars text-blueGray-300 mr-2 text-sm w-6"></i>
                                    Logs
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
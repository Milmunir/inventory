import Image from "next/image";

export default function Loading() {
    return (
        <>
            <div className="">
                <div className="grid grid-cols-2 grid-rows-[min-content min-content] gap-4 w-full">
                    <div className="lg:row-span-2 row-span-1 col-span-1">
                        <div className="relative flex w-full h-full">
                            <Image
                                className="object-contain"
                                src={`/img/shop.png`}
                                alt="item image"
                                fill={true}
                            />
                        </div>
                    </div>
                    <div className="lg:row-span-1 col-span-1 break-words">
                        <div className="m-2 ml-0 mt-0">
                            <p className="uppercase font-bold text-xs">Name</p>
                            <div className="flex gap-2">
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                            </div>
                        </div>
                        <div className="m-2 ml-0">
                            <p className="uppercase font-bold text-xs">Description</p>
                            <div className="flex gap-2">
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                            </div>
                        </div>
                        <div className="m-2 ml-0">
                            <p className="uppercase font-bold text-xs">Quantity</p>
                            <div className="flex gap-2">
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                                <div className="w-5 h-5 rounded-full animate-pulse bg-gray-400"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:row-span-1 col-span-2 lg:col-span-1">
                        <div className="w-full text-gray-800">
                            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-0 shadow-lg">
                                <div className="flex-auto p-4">
                                    <div className="font-semibold">
                                        SET QUANTITY
                                    </div>
                                    <div>
                                        <input name="amount" id="amount" type="number" className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        <button className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150">Set Quantity</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-gray-800">
                            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-0 shadow-lg">
                                <div className="flex-auto p-4">
                                    <div className="font-semibold">
                                        CHANGE QUANTITY
                                    </div>
                                    <div>
                                        <input name="amount" id="amount" type="number" className="mt-2 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150"><i className="fas fa-plus" /></button>
                                            <button className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-4 ease-linear transition-all duration-150"><i className="fas fa-minus" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
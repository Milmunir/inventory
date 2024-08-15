import { useFloating } from "@floating-ui/react"
import { useState } from "react";


export default function Dropdown() {
    const [open, setOpen] = useState(false);
    const {refs, floatingStyles} = useFloating({
        placement:'bottom-start',
        strategy:'absolute'
    });
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-6/12 md:w-4/12 px-4">
                    <div className="align-middle w-full">
                        <button className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 border-2 border-white" type="button" ref={refs.setReference} onClick={()=>setOpen(!open)}>
                            dropdown
                        </button>
                        <div style={floatingStyles} className={`${open? 'py-2' : 'max-h-0 p-0'} box-border bg-white text-base text-left rounded shadow-lg overflow-hidden`} ref={refs.setFloating}>
                            <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">
                                Action
                            </a>
                            <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">
                                Action
                            </a>
                            <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-600">
                                Action
                            </a>
                            <hr/>
                            <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-gray-600">
                                Seprated link
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
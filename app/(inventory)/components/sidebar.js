import Image from "next/image";

export default function Sidebar({profile}) {    
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white dark:bg-gray-800 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto" >
                    <button className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" type="button">
                        <i className="text-center fas fa-bars text-gray-900 dark:text-gray-100"></i></button>
                    <a className="md:block text-left md:pb-2 text-gray-900 dark:text-gray-100 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" href="#">
                        Tailwind Starter Kit
                    </a>
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            <a className="text-blueGray-500 block py-1 px-3" href="#pablo">
                                <i className="text-center fas fa-bell text-gray-900 dark:text-gray-100"></i>
                            </a>
                            <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1" style={{ minWidth: 12 + 'rem' }} id="notification-dropdown">
                                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-900 dark:text-gray-100">Action 1</a>
                                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-900 dark:text-gray-100">Action 2</a>
                                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-900 dark:text-gray-100">Action 3</a>
                                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-900 dark:text-gray-100">Action 4</a>
                                <div className="h-0 my-2 border border-solid border-blueGray-100"></div>
                                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-900 dark:text-gray-100">Seprated link</a>
                            </div>
                        </li>
                        <li className="inline-block relative">
                            <a className="text-blueGray-500 block" href="#pablo">
                                <div className="items-center flex">
                                    <span className="w-12 h-12 text-sm text-gray-900 dark:text-gray-100 bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                    <Image 
                                        alt="profile picture"
                                        className="w-full rounded-full align-middle border-none shadow-lg"
                                        src={profile.picture}
                                        height={300}
                                        width={300}
                                    />
                                    </span>
                                </div>
                            </a>
                            <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1" style={{ minWidth: 12 + 'rem' }} id="user-responsive-dropdown">
                                {profile.name}
                                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-900 dark:text-gray-100">Another action</a >
                                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-900 dark:text-gray-100">Something else here</a>
                                <div className="h-0 my-2 border border-solid border-blueGray-100"></div>
                                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-900 dark:text-gray-100">Seprated link</a>
                            </div>
                        </li>
                    </ul>
                    <div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden" id="example-collapse-sidebar">
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" href="">Tailwind Starter Kit</a>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button type="button" className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent">
                                        <i className="text-center fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input type="text" placeholder="Search" className="border-0 px-3 py-2 h-12 border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal" />
                            </div>
                        </form>
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
                                <a className="text-gray-900 dark:text-gray-100 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="#/dashboard">
                                    <i className="text-center fas fa-clipboard mr-2 text-sm w-6"></i>
                                    Report
                                </a>
                            </li>
                            <li className="items-center">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="#/dashboard">
                                    <i className="text-center fas fa-user-circle text-blueGray-300 mr-2 text-sm w-6"></i>
                                    User List
                                </a>
                            </li>
                            <li className="items-center">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-pink-600 text-xs uppercase py-3 font-bold block" href="#/dashboard">
                                    <i className="text-center fas fa-bars text-blueGray-300 mr-2 text-sm w-6"></i>
                                    Logs
                                </a>
                            </li>
                        </ul>
                        <hr className="my-4 md:min-w-full" />
                        <h6 className="md:min-w-full text-gray-900 dark:text-gray-100 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Documentation
                        </h6>
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                            <li className="inline-flex">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" href="#/documentation/styles">
                                    <i className="text-center fas fa-paint-brush mr-2 text-base w-6"></i>
                                    Styles
                                </a>
                            </li>
                            <li className="inline-flex">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" href="#/documentation/styles">
                                    <i className="fab fa-css3-alt mr-2 text-base w-6"></i>
                                    CSS Components
                                </a>
                            </li>
                            <li className="inline-flex">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" href="#/documentation/styles">
                                    <i className="fab fa-vuejs mr-2 text-base w-6"></i>
                                    VueJS
                                </a>
                            </li>
                            <li className="inline-flex">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" href="#/documentation/styles">
                                    <i className="fab fa-react mr-2 text-base w-6"></i>
                                    React
                                </a>
                            </li>
                            <li className="inline-flex">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" href="#/documentation/styles">
                                    <i className="fab fa-angular mr-2 text-base w-6"></i>
                                    Angular
                                </a>
                            </li>
                            <li className="inline-flex">
                                <a className="text-gray-900 dark:text-gray-100 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" href="#/documentation/styles">
                                    <i className="fab fa-js-square mr-2 text-base w-6"></i>
                                    Javascript
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
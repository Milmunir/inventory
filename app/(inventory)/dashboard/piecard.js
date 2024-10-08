export default function Piecard({ data, icon, title, desc }) {
    return (
        <>
            <div className="w-full h-full">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded xl:mb-0 shadow-lg h-full">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-gray-900 uppercase font-bold text-xs">
                                    {title}
                                </h5>
                                <span className="font-semibold text-xl text-gray-900">
                                    {data.count}
                                </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                    <i className={`${icon}`}></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                            {data.difference ? (
                                <>
                                    <span className={`${data.difference > 0 ? 'text-emerald-500' : 'text-red-500'} mr-2`}>
                                        <i className={`fas ${data.difference > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> {data.difference}
                                    </span>
                                    <span className="whitespace-nowrap text-gray-900">
                                        {desc}
                                    </span>
                                </>
                            ) : ''}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
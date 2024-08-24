export default function Table(data) {
    return (
        <>
            {console.log(data)}
            <div>
                <div className="table border-collapse table-auto w-full text-sm">
                    <div className="table-header-group">
                        <div className="table-row">
                            <div className="table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">Time</div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium px-2 py-4 pr-0 w-0 text-slate-400 dark:text-slate-200 text-left">User</div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium px-2 py-4 pl-4 pb-3 text-slate-400 dark:text-slate-200 text-left">Item</div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium px-2 py-4 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium px-2 py-4 pb-3 text-slate-400 dark:text-slate-200 text-left">Before</div>
                            <div className="table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">After</div>
                        </div>
                    </div>
                    {data.log.map((key) => (
                        <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                            <div className="table-row">
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 w-0 text-nowrap text-slate-500 dark:text-slate-400">{key.timestamp.toDateString()}</div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-0 text-slate-500 dark:text-slate-400">{key.user_id}</div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 w-auto text-slate-500 dark:text-slate-400">
                                    <a href={`/item/${key.item_id}`}>
                                        <div className="flex h-full w-full p-4 ">
                                            {key.item.name}
                                        </div>
                                    </a>
                                </div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 w-0 text-slate-500 dark:text-slate-400">{key.action}</div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8 w-0 text-slate-500 dark:text-slate-400">{key.quantity_before}</div>
                                <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8 w-0 text-slate-500 dark:text-slate-400">{key.quantity_after}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
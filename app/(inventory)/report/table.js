export default function Table(data) {
    return (
        <>
            {data.log.map((key) => (
                <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                    <div className="table-row">
                        <div className="table-cell px-2 py-3 w-0 border-b border-slate-100 dark:border-slate-700 text-nowrap text-slate-500 dark:text-slate-400">{key.timestamp.toUTCString()}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-0 w-0 text-slate-500 dark:text-slate-400">{key.user_id}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{key.type}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 w-0 text-slate-500 dark:text-slate-400">{key.entity_id}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8 w-0 text-slate-500 dark:text-slate-400">{key.action}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8 w-0 text-slate-500 dark:text-slate-400">{key.part}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8  text-slate-500 dark:text-slate-400">{key.before}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8  text-slate-500 dark:text-slate-400">{key.after}</div>
                    </div>
                </div>
            ))}
        </>
    )
}
export default function Table(data) {
    return (
        <>
            {console.log(data)}
            {data.list.map((key) => (
                <a className="table-row-group bg-white dark:bg-slate-800" key={key.id} href={`/item/${key.id}`}>
                    <div className="table-row">
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pr-0 text-slate-500 dark:text-slate-400">{key.id}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 pr-8 w-0 text-slate-500 dark:text-slate-400">{key.category.name}</div>
                        <div className="table-cell  border-b border-slate-100 dark:border-slate-700 p-4 w-auto text-slate-500 dark:text-slate-400">{key.name}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-4 w-0 text-slate-500 dark:text-slate-400">{key.quantity}</div>
                    </div>
                </a>
            ))}
        </>
    )
}
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export default async function name() {
    const userlist = await prisma.user.findMany({
        select: {
            name: true,
            id: true
        }
    })
    return (
        <>
            <div className="table border-collapse table-auto w-full text-sm">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 pt-4 text-slate-400 dark:text-slate-200 text-left">Id</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium px-2 pt-4 text-slate-400 dark:text-slate-200 text-left">Nama</div>
                    </div>
                </div>
                {userlist.map((key) => (
                    <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                        <a className="table-row" href={`user/${key.id}`}>
                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-0 text-nowrap text-slate-500 dark:text-slate-400">{key.id}</div>
                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-auto text-slate-500 dark:text-slate-400">{key.name}</div>
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}
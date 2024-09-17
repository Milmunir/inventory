import { getactiveuser } from "@/app/lib/session"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export default async function name() {
    const activeUser = getactiveuser()
    const userlist = await prisma.user.findMany({
        select: {
            name: true,
            id: true
        }
    })
    return (
        <>
            <h2>User need approval:</h2>
            <div className="table border-collapse table-auto w-full text-sm">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">Id</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">Name</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">Approval</div>
                    </div>
                </div>
                {userlist.map((key) => (
                    <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-0 text-nowrap text-slate-500 dark:text-slate-400">{key.id}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-auto text-slate-500 dark:text-slate-400">{key.name}</div>
                        <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-32 text-slate-500 dark:text-slate-400">
                            <form>
                                <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button">
                                    <i className="fas fa-check text-gray-200"></i>
                                </button>
                                <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs ml-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="submit" name="id" value={key.id}>
                                    <i className="fas fa-times text-gray-200"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="mt-4">Approved Users:</h2>
            <div className="table border-collapse table-auto w-full text-sm">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">Id</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">Name</div>
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
import { refuseUser, verifyUser } from "@/app/auth/user"
import { customModel } from "@/app/lib/prisma/customodel"
import { getactiveuser } from "@/app/lib/session"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const prisma = new PrismaClient

export default async function name() {
    const user = await getactiveuser()
    const userlist = await prisma.user.findMany({
        where: {
            NOT: {
                id: 0
            }
        },
        select: {
            name: true,
            role: true,
            id: true,
            verified: true
        }
    })
    async function verifyUser(data) {
        "use server"
        console.log('approve');
        const id = parseInt(data.get('id'))
        const verify = customModel.user.verifyUser({
            id: id,
            uid: user.id
        })
        redirect('/user')
    }
    
    async function refuseUser(data) {
        "use server"
        console.log('refuse');
        const id = parseInt(data.get('id'))
        const verify = customModel.user.remove({
            id: id,
            uid: user.id
        })
        redirect('/user')
    }
    return (
        <>
            <title>Users</title>
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
                    <>
                        {key.verified == false && <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-0 text-nowrap text-slate-500 dark:text-slate-400">{key.id}</div>
                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-auto text-slate-500 dark:text-slate-400">{key.name}</div>
                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-32 text-slate-500 dark:text-slate-400">
                                <div className="flex">
                                    <form action={verifyUser}>
                                        <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="submit" name="id" value={key.id}>
                                            <i className="fas fa-check text-gray-200"></i>
                                        </button>
                                    </form>
                                    <form action={refuseUser}>
                                        <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs ml-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="submit" name="id" value={key.id}>
                                            <i className="fas fa-times text-gray-200"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        }
                    </>
                ))}
            </div>
            <h2 className="mt-4">Approved Users:</h2>
            <div className="table border-collapse table-auto w-full text-sm">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">Id</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">Name</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">Role</div>
                    </div>
                </div>
                {userlist.map((key) => (
                    key.verified && 
                    <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                        <a className="table-row" href={`user/${key.id}`}>
                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-0 text-nowrap text-slate-500 dark:text-slate-400">{key.id}</div>
                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-auto text-slate-500 dark:text-slate-400">{key.name}</div>
                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-auto text-slate-500 dark:text-slate-400">{key.role}</div>
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}
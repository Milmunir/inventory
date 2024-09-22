import Piecard from "./piecard";
// import Graph from "./graph";
import { PrismaClient } from "@prisma/client";
import ChartBuilder from "./chartbuilder";

const prisma = new PrismaClient

export default async function Dashboard() {
    const itemcount = await prisma.items.count()
    const month = new Date(Date.now())
    const lastMonth = new Date(Date.now())
    lastMonth.setDate(month.getDate() - 30)
    const diffItem = await prisma.items.aggregate({
        _count: true,
        where: {
            created_at: {
                gte: lastMonth,
                lte: month
            }
        }
    })
    const usercount = await prisma.user.count()
    const diffUser = await prisma.user.aggregate({
        _count: true,
        where: {
            created_at: {
                gte: lastMonth,
                lte: month
            }
        }
    })
    const lowstock = await prisma.items.aggregate({
        _count: true,
        where: {
            quantity: {
                lte: 100
            }
        }
    })
    const emptystock = await prisma.items.aggregate({
        _count: true,
        where: {
            quantity: {
                equals: 0
            }
        }
    })
    const newItem = await prisma.items.findMany({
        take: 5,
        orderBy: [
            { created_at: 'desc' }
        ],
        include: {
            category: {
                select: {
                    name: true
                }
            }
        }
    })
    const newUser = await prisma.user.findMany({
        take: 5,
        orderBy: [
            { created_at: 'desc' }
        ],
        select: {
            id: true,
            name: true
        }
    })
    const newChange = await prisma.audit.findMany({
        take: 10,
        orderBy: [
            { timestamp: 'desc' }
        ],
        where: {
            timestamp: {
                gte: lastMonth,
                lte: month
            }
        }
    })
    const example = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ]
    return (
        <>
            <title>Dashboard</title>
            <div>
                <div>
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 ">
                        <Piecard data={{ count: itemcount, difference: diffItem._count }} icon={'far fa-chart-bar'} title='ITEM COUNT' desc="Since last 30 Day" />
                        <Piecard data={{ count: usercount, difference: diffUser._count }} icon={'fas fa-users'} title='USER COUNT' desc="Since last 30 Day" />
                        <Piecard data={{ count: lowstock._count }} icon={'fas fa-exclamation'} title='LOW STOCK ITEM' desc="Item with <100 stock" />
                        <Piecard data={{ count: emptystock._count }} icon={'fas fa-exclamation'} title='EMPTY STOCK' desc="Item with 0 stock" />
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        {/* <Graph data={example} title='Placeholder' x='year' datatype='count' graphtitle='PLACEHOLDER' /> */}
                        <ChartBuilder canvasid='chart' chartype='bar' data={example} title='Placeholder' x='year' datatype='count' graphtitle='PLACEHOLDER'/>
                        <div>
                            <h3 className="text-center">NEWEST ITEMS</h3>
                            <div className="table border-collapse table-auto w-full text-sm">
                                <div className="table-header-group">
                                    <div className="table-row">
                                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 pt-4 text-slate-400 dark:text-slate-200 text-left">Id</div>
                                        <div className="table-cell border-b dark:border-slate-600 font-medium px-2 pt-4 text-slate-400 dark:text-slate-200 text-left">Nama</div>
                                        <div className="table-cell border-b dark:border-slate-600 font-medium px-2 pt-4 text-slate-400 dark:text-slate-200 text-left">Category</div>
                                        <div className="table-cell border-b dark:border-slate-600 font-medium px-2 pt-4 w-0 text-slate-400 dark:text-slate-200 text-left">Quantity</div>
                                    </div>
                                </div>
                                {newItem.map((key) => (
                                    <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                                        <div className="table-row">
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-0 text-nowrap text-slate-500 dark:text-slate-400">{key.id}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-auto text-slate-500 dark:text-slate-400">{key.name}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-0 text-slate-500 dark:text-slate-400">{key.category.name}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">{key.quantity}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h3 className="text-center mt-4">NEWEST USER</h3>
                            <div className="table border-collapse table-auto w-full text-sm">
                                <div className="table-header-group">
                                    <div className="table-row">
                                        <div className="table-cell border-b dark:border-slate-600 font-medium p-2 pt-4 text-slate-400 dark:text-slate-200 text-left">Id</div>
                                        <div className="table-cell border-b dark:border-slate-600 font-medium px-2 pt-4 text-slate-400 dark:text-slate-200 text-left">Nama</div>
                                    </div>
                                </div>
                                {newUser.map((key) => (
                                    <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                                        <div className="table-row">
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-0 text-nowrap text-slate-500 dark:text-slate-400">{key.id}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 p-2 w-auto text-slate-500 dark:text-slate-400">{key.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-center">Latest Change</h3>
                        <div className="w-full overflow-auto">
                            <div className="table border-collapse table-auto w-full text-sm">
                                <div className="table-header-group">
                                    <div className="table-row">
                                        <div className="w-0 cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">Time</div>
                                        <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">User</div>
                                        <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium py-4 text-slate-400 dark:text-slate-200 text-left">Type</div>
                                        <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">Id</div>
                                        <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">Action</div>
                                        <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">Part</div>
                                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">Before</div>
                                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left">After</div>
                                    </div>
                                </div>
                                {newChange.map((key) => (
                                    <div className="table-row-group bg-white dark:bg-slate-800" key={key.id}>
                                        <div className="table-row">
                                            <div className="table-cell px-2 py-3  border-b border-slate-100 dark:border-slate-700 text-nowrap text-slate-500 dark:text-slate-400">{key.timestamp.toUTCString()}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-0 text-slate-500 dark:text-slate-400">{key.user_id}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">{key.type}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2  text-slate-500 dark:text-slate-400">{key.entity_id}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8  text-slate-500 dark:text-slate-400">{key.action}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8  text-slate-500 dark:text-slate-400">{key.part}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8  text-slate-500 dark:text-slate-400">{key.before}</div>
                                            <div className="table-cell border-b border-slate-100 dark:border-slate-700 px-2 pr-8  text-slate-500 dark:text-slate-400">{key.after}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
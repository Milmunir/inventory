"use client"
import { PrismaClient } from "@prisma/client";
import Table from "./table";
import { useState, useTransition, useActionState, useRef } from "react";
import { auditup, getaudit } from "./server";

const prisma = new PrismaClient

export default function Filter(data) {
    const [audit, setdataudit] = useState(data.log)
    let ref = useRef({
        sort: 'timestamp',
        user: '',
        type: '',
        id: '',
        action: '',
        part: '',
        from: '',
        to: '',
        asc: false,
    })
    const typeselect = useRef(null)
    async function setfilter(key, value) {
        ref.current[key] = value
        if (ref.current.type == 'category') {
            typeselect.current = (
                <select className="mr-2 font-semibold inline-block py-1 px-2  rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="id" name="id" onChange={(e) => setfilter('id', e.target.value)}>
                    <option value="">Category</option>
                    {data.cat.map((key) => (
                        <option value={key.id} key={key.id}>{key.name}</option>
                    ))}
                </select>
            )
        }
        else if (ref.current.type == 'item') {
            typeselect.current = (
                <select className="mr-2 font-semibold inline-block py-1 px-2  rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="id" name="id" onChange={(e) => setfilter('id', e.target.value)}>
                    <option value="">Item</option>
                    {data.item.map((key) => (
                        <option value={key.id} key={key.id}>{key.name}</option>
                    ))}
                </select>
            )
        }
        else {
            typeselect.current = null
        }
        const newdata = await fetch('/api/audit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ref.current)
        })
            .then(response => response.json())
            .then(data => data.log.map(item => ({
                ...item,
                timestamp: new Date(item.timestamp)
            })
            ))
        setdataudit(newdata)
    }

    return (
        <>
            <div className="flex mt-2 justify-between">
                <div className="flex items-center">
                    Filter
                    <select className="ml-2 font-semibold inline-block py-1 px-2  rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="type" name="type" onChange={(e) => setfilter('type', e.target.value)}>
                        <option value="">Type</option>
                        <option value='item'>Item</option>
                        <option value='category'>Category</option>
                    </select>
                    <select className="ml-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" name="user" onChange={(e) => setfilter('user', e.target.value)}>
                        <option value="">User</option>
                        {data.user.map((key) => (
                            <option value={key.id} key={key.id}>{key.name}</option>
                        ))}
                    </select>
                    <select className="mx-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" name="action" onChange={(e) => setfilter('action', e.target.value)}>
                        <option value="">Action</option>
                        <option value="create">create</option>
                        <option value="update">update</option>
                        <option value="delete">delete</option>
                    </select>
                    {typeselect.current}
                    From
                    <input type="date" className="mx-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="From" name="from" onChange={(e) => setfilter('from', e.target.value)}></input>
                    To
                    <input type="date" className="m-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="To" name="to" onChange={(e) => setfilter('to', e.target.value)}></input>
                </div>
                <button className="m-2 mr-0 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" type="submit">Filter</button>
            </div>
            <div className="py-2 flex w-full justify-center">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        <li>
                            <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-600 bg-white  text-gray-600 dark:border-gray-200 dark:bg-gray-600  dark:text-gray-200">
                                <i className="fas fa-chevron-left -ml-px"></i>
                                <i className="fas fa-chevron-left -ml-px"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-600 bg-white  text-gray-600 dark:border-gray-200 dark:bg-gray-600  dark:text-gray-200">
                                <i className="fas fa-chevron-left -ml-px"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-600 bg-white  text-gray-600 dark:border-gray-200 dark:bg-gray-600  dark:text-gray-200">
                                1
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-600 bg-white  text-gray-600 dark:border-gray-200 dark:bg-gray-600  dark:text-gray-200">
                                <i className="fas fa-chevron-right -mr-px"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-600 bg-white  text-gray-600 dark:border-gray-200 dark:bg-gray-600  dark:text-gray-200">
                                <i className="fas fa-chevron-right -mr-px"></i>
                                <i className="fas fa-chevron-right -mr-px"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="table border-collapse table-auto w-full text-sm">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'timestamp')}>Time<i class="fas fa-chevron-up"/></div>
                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'user_id')}>User</div>
                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'type')}>Type</div>
                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 pb-3 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'entity_id')}>Id</div>
                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 pb-3 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'action')}>Action</div>
                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'part')}>Part</div>
                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 pb-3 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'before')}>Before</div>
                        <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'after')}>After</div>
                    </div>
                </div>
                <Table log={audit} />
            </div>
        </>
    )
}
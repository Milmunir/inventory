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
        if (key === 'sort' && ref.current.sort === value) {
            ref.current.asc = !ref.current.asc
        }
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
        else if (ref.current.type == 'user') {
            typeselect.current = (
                <select className="mr-2 font-semibold inline-block py-1 px-2  rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="id" name="id" onChange={(e) => setfilter('id', e.target.value)}>
                    <option value="">User</option>
                    {data.user.map((key) => (
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
                <div className="ll:flex items-center block">
                    <div className="flex items-center">
                        Filter
                        <select className="ml-2 font-semibold inline-block py-1 px-2  rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="type" name="type" onChange={(e) => setfilter('type', e.target.value)}>
                            <option value="">Type</option>
                            <option value='item'>Item</option>
                            <option value='category'>Category</option>
                            <option value='user'>User</option>
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
                    </div>
                    <div className="flex items-center">
                        From
                        <input type="date" className="m-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="From" name="from" onChange={(e) => setfilter('from', e.target.value)}></input>
                        To
                        <input type="date" className="m-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="To" name="to" onChange={(e) => setfilter('to', e.target.value)}></input>
                    </div>
                </div>
            </div>
            <div className="w-full overflow-auto">
                <div className="table border-collapse table-auto w-full text-sm">
                    <div className="table-header-group">
                        <div className="table-row">
                            <div className="w-0 cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'timestamp')}>Time{ref.current.sort === 'timestamp' ? <i className={`fas fa-caret-${ref.current.asc ? 'up' : 'down'} ml-1`} /> : null}</div>
                            <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'user_id')}>User{ref.current.sort === 'user_id' ? <i className={`fas fa-caret-${ref.current.asc ? 'up' : 'down'} ml-1`} /> : null}</div>
                            <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'type')}>Type{ref.current.sort === 'type' ? <i className={`fas fa-caret-${ref.current.asc ? 'up' : 'down'} ml-1`} /> : null}</div>
                            <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'entity_id')}>Id{ref.current.sort === 'entity_id' ? <i className={`fas fa-caret-${ref.current.asc ? 'up' : 'down'} ml-1`} /> : null}</div>
                            <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'action')}>Action{ref.current.sort === 'action' ? <i className={`fas fa-caret-${ref.current.asc ? 'up' : 'down'} ml-1`} /> : null}</div>
                            <div className="w-min cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'part')}>Part{ref.current.sort === 'part' ? <i className={`fas fa-caret-${ref.current.asc ? 'up' : 'down'} ml-1`} /> : null}</div>
                            <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'before')}>Before{ref.current.sort === 'before' ? <i className={`fas fa-caret-${ref.current.asc ? 'up' : 'down'} ml-1`} /> : null}</div>
                            <div className="cursor-pointer table-cell border-b dark:border-slate-600 font-medium px-2 py-4 text-slate-400 dark:text-slate-200 text-left" onClick={() => setfilter('sort', 'after')}>After{ref.current.sort === 'after' ? <i className={`fas fa-caret-${ref.current.asc ? 'up' : 'down'} ml-1`} /> : null}</div>
                        </div>
                    </div>
                    <Table log={audit} />
                </div>
            </div>
        </>
    )
}
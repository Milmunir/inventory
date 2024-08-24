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
        item: '',
        action: '',
        user: '',
        from: '',
        to: '',
    })
    async function setfilter(key, value) {
        ref.current[key] = value
        const newdata = await fetch('/api/audit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ref.current)})
            .then(response => response.json())
            .then(data => data.log.map(item => ({
                ...item,
                timestamp: new Date(item.timestamp)
            }))
        )
        setdataudit(newdata)
    }
    return (
        <>
            <div>
                <div>
                    Sort By
                    <select className="ml-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" name="sort" defaultValue='timestamp' onChange={(e) => setfilter('sort', e.target.value)}>
                        <option value="timestamp">Date</option>
                        <option value="user_id">User</option>
                        <option value="item_id">Item</option>
                        <option value="action">Action</option>
                    </select>
                </div>
                <div className="flex mt-2 justify-between">
                    <div className="flex items-center">
                        Filter
                        <select className="ml-2 font-semibold inline-block py-1 px-2  rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="Item" name="item" onChange={(e) => setfilter('item', e.target.value)}>
                            <option value="">Item</option>
                            {data.item.map((key) => (
                                <option value={key.id} key={key.id}>{key.name}</option>
                            ))}
                        </select>
                        <select className="ml-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" name="action" onChange={(e) => setfilter('action', e.target.value)}>
                            <option value="">Action</option>
                            <option value="create">create</option>
                            <option value="setQuantity">setQuantity</option>
                            <option value="substract">substract</option>
                            <option value="add">add</option>
                        </select>
                        <select className="mx-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" name="user" onChange={(e) => setfilter('user', e.target.value)}>
                            <option value="">User</option>
                            {data.user.map((key) => (
                                <option value={key.id} key={key.id}>{key.name}</option>
                            ))}
                        </select>
                        From
                        <input type="date" className="mx-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="From" name="from" onChange={(e) => setfilter('from', e.target.value)}></input>
                        To
                        <input type="date" className="m-2 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="To" name="to" onChange={(e) => setfilter('to', e.target.value)}></input>
                    </div>
                    <button className="m-2 mr-0 font-semibold inline-block py-1 px-2 rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" type="submit">Filter</button>
                </div>
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
            <Table log={audit} />
        </>
    )
}
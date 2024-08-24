"use client"

import { useRef, useState} from "react";
import Table from "./table";

export default function Filter(data) {
    //the DOM will not update after the data sorted AND filtered. thats why i added state for the table DOM
    //it seems it will not update because sort only manipulate objects inside the state and react decided to not call that a 'change'
    //but if i use a component as state, it will update at any changes done
    const list = useRef(data.item)
    const sort = useRef('name')
    const [table, settable] = useState(<Table list={list.current}/>);
    function sorting(key) {
        sort.current = key
        if (sort.current === 'category.name') {
            list.current = list.current.sort((a, b) => (a.category.name > b.category.name) ? 1 : ((b.category.name > a.category.name) ? -1 : 0))
        }
        else {
            list.current = list.current.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
        }
        console.log(list.current);
        settable(<Table list={list.current}/>)
    }
    function filter(catid) {
        let filtered
        if (catid !== '') {
            filtered = data.item.filter(function (arr) {
                return arr.category_id == parseInt(catid)
            })
        }
        else {
            filtered = data.item
        }
        list.current = filtered
        sorting(sort.current)
    }
    return (
        <>
            <div className="flex w-full justify-between">
                <div>
                    <select className="font-semibold inline-block py-1 px-2  rounded text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-600" placeholder="category" name="category" onChange={(e) => filter(e.target.value)}>
                        <option value="">Category</option>
                        {data.cat.map((key) => (
                            <option value={key.id} key={key.id}>{key.name}</option>
                        ))}
                    </select>
                </div>
                <a href="/item/add">
                    <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150" type="button">
                        Add
                    </button>
                </a>
            </div>
            <div className="table border-collapse table-auto w-full text-sm">
                <div className="table-header-group">
                    <div className="table-row">
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pr-0 w-0 text-slate-400 dark:text-slate-200 text-left" onClick={() => sorting('id')}>id</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pr-4 pt-4 pb-3 w-auto text-slate-400 dark:text-slate-200 text-left" onClick={() => sorting('category.name')}>Category</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pl-4 pt-4 pb-3 w-auto text-slate-400 dark:text-slate-200 text-left" onClick={() => sorting('name')}>Name</div>
                        <div className="table-cell border-b dark:border-slate-600 font-medium p-4 pt-4 pb-3 w-auto text-slate-400 dark:text-slate-200 text-left" onClick={() => sorting('quantity')}>Qty</div>
                    </div>
                </div>
                {table}
            </div>
        </>
    )
}
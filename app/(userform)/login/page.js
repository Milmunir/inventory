"use client"
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { autoLogin, signin } from "../../auth/user";
import { useActionState, useTransition } from 'react'

const prisma = new PrismaClient

export default function Login() {
    const [state, action, pending] = useActionState(signin, undefined)
    const [isPending, startTransition] = useTransition()
    return (
        <>
            {isPending &&
                <div className="flex w-screen h-screen items-center justify-center bg-black bg-opacity-30 absolute top-0 left-0">
                    <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                </div>
            }
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src="/img/shop.png"
                        alt="THOKKOKU"
                        height={300}
                        width={300}
                    />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">Sign in to your account</h2>
                </div>
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <div className="flex w-full justify-evenly">
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => startTransition(() => autoLogin(0))}>Admin</a>
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => startTransition(() => autoLogin(134))}>User</a>
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => startTransition(() => autoLogin(1222))}>Viewer</a>
                        </div>
                    </div>
                    <form className="space-y-2" action={action}>
                        {state?.errors && (
                            <div className="flex text-white px-4 py-2 border-0 rounded relative mt-2 bg-red-500">
                                <span className="inline-block align-middle mr-8 text-sm">
                                    {state.errors}
                                </span>
                            </div>
                        )}
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100" >ID</label>
                            <div className="mt-2">
                                <input id="id" name="id" type="number" autoComplete="id" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Make Account</a>
                    </p>
                </div>
            </div>
        </>
    )
}
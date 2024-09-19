"use client"
import { signup } from "@/app/auth/user";
import Image from "next/image";
import { useActionState } from "react";


export default function Register() {
    const [state, action, pending] = useActionState(signup, undefined)
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src="/img/shop.png"
                        alt="THOKKOKU"
                        height={300}
                        width={300}
                    />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">Sign Up</h2>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" action={action}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100" >Name</label>
                            <div className="mt-2">
                                <input id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {state?.errors.name && (
                                    <div className="flex text-white px-4 py-2 border-0 rounded relative mt-2 bg-red-500">
                                        <span className="inline-block align-middle mr-8 text-sm">
                                            {state.errors.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100" >ID</label>
                            <div className="mt-2">
                                <input id="id" name="id" type="number" autoComplete="id" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {state?.errors.id && (
                                    <div className="flex text-white px-4 py-2 border-0 rounded relative mt-2 bg-red-500">
                                        <span className="inline-block align-middle mr-8 text-sm">
                                            {state.errors.id}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100" >Password</label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                {state?.errors.password && (
                                    <div className="flex text-white px-4 py-2 border-0 rounded relative mt-2 bg-red-500">
                                        <span className="inline-block align-middle mr-8">
                                            {state.errors.password.map((error) => (
                                                <li className="text-sm" key={error}>{error}</li>
                                            ))}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <button type="submit" aria-disabled={pending} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{pending ? 'Registering...' : 'Register'}</button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Already a member?
                        <a href="login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign In</a>
                    </p>
                </div>
            </div>
        </>
    )
}
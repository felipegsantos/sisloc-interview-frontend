"use client";

import { useTransition } from 'react'
import submitLoginAction from "./SubmitLoginAction";
import { useForm } from "react-hook-form";

export const LoginFormComponent = () => {
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-regular leading-9 tracking-tight text-gray-900">
                        Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit((values) => startTransition(() => submitLoginAction(values)))}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Usuário
                            </label>
                            <div className="mt-0">
                                <input
                                    id="email"
                                    type="email"
                                    { ...register('email', { required: true }) }
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <small className="text-red-500">{errors?.email && <>Campo obrigatório</>}</small>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha
                                </label>
                            </div>
                            <div className="mt-0">
                                <input
                                    id="password"
                                    type="password"
                                    { ...register('password', { required: true }) }
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <small className="text-red-500">{errors?.password && <>Campo obrigatório</>}</small>
                            </div>
                        </div>

                        <div>
                            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit"> Entrar </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
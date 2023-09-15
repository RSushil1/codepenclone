import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");

    const navigate = useNavigate();
    const Host = "http://localhost:4000"


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name)
        try {
            const res = await axios.post(`${Host}/api/auth/register`, {
                name, email, password, question, answer
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/signin');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Server not responded!');
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <svg className="mx-auto h-20 w-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="visual-studio-code"><path fill="#1F9CF0" d="m6.317 22.046-.629-.314 3.981-4.266.938 1.005-4.29 3.575zM20 25.602 5.688 10.268l.599-.299L20 22.54v3.062zm0-14.958-5.247 4.372-1.507-1.382L20 6.398v4.246zm6 13.189-4 2.4V5.766l4 2.4v15.667z"></path><path fill="#0065A9" d="m27.515 6.743-6-3.6c-.027-.016-.057-.024-.086-.037-.397-.238-.91-.195-1.239.157l-8.419 9.021-4.64-4.254a1.003 1.003 0 0 0-1.123-.157L3.597 9.078a1.001 1.001 0 0 0-.284 1.576L8.302 16l-4.989 5.346a.999.999 0 0 0 .284 1.576l2.411 1.206a.997.997 0 0 0 1.088-.127l4.879-4.066 8.215 8.802a.998.998 0 0 0 .731.318.994.994 0 0 0 .52-.167c.024-.012.05-.017.073-.031l6-3.6A1 1 0 0 0 28 24.4V7.6a1 1 0 0 0-.485-.857zM6.317 22.046l-.629-.314 3.981-4.266.938 1.005-4.29 3.575zM20 25.602 5.688 10.268l.599-.299L20 22.54v3.062zm0-5.776-3.759-3.446L20 13.248v6.578zm0-9.182-5.247 4.372-1.507-1.382L20 6.398v4.246zm6 13.189-4 2.4V5.766l4 2.4v15.667z"></path></svg>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign Up to MagicCode
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <div className='flex flex-row'>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="m-2">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        id="name"
                                        autoComplete="name"
                                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    E-mail
                                </label>
                                <div className="m-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        autoComplete="email"
                                        required
                                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password"
                                        autoComplete="current-password"
                                        required
                                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Choose one security question
                                </label>
                                <div className="mt-2">
                                    <select
                                        type="text"
                                        name="question"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        id="question"
                                        autoComplete="question-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="favoriteCartoon">What is your favorite childhood cartoon character?</option>
                                        <option value="birthCity">In which city were you born?</option>
                                        <option value="maidenName">What is your mother's maiden name?</option>
                                        <option value="firstPetName">What is the name of your first pet?</option>
                                        <option value="favoriteColor">What is your favorite color?</option>
                                    </select>

                                </div>
                            </div>
                            <div>
                                <label htmlFor="answer" className="block text-sm font-medium leading-6 text-gray-900">
                                    Your answer
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="answer"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        id="answer"
                                        autoComplete="answer"
                                        required
                                        className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>




                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form >

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <NavLink to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </NavLink>
                    </p>
                </div >
            </div >
        </>
    )
}
export default Signup
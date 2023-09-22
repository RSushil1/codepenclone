import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Fragment, useState } from 'react'
import { toast } from 'react-toastify';
import { UseAuth } from '../context/auth';
import { PlusCircleIcon, FolderPlusIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';


export default function CreateRepoModal() {
    const [auth, setAuth] = UseAuth();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const owner = auth?.user._id;
    const Host = "https://codemagicapp.vercel.app"

    let [isOpen, setIsOpen] = useState(false);

    // form submit
    const handleCreateRepo = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Host}/api/repo/create-Repo`,
                { name, description, owner }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                setName("");
                setDescription("")
                setIsOpen(false)
                setAuth({
                    ...auth,
                    user: {
                        ...auth.user,
                        repo: res.data.repo
                    }
                });

            } else {
                toast.error(res?.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Server Issue");
        }
    };

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="flex flex-row m-5">
                <FolderPlusIcon className="h-8 w-8 text-green-600" aria-hidden="true" />
                <NavLink
                    type="button"
                    onClick={openModal}
                    className="block px-4 py-2 hover:bg-gray-800"
                >
                    Create Repo
                </NavLink>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className='flex flex-row gap-5'>
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <PlusCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add Repository
                                    </Dialog.Title>
                                    </div>
                                    <form onSubmit={handleCreateRepo}>
                                        <div className="mt-2">
                                            <div className="sm:col-span-4">
                                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Name of Repo
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        type="name"
                                                        autoComplete="name"
                                                        className="w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 focus:border-indigo-600 text-gray-900 text-sm leading-5"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-full">
                                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Description
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        rows={2}
                                                        className="w-full px-4 py-2 rounded-md border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 focus:border-indigo-600 text-gray-900 text-sm leading-5"
                                                        defaultValue={''}
                                                    />
                                                </div>
                                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences description about Repo.</p>
                                            </div>
                                        </div>

                                        <div className="mt-2 flex flex-row">

                                            <button
                                                onClick={closeModal}
                                                type="submit"
                                                className=" w-[20%] flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
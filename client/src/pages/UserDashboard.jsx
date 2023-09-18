import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { UseAuth } from '../context/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import CreateRepoModal from '../components/CreateRepoModal'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Dashboard', href: '#', current: true }
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [auth] = UseAuth();
  const [openCreateRepo, setOpenCreateRepo] = useState(false);
  const [repos, setRepos] = useState();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const Host = "http://localhost:4000"

  const itemsPerPage = 6;
  const totalPages = Math.ceil(total / itemsPerPage);


  const getAllRepos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${Host}/api/repo/repo-list/${page}`);
      setRepos(data.Repos);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  
  //getTotal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${Host}/api/repo/repo-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${Host}/api/repo/repo-list/${page}`);
      setLoading(false);
      setRepos([...repos, ...data?.Repos]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRepos();
    getTotal();
  }, [auth])

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  

  // const handleRepoClick=(value){

  // }
  const handleNewFile = () => {
    setOpenCreateRepo(true)
  }

  const handleLogout = () => {
    localStorage.setItem('CodeMagic', '');
    toast.success("Logout successfully")
    navigate('/')
  }
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className='ms-3 mt-1 stroke-black' xmlns="http://www.w3.org/2000/svg" width="48.237" height="48.464" id="visual-studio-code"><path fill="#0179cb" d="M17.172 29.664 5.215 38.981 0 36.384V12.1l5.195-2.617 11.874 9.338L35.869 0l12.368 4.927v38.528l-12.306 5.009ZM35.5 32.942V15.523l-11.255 8.72ZM5.628 29.808l5.916-5.38-5.916-5.9Z" data-name="visual studio code"></path></svg>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="
                              
                                'bg-gray-900 text-white
                             hover:bg-gray-700 hover:text-white
                              rounded-md px-3 py-2 text-sm font-medium"
                            >
                              <span className="absolute -inset-1.5" />
                              <span className=' text-white'>File</span>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                              <Menu.Item key="profile">
                                {({ active }) => (
                                  <NavLink
                                    onClick={handleNewFile}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    new file

                                  </NavLink>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src="/images/coding.png" alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                            <Menu.Item key="profile">
                              {({ active }) => (
                                <NavLink
                                  to="/user/profile"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  profile
                                </NavLink>
                              )}
                            </Menu.Item>
                            <Menu.Item key="logout">
                              {({ active }) => (
                                <NavLink
                                  onClick={handleLogout}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  logout
                                </NavLink>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="/images/coding.png" alt="user" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{auth?.user?.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{auth?.user?.email}</div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <CreateRepoModal openCreateRepo={openCreateRepo} />
        <main className="bg-gray-200">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {repos?.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white hover:bg-red-300 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <h2 className="text-xl font-semibold">{repo.name}</h2>
                  <p className="text-gray-600 mt-2">{repo.description}</p>
                </div>
              ))}
            </div>
            {repos && repos.length < total && (
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                onClick={handlePrevPage}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${
                  page === 1 ? 'cursor-not-allowed pointer-events-none' : ''
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {Array.from({ length: totalPages }).map((_, index) => (
                <a
                  key={index + 1}
                  href="#"
                  onClick={() => setPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    page === index + 1 ? 'bg-indigo-600 text-white' : ''
                  }`}
                >
                  {index + 1}
                </a>
              ))}
              <a
                href="#"
                onClick={handleNextPage}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ${
                  page === totalPages ? 'cursor-not-allowed pointer-events-none' : ''
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>

            
            
            )}
          </div>
        </main>

      </div>
    </>
  )
}

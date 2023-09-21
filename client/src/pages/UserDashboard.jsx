import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon,UserCircleIcon,ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import CreateRepoModal from './../components/CreateRepoModal';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UseAuth } from '../context/auth';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [repositories, setRepositories] = useState();
  const [total, setTotal] = useState();
  const [auth, setAuth] = UseAuth();
  const ownerId = auth?.user?._id
  const navigate = useNavigate();

  const Host = "http://localhost:4000"

  let pages = Math.ceil(total / 9);

  const pageNumbers = [];
  const maxPageButtons = pages; // Adjust this number to show the desired number of page buttons

  // Generate an array of page numbers to display
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  // Calculate the start and end index for the page buttons
  const startIndex =
    currentPage <= Math.floor(maxPageButtons / 2)
      ? 0
      : Math.min(currentPage - Math.floor(maxPageButtons / 2), pages - maxPageButtons);

  const endIndex = Math.min(startIndex + maxPageButtons, pages);

  const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

  //get paginated repo list
  const getAllRepoList = async () => {
    try {
      const { data } = await axios.get(`${Host}/api/repo/Repo-list?page=${currentPage}&ownerId=${ownerId}`);
      if (data?.success) {
        // setRepositories(null)
        setRepositories(data.Repos);
      } else {
        console.log("server issue")
      }
    } catch (error) {
      console.log(error)
    }

  }

  //getTotal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${Host}/api/repo/Repo-count/${ownerId}`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRepoList();
    getTotal();
  }, [auth, currentPage])

  const onPageChange = (value) => {
    setCurrentPage(value)
  };

  const handleOpenRepo = (value) => {
    navigate(`/code-editor?id=${value}`)
  }

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("CodeMagic");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Side Panel */}
        <aside className="w-full md:w-64 bg-gray-900 text-white h-16 md:h-screen">
          <div className="p-4">
            <h2 className="text-xl md:text-2xl font-semibold">{auth?.user.name}</h2>
            <p className="text-gray-400">{auth?.user.email}</p>
          </div>
          <nav className="mt-4">
            <div className='flex flex-row m-5'>
            <UserCircleIcon className="h-8 w-8 text-green-600" aria-hidden="true"/>
            <NavLink
              type="button"
              className="block px-4 py-2 hover:bg-gray-800"
            >
              Profile
            </NavLink>
            </div>
            <div className='flex flex-row m-5'>
            <ArrowRightOnRectangleIcon className="h-8 w-8 text-green-600" aria-hidden="true"/>
            <button
              onClick={() => {
                handleLogout();
                navigate('/');
              }}
              className="block px-4 py-2 hover:bg-gray-800"
            >
              Logout
            </button>
            </div>
            <CreateRepoModal />
          </nav>

        </aside>

        {/* Main Content */}
        <main className="flex-1 p-1">
          {/* Top Header */}
          <header className="bg-white shadow p-4">
            <div className="mx-auto">
              <h1 className="text-sm md:text-sm font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>
          </header>

          {/* Repository List */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {repositories?.map((repo) => (
              <div key={repo.name} className="bg-gray-200 p-4 rounded-lg">
                <h2 className="text-md md:text-xl font-semibold">{repo.name}</h2>
                <p className="text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis">{repo.description}</p>
                <button
                  onClick={() => handleOpenRepo(repo._id)}
                  className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                >
                  Open in Code Editor
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <NavLink
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </NavLink>
              <NavLink
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </NavLink>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing Page <span className="font-medium">{currentPage}</span> / <span className="font-medium">{pages}</span> of{' '}
                  <span className="font-medium">{total}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <NavLink
                    href="#"
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }`}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </NavLink>
                  {visiblePageNumbers.map((page) => (
                    <NavLink
                      key={page}
                      href="#"
                      onClick={() => onPageChange(page)}
                      className={`relative z-10 inline-flex items-center ${currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        } px-4 py-2 text-sm font-semibold`}
                    >
                      {page}
                    </NavLink>
                  ))}
                  <NavLink
                    href="#"
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${currentPage === pages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }`}
                    disabled={currentPage === pages}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

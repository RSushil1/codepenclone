import React, { useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import CreateRepoModal from './../components/CreateRepoModal';
import { NavLink } from 'react-router-dom';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const repositories = [
  {
    name: 'Repository 1',
    description: 'Description for Repository 1',
    codeEditorLink: 'link-to-repo-1',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  {
    name: 'Repository 2',
    description: 'Description for Repository 2',
    codeEditorLink: 'link-to-repo-2',
  },
  // Add more repositories as needed
];

const itemsPerPage = 9;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  const [openRepo, setOpenRepo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openCreateRepo, setOpenCreateRepo] = useState(false)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRepositories = repositories.slice(startIndex, endIndex);

  const totalPages = Math.ceil(repositories.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCreateRepo=()=>{
    setOpenCreateRepo(true)
  }

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Side Panel */}
        <aside className="w-full md:w-64 bg-gray-900 text-white h-16 md:h-screen">
          <div className="p-4">
            <h2 className="text-xl md:text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <nav className="mt-4">
  
              <a
                key="1"
                href="/"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Profile
              </a>
              <a
                key="2"
                href="/"
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Logout
              </a>
              <NavLink
                key="3"
                onClick={handleCreateRepo}
                className="block px-4 py-2 hover:bg-gray-800"
              >
                Create Repo
              </NavLink>
            
          </nav>
        </aside>

        {/* Main Content */}
        <CreateRepoModal openCreateRepo={openCreateRepo}/>
        <main className="flex-1 p-1">
          {/* Top Header */}
          <header className="bg-white shadow p-4">
            <div className="mx-auto">
              <h1 className="text-sm md:text-sm font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>
          </header>

          {/* Repository List */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {paginatedRepositories.map((repo) => (
              <div key={repo.name} className="bg-gray-200 p-4 rounded-lg">
                <h2 className="text-md md:text-xl font-semibold">{repo.name}</h2>
                <p className="text-gray-600">{repo.description}</p>
                <button
                  onClick={() => setOpenRepo(repo)}
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
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
         
        </main>
      </div>

      {/* Code Editor Modal */}
      {openRepo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 rounded-lg p-4">
            <h2 className="text-md md:text-xl font-semibold">{openRepo.name}</h2>
            <p className="text-gray-600">{openRepo.description}</p>
            <a
              href="/code-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Open in Code Editor
            </a>
            <button
              onClick={() => setOpenRepo(null)}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

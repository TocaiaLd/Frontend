import { Link } from "react-router-dom"

function PageChanger({pages, actualPage, totalPages, link}){
    return(
        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md mt-5">
                
                {/* Anterior */}
                <Link to={actualPage == 1 ? `` : `/${link}/${actualPage - 1}`} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                        <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                </Link>

                {pages.map((page) => (
                    <Link 
                    to={`/${link}/${page}`} 
                    key={`${page}`} 
                    className={page == actualPage ? "relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" : "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex"}>
                        {page}
                    </Link>
                ))}

                {/* Próximo */}
                <Link to={actualPage == totalPages ? `` : `/${link}/${actualPage + 1}`} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                        <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                </Link>
        </nav>
    )
}

export default PageChanger

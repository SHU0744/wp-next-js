import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const Pagenation = () => {
  const total = 10;
  const sizePerPage = 1;
  const currentPage = 9;
  const totalPage = Math.ceil(total / sizePerPage);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-8 sm:px-6">
      <div className="flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {[...Array(7)].map((_, i) => {
              let page;
              const a = i + 1;
              const b = currentPage + a - 2;
              const c = totalPage - (7 - a);
              if (totalPage <= 7) {
                if (totalPage < a) return;
                page = a;
              } else {
                if (a <= 3) {
                  page = Math.max(a, Math.min(b, c));
                } else if (a == 4) {
                  page = b < c ? "..." : c;
                } else if (5 <= a) {
                  page = c;
                }
              }
              return (
                <a
                  key={i}
                  href="#"
                  className={
                    currentPage === page
                      ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  }
                >
                  {page}
                </a>
              );
            })}

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
  );
};

export default Pagenation;

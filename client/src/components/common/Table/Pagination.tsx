import React from 'react'

interface IPaginationProps {
    fieldsPerPage: number,
    totalFields: number,
    paginate: (number: number) => void,
    currentPage: number
}

const Pagination: React.FC<IPaginationProps> = ({ fieldsPerPage, totalFields, paginate, currentPage }) => {
    const totalPageNumbers = []
    const styleCurrentPage = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
    const styleNormalPage = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"

    let pagesToShow = []

    for (let i = 1; i <= Math.ceil(totalFields / fieldsPerPage); i++) {
        console.log("buebas")
        totalPageNumbers.push(i)
    }

    if (currentPage <= 6) {
        const pagesLength = totalPageNumbers.length
        pagesToShow = totalPageNumbers.slice(0, pagesLength > 9 ? 9 : pagesLength)
    } else {
        pagesToShow = totalPageNumbers.slice(currentPage - 6, currentPage + 4)
    }

    return <nav className="inline-flex rounded-md shadow-sm -space-x-px mt-6">
        {pagesToShow.map(number => (
            <a onClick={() => paginate(number)} key={number} href="#" className={`${number === currentPage ? styleCurrentPage : styleNormalPage} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}>
                {number}
            </a>
        ))}
    </nav>
}

export default Pagination
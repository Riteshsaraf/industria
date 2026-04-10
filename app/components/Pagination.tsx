'use client';

import React from "react";


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination ({
    currentPage = 1 ,
    totalPages = 1,
    onPageChange = () => { },
}: PaginationProps){
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        // Adjust start if near end
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        totalPages > 1 ? (<div className="flex items-center justify-center mt-6 space-x-2">

            {/* Prev Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-[#13499f] border border-[#13499f] rounded-md disabled:opacity-50 hover:bg-gray-100  cursor-pointer"
            >
                Prev
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 border border-[#13499f] text-[#13499f] rounded-md  cursor-pointer ${currentPage === page
                        ? "bg-[#13499f] text-white"
                        : "hover:bg-gray-100"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-[#13499f] text-[#13499f] rounded-md disabled:opacity-50 hover:bg-gray-100 cursor-pointer"
            >
                Next
            </button>

        </div>) : (<></>)
    );
};

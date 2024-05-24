export const usePaginate = (data, itemsPerPage, currentPage, setCurrentPage) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginate = (numPage) => setCurrentPage(numPage);

    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const nextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        } else {
            console.log("no hay mas paginas");
        }
    };

    const prevPage = () =>  {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        } else {
            console.log("no hay mas paginas");
        }
    };

    const totalPagesArray = Array.from({length: totalPages}, (_, i) => i + 1);

    return {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        paginate,
        totalPagesArray,
        currentData
    };
};

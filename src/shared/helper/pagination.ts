export const calculatePagination = (maxPage: number, itemPerPage: number, page: number) => {
    if (maxPage > page) {
        const currentItem = page * itemPerPage;
        
        return {
            first: itemPerPage,
            offset: currentItem
        }
    } 
}

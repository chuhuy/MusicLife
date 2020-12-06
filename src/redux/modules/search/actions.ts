export const SEARCH = 'SEARCH';

export const search = (keyword: string) => {
    return {
        type: SEARCH,
        payload: keyword
    }
}

export const ENABLE_LOADING = 'ENABLE_LOADING';
export const DISABLE_LOADING = 'DISABLE_LOADING';

export const enableLoading = () => {
    return {
        type: ENABLE_LOADING,
    };
};

export const disableLoading = () => {
    return {
        type: DISABLE_LOADING,
    };
};

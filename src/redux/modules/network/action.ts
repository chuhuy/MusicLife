export const TOGGLE_CONNECTION = 'TOGGLE_CONNECTION';

export const toggleConnection = (isConnected: boolean) => {
    return {
        type: TOGGLE_CONNECTION,
        payload: isConnected,
    };
};

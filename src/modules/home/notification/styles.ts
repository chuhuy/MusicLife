import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#161622',
        flexDirection: 'column',
    },
    header: {
        backgroundColor: '#242633',
        height: '8%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
    },
    back:{
        marginLeft: '15%'
    },
    main: {
        width: '100%'
    },
    notification: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 10,
        marginVertical: 5
    },
    notification__img: {
        width: 80,
        height: 80,
        borderRadius: 8,
        
    },
    notification__main: {
        marginHorizontal: 10
    },
    notification__title: {
        color: '#fff',
        fontSize: 16,

    },
    notification__content: {
        color: '#a4a5a9',
        
    },
    notification__time: {
        color: '#a4a5a9'
    }
});
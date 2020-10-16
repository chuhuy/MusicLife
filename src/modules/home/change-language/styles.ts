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
        flexDirection: 'column',
        marginTop: '5%',
        width: '100%',
    },
    option: {
        height: 50,
        paddingLeft: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    option__text: {
        color: '#fff',
        fontSize: 18,
    },
    check: {
        width: 30
    },
    rule: {
        borderBottomColor: '#bfbfbf',
        borderBottomWidth: 1,
    }
});
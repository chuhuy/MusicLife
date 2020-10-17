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
        justifyContent: 'space-between'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        marginRight: 10
    },
    back:{
        marginLeft: '15%'
    },
    main: {

    },
    avatar: {
        width: 300,
        height: 300,
        borderRadius: 150,
        marginTop: 50
    },
    input: {
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginTop: 40,
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center'
    }
});
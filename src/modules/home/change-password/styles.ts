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
        width: '100%',
        marginTop: '10%',
        paddingHorizontal: '5%'
    },
    form__group: {
        marginBottom: '10%',
    },
    label: {
        color: '#fff',
        fontSize: 16
    },
    input: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10,
        width: '100%',
        color: '#fff',
        marginTop: '3%',
        fontSize: 15,
        paddingHorizontal: '3%'
        
    },
    button : {
        
    }
});
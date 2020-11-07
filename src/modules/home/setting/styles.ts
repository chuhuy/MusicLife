import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161622',
        flexDirection: 'column',
    },
    header: {
        backgroundColor: '#242633',
        height: '20%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '10%',
    },
    header__left: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '4%',

    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    title: {
        color: 'white',
        fontSize: 23,
        fontWeight: '900',
        marginLeft: '5%',
    },
    edit__icon: {
        marginRight: '3%',

    },
    main: {
        flexDirection: 'column',
        marginTop: '15%',
    },
    main__item: {
        flexDirection: 'row',
        paddingHorizontal: '4%',
        paddingVertical: '3%',
        alignItems: 'center',

    },
    main__rule: {
        borderBottomWidth: 2,
        borderBottomColor: '#333333',
        width: '100%',

    },
    main__left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    main__left__svgView: {
        width: 30,
    },
    main__item__text: {
        color: 'white',
        width: '100%',
        fontSize: 16,
    },
    main__icon: {

    },
    main__icon__arrow: {
        flex: 2,
    },
    main__out: {

    },
});

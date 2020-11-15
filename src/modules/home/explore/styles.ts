import { StyleSheet, Dimensions } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    contentContainer: {
        marginBottom: -30
    },
    chart: {
        flexDirection: 'row',
        marginBottom: 15
    },
    chartTitle: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    chartTitleActive: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
    },
    chartTitleInactive: {
        color: styleVars.greyColor,
        fontSize: styleVars.bigFontSize,
    },
    chartButton: {
        marginRight: 20,
    },
    group: {
        marginBottom: 30
    },
    flatListContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row',
        margin: -7.5,
    },
});

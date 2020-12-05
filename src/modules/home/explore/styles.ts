import { StyleSheet } from 'react-native';
import { styleVars } from './../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    touchArea: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    chart: {
        flexDirection: 'row',
        paddingBottom: 5,
        marginLeft: -10
    },
    chartTitleActive: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
    },
    chartTitleInactive: {
        color: styleVars.greyColor,
        fontSize: styleVars.bigFontSize,
    },
    group: {
        paddingBottom: 30,
        marginTop: -5
    },
    flatListContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row',
        margin: -7.5,
        marginBottom: 0
    },
});

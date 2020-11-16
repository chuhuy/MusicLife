import { StyleSheet } from "react-native";
import { styleVars } from "../../constance/style-variables";

export const styles = StyleSheet.create({
    underlineTabBar: {
        flexDirection: 'row',
        marginBottom: 30,
        // ma
        marginLeft: -5,
        marginRight: -15
    },
    tabButton: {
        marginRight: 15,
    },
    tabItem: {
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize,
        paddingHorizontal: 8
    },
    tabActive: {
        color: styleVars.white,
        borderBottomColor: styleVars.secondaryColor,
        borderBottomWidth: 2,
        paddingBottom: 10,
    },
})
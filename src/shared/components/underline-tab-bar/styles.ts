import { StyleSheet } from "react-native";
import { styleVars } from "../../constance/style-variables";

export const styles = StyleSheet.create({
    underlineTabBar: {
        flexDirection: 'row',
        paddingTop: 10,
        marginBottom: 30,
        margin: -10,
    },
    tabButton: {
        marginRight: 5,
        padding: 10,
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
        paddingBottom: 5,
    },
})
import { StyleSheet } from "react-native";
import { styleVars } from "../../../../../shared/constance/style-variables";

export const styles = StyleSheet.create({
    commentOuterWrapper: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    commentWrapper: {
        backgroundColor: styleVars.lightPrimaryColor,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        flexDirection: 'row',
    },
    contentWrapper: {
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 50
    },
    contentTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        color: styleVars.white,
        fontWeight: '700',
        fontSize: styleVars.baseFontSize,
        letterSpacing: 2,
        marginBottom: 5
    },
    content: {
        color: styleVars.greyColor,
        fontSize: styleVars.baseFontSize,
    },
    time: {
        color: styleVars.greyColor,
    }
})
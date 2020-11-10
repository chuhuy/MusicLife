import { StyleSheet } from "react-native";
import { styleVars } from "../../constance/style-variables";

export const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: 200,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',

        padding: 15,
        backgroundColor: styleVars.lightPrimaryColor,
        borderRadius: 20,
    },
    modalLayout: {

    },
    modalHeader: {

    },
    modalTitle: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: '600',
    },
    modalBody: {
        marginTop: 15,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modalFooterButton: {
        marginLeft: 25
    },
    modalFooterText: {

    },
})
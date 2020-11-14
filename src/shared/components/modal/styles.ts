import { StyleSheet } from "react-native";
import { styleVars } from "../../constance/style-variables";

export const styles = StyleSheet.create({
    modalContainer: {
        // justifyContent: 'space-between',
        padding: 15,
        backgroundColor: styleVars.lightPrimaryColor,
        borderRadius: 20,
    },
    modalLayout: {
        // alignSelf: 'center',
        
    },
    modalHeader: {
        marginBottom: 15,
    },
    modalTitle: {
        color: styleVars.white,
        fontSize: styleVars.bigFontSize,
        fontWeight: '600',
    }
})
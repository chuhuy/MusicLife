import { StyleSheet } from "react-native";
import { styleVars } from "../../../shared/constance/style-variables";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
    },
    body: {
        flex: 1,
        marginBottom: -30
    }
})
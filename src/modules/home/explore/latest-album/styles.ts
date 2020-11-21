import { StyleSheet } from "react-native";
import { styleVars } from "../../../../shared/constance/style-variables";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleVars.primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    body: {
        paddingTop: 30,
        flex: 1
    }
});
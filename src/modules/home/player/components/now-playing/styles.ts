import { StyleSheet } from 'react-native';
import { styleVars } from '../../../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
  songRow: {
    paddingHorizontal: 10,
  },
  songRowActive: {
    backgroundColor: styleVars.lightPrimaryColor,
    borderRadius: 5,
  },
});

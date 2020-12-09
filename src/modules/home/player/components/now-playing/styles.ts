import { StyleSheet } from 'react-native';
import { styleVars } from '../../../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
  nowPlaying: {
    marginVertical: 15,
  },
  songRow: {
    paddingHorizontal: 10,
  },
  songRowActive: {
    backgroundColor: styleVars.lightPrimaryColor,
    borderRadius: 5,
  },
});

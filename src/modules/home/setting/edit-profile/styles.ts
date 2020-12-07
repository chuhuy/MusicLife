import {StyleSheet} from 'react-native';
import {styleVars} from '../../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  avatar: {
    width: 250,
    height: 250,
  },
  input: {
    color: styleVars.white,
    borderBottomWidth: 3,
    borderBottomColor: styleVars.greyColor,
    marginTop: 40,
    paddingHorizontal: 20,
    fontSize: styleVars.largeFontSize,
    fontWeight: '700',
    textAlign: 'center',
  },
  btn: {
    marginTop: 80,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: styleVars.crimsonColor,
    height: 'auto',
    borderRadius: 200,
  },
  btn__title: {
    color: styleVars.white,
    textAlign: 'center',
    fontSize: styleVars.bigFontSize,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

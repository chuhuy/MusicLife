import {StyleSheet} from 'react-native';
import {styleVars} from '../../../../shared/constance/style-variables';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  input: {
    maxWidth: '70%',
    color: styleVars.white,
    borderBottomWidth: 3,
    borderBottomColor: styleVars.greyColor,
    marginTop: 20,
    paddingHorizontal: 20,
    fontSize: styleVars.largeFontSize,
    fontWeight: '700',
    textAlign: 'center',
  },
  btn: {
    marginTop: 40,
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

import {StyleSheet, Dimensions} from 'react-native';
import {
  styleVars,
} from '../../../shared/constance/style-variables';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: styleVars.primaryColor,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 58,
  },
  formContainer: {
    flex: 4,
  },
  signInButton: {
    marginTop: 5,
    marginBottom: 10,
  },
  separator: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separatorLine: {
    height: 1,
    flex: 1,
    backgroundColor: styleVars.white,
  },
  separatorLabel: {
    color: styleVars.white,
    fontSize: styleVars.baseFontSize,
    marginHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: (width - 150) / 2,
  },
  linkButtonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: -10,
  },
});

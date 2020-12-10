import {styleVars} from './../../../shared/constance/style-variables';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleVars.primaryColor,
    paddingVertical: 20,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
  },
  info: {
    backgroundColor: styleVars.lightPrimaryColor,
    height: '20%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    backgroundColor: styleVars.primaryColor,
    // height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: styleVars.greyColor,
    borderBottomWidth: 1,
  },
  header__right: {
    width: '100%',
  },
  title: {
    color: styleVars.white,
    fontSize: styleVars.bigFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: '10%',
  },
  info__left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  name: {
    color: styleVars.white,
    fontSize: styleVars.largeFontSize,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  edit__icon: {
    marginRight: '3%',
  },
  main: {
    marginTop: '15%',
  },
  main__item: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  main__rule: {
    borderBottomWidth: 2,
    borderBottomColor: styleVars.greyColor,
    width: '100%',
  },
  main__left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  main__left__svgView: {
    width: 22,
  },
  main__item__text: {
    color: styleVars.white,
    width: '100%',
    fontSize: styleVars.baseFontSize,
    marginLeft: 15,
  },
  main__icon__arrow: {
    flex: 2,
  },
  modal__group: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  modal__language__label: {
    color: styleVars.white,
    fontSize: styleVars.baseFontSize,
    marginLeft: 15,
  },
  modal_language_radio: {
    // padding: 20
  },
  modal__footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // marginTop: 10,
  },
  modal__language__group: {
    marginLeft: '5%',
    padding: 5,
  },
  modal__restart__main__text: {
    color: styleVars.greyColor,
    fontSize: styleVars.baseFontSize,
  },
  touchArea: {
    flex: 1,
  },
});

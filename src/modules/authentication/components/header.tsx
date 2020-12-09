import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import ArrowBack from '../../../assets/icons/arrow-back.svg';
import {IconButton} from '../../../shared/components';

interface Props {
  goBack: () => void;
}

const Header: React.FunctionComponent<Props> = ({goBack}) => {
  return (
    <View style={styles.headerContainer}>
      <IconButton icon={ArrowBack} onClick={goBack} />
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 40,
  },
  logo: {
    alignSelf: 'center',
    width: 60,
    height: 70,
    marginTop: 15,
  },
});

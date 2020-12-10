/* eslint-disable react-native/no-inline-styles */
export {Button} from './button';
export {FacebookButton} from './facebook-button';
export {GoogleButton} from './google-button';
export {LinkButton} from './link-button';
export {IconButton} from './icon-button';
export * from './flatlist';
export {BaseScreen} from './layout';

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {IconButton} from './icon-button';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import {styleVars} from '../constance/style-variables';
import {useNavigation} from '@react-navigation/native';

// Section Title
interface SectionTitleProps {
  title: string;
  onClick?: () => void;
}

export const SectionTitle: React.FunctionComponent<SectionTitleProps> = (
  props: SectionTitleProps,
) => {
  const {title, onClick} = props;

  return (
    <>
      <Pressable onPress={onClick}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <ArrowRight />
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 15,
  },
  title: {
    color: styleVars.white,
    fontSize: styleVars.bigFontSize,
    marginRight: 10,
    fontWeight: '700',
  },
  headerBackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: styleVars.greyColor,
    marginHorizontal: -15,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  headerTitle: {
    flex: 1,
    color: styleVars.white,
    textAlign: 'center',
    fontSize: styleVars.largeFontSize,
    letterSpacing: 1,
    fontWeight: '700',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    color: styleVars.greyColor,
    fontSize: styleVars.baseFontSize,
    paddingTop: 15,
  },
});

// Go Back Header
interface HeaderBackProps {
  title?: string;
}

export const HeaderBack: React.FunctionComponent<HeaderBackProps> = (
  props: HeaderBackProps,
) => {
  const {title} = props;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[title && styles.headerBackContainer]}>
      <IconButton icon={ArrowLeft} onClick={handleGoBack} />
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </View>
  );
};

export const LoadingLayer: React.FC = () => {

  return (
    <View style={{backgroundColor: '#FFF'}}>
      <Text>Loading...</Text>
    </View>
  );
};

interface NotFoundItemProps {
  icon: SVGElement;
  text: string;
}

export const NotFoundItem: React.FunctionComponent<NotFoundItemProps> = (
  props: NotFoundItemProps,
) => {
  const {icon, text} = props;

  return (
    <>
      <View style={styles.notFoundContainer}>
        {icon}
        <Text style={styles.notFoundText}>{text}</Text>
      </View>
    </>
  );
};

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {IconButton} from '../icon-button';
import Option from '../../../assets/icons/option.svg';
import {styleVars} from '../../constance/style-variables';
import { DEFAULT_IMAGE } from '../../constance/link';

interface Props {
  onOptionClick?: () => void;
  onClick: () => void;
  image: string;
  name: string;
  artist?: string;
  isPlaylist?: boolean;
  theme?: string;
  hideOption?: boolean;
}

export const Item: React.FunctionComponent<Props> = (props: Props) => {
  const {
    onOptionClick,
    onClick,
    image,
    name,
    artist,
    isPlaylist = false,
    theme,
    hideOption = false,
  } = props;

  return (
    <>
      <View>
        <Pressable>
          <View>
            <View style={styles.container}>
              <Pressable style={styles.touchAreaOne} onPress={onClick}>
                <View style={styles.metadata}>
                  <Image source={{uri: image || DEFAULT_IMAGE}} style={styles.image} />
                  <View style={styles.titleGroup}>
                    <Text style={styles.title} numberOfLines={1}>
                      {name}
                    </Text>
                    {artist && (
                      <Text
                        style={[
                          styles.artist,
                          theme === 'light' && styles.artistLight,
                        ]}
                        numberOfLines={1}>
                        {artist}
                      </Text>
                    )}
                  </View>
                </View>
              </Pressable>
              {!isPlaylist && !hideOption && (
                <View style={styles.touchAreaTwo}>
                  <IconButton icon={Option} onClick={onOptionClick} />
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: -5,
    marginRight: -5,
  },
  metadata: {
    flexDirection: 'row',
  },
  touchAreaOne: {
    flex: 1,
    paddingRight: 10,
  },
  touchAreaTwo: {
    justifyContent: 'center',
    padding: 5,
  },
  image: {
    height: 55,
    width: 55,
  },
  titleGroup: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  title: {
    color: styleVars.white,
    fontSize: styleVars.baseFontSize,
  },
  artist: {
    color: styleVars.greyColor,
    fontSize: styleVars.smallFontSize,
  },
  artistLight: {
    color: styleVars.lightWhite,
  },
});

import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
} from 'react-native';
import {styleVars} from './../../../../shared/constance/style-variables';

interface Props {
  name: string;
  artist: string;
  onClick: () => void;
  image: string;
}

export const SongItem: React.FunctionComponent<Props> = (props: Props) => {
  const {name, artist, onClick, image} = props;

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.contentContainer} onPress={onClick}>
          <Image style={styles.image} source={{uri: image}} />
          <View style={styles.titleColumn}>
            <Text style={styles.song} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {artist}
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 7.5,
  },
  contentContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styleVars.lightPrimaryColor,
  },
  titleColumn: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  image: {
    height: 55,
    width: 55,
  },
  song: {
    fontSize: styleVars.baseFontSize,
    color: styleVars.white,
  },
  artist: {
    fontSize: styleVars.smallFontSize,
    color: styleVars.greyColor,
  },
});

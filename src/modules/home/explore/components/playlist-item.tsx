import React from 'react';
import {StyleSheet, Image, Text, Pressable} from 'react-native';

interface Props {
  title: string;
  onClick: () => void;
  image: string;
}

export const PlaylistItem: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Pressable style={styles.container} onPress={props.onClick}>
        <Image style={styles.image} source={{uri: props.image}} />
        <Text style={styles.title}>{props.title}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    overflow: 'hidden',
    width: 100,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    color: '#FFFFFF',
  },
});

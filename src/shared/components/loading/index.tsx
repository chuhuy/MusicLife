import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';

interface Props extends StateProps {}

const mapStateToProps = (state: any) => ({
  loading: state.loading.loading,
});

const {width, height} = Dimensions.get('window');

const LoadingComponent: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      {props.loading && <View style={styles.container}>
        <Image
          source={require('./../../../assets/gif/loading.gif')}
          style={styles.gif}
        />
      </View>}
    </>
  );
};

type StateProps = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, null)(LoadingComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: width,
    height: height,
    position: 'absolute',
    justifyContent: 'center',
  },
  gif: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});

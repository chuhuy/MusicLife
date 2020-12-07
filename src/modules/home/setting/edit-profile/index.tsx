import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Image, Pressable, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {changeDisplayName} from '../../../../api/authentication';
import I18n from '../../../../i18n';
import {BaseScreen} from '../../../../shared/components';
import {Screen} from '../../../../shared/constance/screen';
import {styles} from './styles';
import DefaultAvatar from '../components/default-avatar';
import {SET_DISPLAY_NAME} from './../../../../redux/modules/auth/actions';

interface Props extends StateProps, DispatchProps {
  navigation: any;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDisplayName: (display_name: string) =>
      dispatch({type: SET_DISPLAY_NAME, payload: {display_name}}),
  };
};

const mapStateToProps = (state: any) => ({
  display_name: state.auth.display_name,
  default_avatar: state.auth.default_avatar,
  image_url: state.auth.image_url,
});
const EditProfile: React.FunctionComponent<Props> = (props: Props) => {
  const navigation = useNavigation();

  const [name, setName] = useState<string>(props.display_name);
  const handleSaveName = () => {
    changeDisplayName(name)
      .then((response) => {
        if (response.status) {
          props.setDisplayName(name);
          navigation.navigate(Screen.Setting.Main);
        } else {
          Alert.alert(response.errorMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <BaseScreen isScroll={true}>
      <View style={styles.content}>
        {props.image_url === null ? (
          <>
            <DefaultAvatar size={250} type={props.default_avatar} />
          </>
        ) : (
          <>
            <Image source={props.image_url} style={styles.avatar} />
          </>
        )}
        <TextInput
          style={styles.input}
          defaultValue={name}
          onChangeText={(text) => setName(text)}
        />
        <Pressable onPressOut={handleSaveName}>
          <View style={styles.btn}>
            <Text style={styles.btn__title}>
              {I18n.translate('setting.save')}
            </Text>
          </View>
        </Pressable>
      </View>
    </BaseScreen>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

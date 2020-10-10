import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Button } from './../../../shared/components';
import { LOGOUT } from './../../../redux/modules/auth/actions';
import { connect } from 'react-redux';
import I18n from './../../../i18n';
import { changeLanguage } from './../../../i18n/utils';


interface Props extends DispatchProps {}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch({type: LOGOUT}),
    };
};

const Setting: React.FunctionComponent<Props> = (props: Props) => {

    const handleChangeLanguage = (language: string) => {
        changeLanguage(language);
    };

    const handleLogout = () => {
        props.logout();
    };

    return (
        <>
            <View style={styles.container}>
                <Text>{I18n.translate('setting.title')}</Text>
                <Button title="Vietnamese" onClick={() => handleChangeLanguage('vi')} />
                <Button title="English" onClick={() => handleChangeLanguage('en')} />
                <Button title="Logout" onClick={handleLogout} />
            </View>
        </>
    );
};

export default connect(null, mapDispatchToProps)(Setting);

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

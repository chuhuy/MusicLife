import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import I18n from './../../../../i18n';
import { styleVars } from './../../../../shared/constance/style-variables';
import * as Yup from 'yup';
import { LinkButton } from '../../../../shared/components';

const { width } = Dimensions.get('window');

interface Props {
    isShow: boolean,
    onHide: () => void
}

const AddPlaylistModal: React.FunctionComponent<Props> = (props: Props) => {
    const {isShow, onHide} = props;

    const initialFormValue = {
        name: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().trim()
        .max(50, "Playlist's name cannot exceed 50 characters")
        .required("Playlist's name cannot be empty"),
    });

    const handleAddPlaylist = (values: any) => {
        validationSchema.validate(values, {abortEarly: false})
        .then(() => {
            // Save playlist
            console.log(values);
            props.onHide();
        })
        .catch((errors) => {
            console.log(errors);
        });
    };

    return (
        <Modal
            useNativeDriver={true}
            onBackButtonPress={onHide}
            onBackdropPress={onHide}
            backdropOpacity={0.5}
            avoidKeyboard={true}
            isVisible={isShow}
        >
            <View style={styles.addPlaylistModal}>
                <Text style={styles.modalTitle}>{I18n.translate('personal.add-playlist')}</Text>
                <Formik
                    initialValues={initialFormValue}
                    onSubmit={(values) => {console.log(values.name)}}
                >
                    {({values, handleChange}) =>
                    <React.Fragment>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={styleVars.greyColor}
                            placeholder={I18n.translate('personal.add-playlist-placeholder')}
                            value={values.name}
                            onChangeText={handleChange('name')}
                        />
                        <View style={styles.buttonGroup}>
                            <LinkButton
                                color={styleVars.secondaryColor}
                                title={I18n.translate('personal.cancel')}
                                onClick={props.onHide}/>
                            <LinkButton
                                color={styleVars.secondaryColor}
                                title={I18n.translate('personal.save')}
                                onClick={() => handleAddPlaylist(values)}/>
                        </View>
                    </React.Fragment>}
                </Formik>
            </View>
        </Modal>
    );
};

export default AddPlaylistModal;

const styles = StyleSheet.create({
    addPlaylistModal: {
        width: width / 1.5,
        backgroundColor: styleVars.lightPrimaryColor,
        alignSelf: 'center',
        borderRadius: 20,
        padding: 15,
    },

    modalTitle: {
        marginBottom: 15,
        color: styleVars.white,
        fontWeight: '600',
        fontSize: styleVars.bigFontSize,
    },
    textInput: {
        color: styleVars.white,
        padding: 0,
        paddingBottom: 5,
        paddingRight: 5,
        borderBottomColor: styleVars.white,
        borderBottomWidth: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15
    },
});

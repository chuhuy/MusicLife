import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import * as Yup from 'yup';
import { createPlaylist } from '../../../../api/personal';
import { LinkButton } from '../../../../shared/components';
import I18n from './../../../../i18n';
import { styleVars } from './../../../../shared/constance/style-variables';

interface Props {
    access_token: string,
    isShow: boolean,
    onHide: () => void,
    getResult: (isError: boolean) => void,
}

const AddPlaylistModal: React.FunctionComponent<Props> = (props: Props) => {
    const {
        isShow,
        onHide,
        access_token,
        getResult,
    } = props;

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
                createPlaylist(access_token, values.name)
                    .then(() => {
                        getResult(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        getResult(true);
                    });
                onHide();
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
            isVisible={isShow}>
            <View style={styles.addPlaylistModal}>
                <Text style={styles.modalTitle}>{I18n.translate('personal.add-playlist')}</Text>

                <Formik
                    initialValues={initialFormValue}
                    onSubmit={(values) => {console.log(values.name)}}>
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
                            <View style={styles.touchArea}>
                                <LinkButton
                                    color={styleVars.greyColor}
                                    title={I18n.translate('personal.cancel')}
                                    onClick={onHide}
                                    position
                                />
                            </View>

                            <View style={{
                                height: '50%',
                                width: 1,
                                backgroundColor: styleVars.greyColor,
                            }}/>

                            <View style={styles.touchArea}>
                                <LinkButton
                                    color={styleVars.secondaryColor}
                                    title={I18n.translate('personal.save')}
                                    onClick={() => handleAddPlaylist(values)}
                                    position
                                />
                            </View>
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
        width: '80%',
        backgroundColor: styleVars.lightPrimaryColor,
        alignSelf: 'center',
        borderRadius: 20,
        padding: 15,
    },
    modalTitle: {
        marginBottom: 15,
        color: styleVars.white,
        fontWeight: '600',
        fontSize: styleVars.baseFontSize,
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
        alignItems: 'center',
        paddingTop: 20,
    },
    touchArea: {
        flex: 1,
    },
});

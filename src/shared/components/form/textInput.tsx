import React from 'react';
import { StyleSheet, View, Text, KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { styleVars } from '../../constance/style-variables';
import EyeShowIcon from '../../../assets/icons/eye-show-password.svg';
import EyeyHideIcon from '../../../assets/icons/eye-hide-password.svg';

interface Props {
    inputRef?: (ref: HTMLElement) => void,
    label: string,
    value: string,
    placeholder?: string,
    secureTextEntry?: boolean,
    keyboardType?: KeyboardTypeOptions,
    returnKeyType?: ReturnKeyTypeOptions,
    error?: string,
    onChangeText: (name: string) => void,
    onBlur: () => void,
    onToggleShowPassword?: () => void,
    onSubmitEditing?: () => void
}

const TextInputGroup: React.FunctionComponent<Props> = (props: Props) => {
    const { inputRef, label, secureTextEntry, onToggleShowPassword, error } = props;

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.textInputLabel}>{ label }</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    {...props}
                    ref={(r) => inputRef && inputRef(r)}
                    style={[styles.textInput, error ? styles.inputError : undefined]}
                    placeholderTextColor={styleVars.greyColor}
                />
                {
                    secureTextEntry !== undefined ? 
                        <View style={styles.textSecurity}>
                            <ShowPasswordButton 
                                onPress={onToggleShowPassword}
                                isPasswordShown={!secureTextEntry}
                            /> 
                        </View> : null
                }
            </View>
            { error ? 
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>
                        {error}
                    </Text>
                </View> : null}
        </View>
    )
}

export default TextInputGroup;

const styles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: styleVars.lightPrimaryColor,
        color: styleVars.white,
        borderRadius: 4,
        padding: 10,
        flex: 1,
    },
    inputError: {
        borderWidth: 1,
        borderColor: styleVars.redColor
    },
    textInputLabel: {
        fontSize: styleVars.baseFontSize,
        color: styleVars.white,
        marginBottom: 10,
    },
    textSecurity: {
        width: 24,
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        right: 5,
        zIndex: 10
    },
    errorContainer: {
        marginTop: 10
    }, 
    error: {
        color: styleVars.redColor
    }
});

// EyeIcon for password input
interface showPasswordButtonProps{
    onPress: () => void,
    isPasswordShown: boolean
}

const ShowPasswordButton: React.FunctionComponent<showPasswordButtonProps> = (props: showPasswordButtonProps) => {
    const { onPress, isPasswordShown } = props;

    return (
        <View style={styles.textSecurity}>
            <TouchableWithoutFeedback onPress = {onPress}>
                {
                    isPasswordShown ? 
                        <EyeShowIcon fill={styleVars.white} width={24} height={24} /> :
                        <EyeyHideIcon fill={styleVars.white} width={24} height={24} /> 
                }
            </TouchableWithoutFeedback>
        </View>
    )
}

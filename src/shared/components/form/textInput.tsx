import React from 'react';
import { KeyboardTypeOptions, Pressable, ReturnKeyTypeOptions, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import EyeyHideIcon from '../../../assets/icons/eye-hide-password.svg';
import EyeShowIcon from '../../../assets/icons/eye-show-password.svg';
import { styleVars } from '../../constance/style-variables';

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
                    secureTextEntry !== undefined && 
                    <ShowPasswordButton 
                        onPress={onToggleShowPassword}
                        isPasswordShown={!secureTextEntry}
                    /> 
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
        marginBottom: 15
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        backgroundColor: styleVars.lightPrimaryColor,
        borderRadius: 4,
        paddingHorizontal: 10
    },
    textInput: {
        flex: 1,
        color: styleVars.white,
        overflow: 'hidden'
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
        height: '100%',
        justifyContent: 'center',
        marginRight: -10
    },
    errorContainer: {
        marginTop: 10
    }, 
    error: {
        color: styleVars.redColor
    },
    eyeIcon: {
        padding: 10
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
            <Pressable onPress={onPress}>
                <View style={styles.eyeIcon}>
                    {
                        !isPasswordShown ? 
                            <EyeShowIcon fill={styleVars.white} width={24} height={24} /> :
                            <EyeyHideIcon fill={styleVars.white} width={24} height={24} /> 
                    }
                </View>
            </Pressable>
        </View>
    )
}

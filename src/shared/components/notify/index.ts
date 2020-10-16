import { Dimensions } from 'react-native';
import DefaultToast, { ToastOptions } from 'react-native-root-toast';
import { styleVars } from '../../constance/style-variables';

const { width } = Dimensions.get('window');

const mergeOptions = (options?: ToastOptions) =>
	Object.assign<ToastOptions, ToastOptions | undefined>(
		{
            containerStyle:{
                width: width - 40,
            },
            backgroundColor: styleVars.white,
            hideOnPress: true,
            opacity: 1,
            shadow: false,
            position: DefaultToast.positions.CENTER,
            visible: true,
		},
		options
	);

export const notifySuccess = (
    message: string,
    options?: ToastOptions | undefined
) => {
        DefaultToast.show(message, mergeOptions({
            ...options,
            textColor: styleVars.greenColor,
        }));
};

export const notifyError = (
    message: string,
    options?: ToastOptions | undefined
) => DefaultToast.show(message, mergeOptions({
    ...options,
    textColor: styleVars.redColor,
}));
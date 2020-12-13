import { Dimensions } from 'react-native';
import DefaultToast, { ToastOptions } from 'react-native-root-toast';
import { styleVars } from '../../constance/style-variables';

const { width } = Dimensions.get('window');

const mergeOptions = (options?: ToastOptions) =>
	Object.assign<ToastOptions, ToastOptions | undefined>(
		{
            containerStyle:{
                maxWidth: width - 40,
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderRadius: 10,
            },
            backgroundColor: styleVars.lightPrimaryColor,
            hideOnPress: true,
            opacity: 1,
            shadow: false,
            position: DefaultToast.positions.CENTER,
            visible: true,
            textStyle: {
                fontSize: styleVars.baseFontSize,
                color: styleVars.lightWhite,
                textAlign: 'left',
            },
		},
		options
    );

export const notify = (
    message: string,
    options?: ToastOptions | undefined
) => {
    DefaultToast.show(message, mergeOptions({
        ...options,
    }));
};

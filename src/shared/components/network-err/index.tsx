import React from 'react';
import { NotFoundItem } from '..';
import NetWorkErrIcon from '../../../assets/icons/no-wifi.svg';
import I18n from '../../../i18n';

export const NetworkErr: React.FC = () => {
    return (
        <NotFoundItem
            text={I18n.translate('common.network-err')}
            icon={<NetWorkErrIcon />}
        />
    );
};

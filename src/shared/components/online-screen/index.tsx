import React from 'react';
import { connect } from 'react-redux';
import { BaseScreen } from '../layout';
import { NetworkErr } from '../network-err';

interface Props extends StateProps {
    children: any,
    isScroll?: boolean,
};

const mapStateToProps = (state: any) => ({
    network: state.network,
  });

const OnlineScreen: React.FC<Props> = (props: Props) => {
    const { network, children, isScroll } = props;

    return (
        <BaseScreen isScroll={isScroll ? isScroll : false}>
            {network ? children : <NetworkErr />}
        </BaseScreen>
    );
};

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(OnlineScreen);

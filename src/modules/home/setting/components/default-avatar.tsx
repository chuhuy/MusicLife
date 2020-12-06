import React from 'react';

const DefaultAvatar1 = React.lazy(
  () => import('./../../../../assets/avatar/1.svg'),
);
const DefaultAvatar2 = React.lazy(
  () => import('./../../../../assets/avatar/2.svg'),
);
const DefaultAvatar3 = React.lazy(
  () => import('./../../../../assets/avatar/3.svg'),
);
const DefaultAvatar4 = React.lazy(
  () => import('./../../../../assets/avatar/4.svg'),
);
const DefaultAvatar5 = React.lazy(
  () => import('./../../../../assets/avatar/5.svg'),
);
const DefaultAvatar6 = React.lazy(
  () => import('./../../../../assets/avatar/6.svg'),
);
const DefaultAvatar7 = React.lazy(
  () => import('./../../../../assets/avatar/7.svg'),
);
const DefaultAvatar8 = React.lazy(
  () => import('./../../../../assets/avatar/8.svg'),
);
const DefaultAvatar9 = React.lazy(
  () => import('./../../../../assets/avatar/9.svg'),
);

interface Props {
  type: number;
  mini?: boolean;
}

const DefaultAvatar: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      {props.type === 1 && <DefaultAvatar1 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
      {props.type === 2 && <DefaultAvatar2 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
      {props.type === 3 && <DefaultAvatar3 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
      {props.type === 4 && <DefaultAvatar4 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
      {props.type === 5 && <DefaultAvatar5 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
      {props.type === 6 && <DefaultAvatar6 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
      {props.type === 7 && <DefaultAvatar7 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
      {props.type === 8 && <DefaultAvatar8 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
      {props.type === 9 && <DefaultAvatar9 height={props.mini ? 40 : 85} width={props.mini ? 40 : 85} />}
    </>
  );
};

export default DefaultAvatar;

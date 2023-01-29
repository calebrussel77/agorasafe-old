import {AvatarProps} from '@components/lib/avatar/avatar';

export const composeUniqueKey = (props: AvatarProps, index: number) => {
  if (props.key) {
    return props.key;
  }
  return index;
};

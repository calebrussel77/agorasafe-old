import Link from 'next/link';
import React, {FC} from 'react';

import {MenuItem} from '@components/lib/menu/menu';

import {Avatar, AvatarProps} from '../../avatar/avatar';

export interface AvatarGroupItemProps {
  avatar: AvatarProps;
  isActive?: boolean;
  isHover?: boolean;
  index: number;
  onAvatarClick?: React.MouseEventHandler<HTMLDivElement>;
}

const AvatarGroupItem: FC<AvatarGroupItemProps> = ({
  avatar,
  onAvatarClick,
  ...props
}) => {
  const {href, onClick, ref, ...rest} = avatar;

  const AvatarIcon = <Avatar {...rest} />;

  // onClick handler provided with avatar data takes precedence, same as with the normal avatar item
  const callback = onClick || onAvatarClick;

  if (href) {
    return (
      <Link href={href} onClick={callback}>
        <a
          rel={avatar.target === '_blank' ? 'noopener noreferrer' : undefined}
          {...props}
        >
          <MenuItem iconBefore={AvatarIcon}>{avatar.name}</MenuItem>
        </a>
      </Link>
    );
  }

  return (
    <MenuItem onClick={callback as any} iconBefore={AvatarIcon} {...props}>
      {avatar.name}
    </MenuItem>
  );
};

export {AvatarGroupItem};

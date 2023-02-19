import clsx from 'clsx';
import {Session} from 'next-auth';
import {FC} from 'react';
import {BsBell} from 'react-icons/bs';

import {Popover} from '@components/lib/popover/popover';
import {usePopoverState} from '@components/lib/popover/usePopoverState';

import {UserNotificationsMenu} from './user-notifications-menu/user-notifications-menu';

const UserNotificationsButton = () => {
  const {popover, hide} = usePopoverState({
    fitViewport: true,
    placement: 'bottom-end',
  });

  return (
    <>
      <Popover.Trigger
        {...{...popover, state: popover.state}}
        className={clsx('focus:ring-2 focus:ring-primary-500 rounded-full')}
        disclosure={
          <button title={`Click to open notifications menu`}>
            <BsBell className="h-6 w-6" />
          </button>
        }
      />
      <UserNotificationsMenu popover={popover} hide={hide} />
    </>
  );
};

export {UserNotificationsButton};

import { Avatar } from '@components/lib/avatar/avatar';
import { Popover } from '@components/lib/popover/popover';
import { usePopoverState } from '@components/lib/popover/usePopoverState';

import { UserConnectedMenu } from './user-connected-menu/user-connected-menu';

const UserConnectedButton = ({ session }) => {
  const { popover, hide } = usePopoverState({
    fitViewport: true,
    placement: 'bottom-end',
  });

  return (
    <>
      <Popover.Trigger
        {...{ ...popover, state: popover.state }}
        disclosure={
          <button title={`Click to open menu options`}>
            <Avatar
              src={session?.user?.avatar}
              size="md"
              name={session?.user?.name}
            />
          </button>
        }
      />
      <UserConnectedMenu popover={popover} hide={hide} />
    </>
  );
};

export { UserConnectedButton };

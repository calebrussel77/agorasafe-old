import {Avatar} from '@components/lib/avatar/avatar';
import {Popover} from '@components/lib/popover/popover';
import {usePopoverState} from '@components/lib/popover/usePopoverState';

import {UserConnectedMenu} from './user-connected-menu/user-connected-menu';

const UserConnectedButton = ({session}) => {
  const {popover, hide} = usePopoverState({
    fitViewport: true,
    placement: 'bottom-end',
  });

  return (
    <>
      <Popover.Trigger
        {...{...popover, state: popover.state}}
        className="rounded-full w-fit h-fit bg-gradient-to-b from-primary-500 to-secondary-700 p-0.5"
        disclosure={
          <button title={`Click to open menu options`}>
            <Avatar
              src={session?.user?.avatar}
              size="lg"
              name={session?.user?.name}
            />
          </button>
        }
      />
      <UserConnectedMenu popover={popover} hide={hide} />
    </>
  );
};

export {UserConnectedButton};

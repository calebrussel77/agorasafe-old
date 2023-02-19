import {userConnectedLinks} from '@components/layouts/header/navbar/user-connected-button/user-connected-menu/user-connected-menu';
import {MenuItem} from '@components/lib/menu/menu';

const Sidebar = () => {
  const headerElement = document.querySelector('header');
  const headerHeight = headerElement?.clientHeight;

  return (
    <div
      style={{top: `calc(${headerHeight} - 20px)`, position: 'fixed'}}
      className="w-[360px] px-4 sm:px-8 bg-white h-full border-r border-gray-300 overflow-hidden"
    >
      <div className="mt-6 flex flex-col gap-3">
        {userConnectedLinks.map(item => {
          return (
            <MenuItem
              key={item.title}
              href={item?.href}
              iconBefore={<item.Icon className="h-6 w-6 text-primary-500" />}
              description={item.description}
            >
              <p className="text-xl font-semibold">{item.title}</p>
            </MenuItem>
          );
        })}
      </div>
    </div>
  );
};

export {Sidebar};

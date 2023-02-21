import { HiOutlineSearch } from 'react-icons/hi';
import { HiArchiveBox, HiOutlinePencil } from 'react-icons/hi2';

import { Input } from '@components/lib/input/input';
import { MenuItem } from '@components/lib/menu/menu';
import { Modal } from '@components/lib/modal/modal';

const items = [
  {
    id: 1,
    name: 'Repudiandae in totam',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia facere, et dolor quae repudiandae in totam minus, deserunt impedit voluptatibus animi! ',
    url: '#',
    color: 'bg-indigo-500',
    icon: HiOutlinePencil,
  },
  {
    id: 2,
    name: 'Consectetur adipisicing',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia facere, et dolor quae repudiandae in totam minus, deserunt impedit voluptatibus animi! Eaque reiciendis tempora sapiente perspiciatis possimus sint qui.',
    url: '#',
    color: 'bg-purple-500',
    icon: HiOutlinePencil,
  },
  {
    id: 3,
    name: 'Formatting options',
    description: 'Add freeform text with basic formatting options.',
    url: '#',
    color: 'bg-green-500',
    icon: HiOutlinePencil,
  },
  {
    id: 4,
    name: 'Repudiandae in',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia facere, et dolor quae repudiandae in totam minus, deserunt impedit voluptatibus animi! Eaque reiciendis tempora sapiente perspiciatis possimus sint qui.',
    url: '#',
    color: 'bg-red-500',
    icon: HiOutlinePencil,
  },
  {
    id: 5,
    name: 'Depudiandae in',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quia facere, et dolor quae repudiandae in totam minus, deserunt impedit voluptatibus animi! Eaque reiciendis tempora sapiente perspiciatis possimus sint qui.',
    url: '#',
    color: 'bg-pink-500',
    icon: HiOutlinePencil,
  },
  {
    id: 6,
    name: 'Formatting options',
    description: 'Add freeform text with basic formatting options.',
    url: '#',
    color: 'bg-primary-500',
    icon: HiOutlinePencil,
  },
  // More items...
];

const GlobalSearchModal = ({ dialog, onCloseDialog, initialFocusRef }) => {
  return (
    <Modal
      state={dialog}
      onClose={onCloseDialog}
      portal
      hasCloseButton={false}
      initialFocusRef={initialFocusRef}
      className="md:w-[730px] 2xl:w-[750px]"
    >
      <Modal.Header>
        <div className="mx-2 -mb-1">
          <Input
            ref={initialFocusRef}
            type="search"
            className="bg-transparent border-none bg-gray-100 rounded-md focus:bg-gray-100 focus:ring-transparent focus:border-transparent h-12"
            placeholder="Recherchez un service..."
            iconBefore={<HiOutlineSearch className="h-6 w-6 text-gray-500" />}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <h3 className="text-sm font-semibold mb-2">Recherches récentes</h3>
        <MenuItem
          iconBefore={
            <div className={`p-2 rounded-lg bg-green-600 text-white`}>
              {<HiOutlinePencil className="h-6 w-6" />}
            </div>
          }
        >
          Formatting options
        </MenuItem>
        {/* <div>
            <MenuItem
              className="bg-primary-100"
              iconBefore={
                <div className={`p-2 rounded-lg bg-primary-600 text-white`}>
                  {<HiArchiveBox className="h-6 w-6" />}
                </div>
              }
              description={
                <p className="text-primary-500 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem quia facere, et dolor que.
                </p>
              }
            >
              <h3 className="font-bold text-primary-500">
                Créer une démande personalisée
              </h3>
            </MenuItem>
          </div> */}
        <div className="grid md:grid-cols-2 gap-3 pt-3 border-t my-3 border-t-gray-100">
          {items?.map(item => (
            <MenuItem
              key={item?.id}
              iconBefore={
                <div className={`p-2 rounded-lg ${item?.color} text-white`}>
                  {<item.icon className="h-6 w-6" />}
                </div>
              }
              description={item?.description}
            >
              {item?.name}
            </MenuItem>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { GlobalSearchModal };

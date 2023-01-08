import {CgSearch} from 'react-icons/cg';
import {IoMdSearch} from 'react-icons/io';
import {Else, If, Then} from 'react-if';

import {Button} from '@components/lib/button/button';
import {Input} from '@components/lib/input/input';

const GlobalSearch = ({isNavbarSearch = false}) => {
  return (
    <form action="#" className="w-full sm:flex items-center">
      <div className="w-full flex-1 flex items-center">
        <label htmlFor="whatSearch" className="sr-only">
          Rechercher un service
        </label>
        <Input
          id="whatSearch"
          style={{height: isNavbarSearch ? '40px' : '46px'}}
          className="rounded-r-none border-r-0 focus:ring-0 focus:border-slate-300"
          placeholder="Que cherchez-vous (Coiffeur, cordonnier, tailleur, frigoriste...) ?"
          iconBefore={
            !isNavbarSearch && <IoMdSearch className="h-6 w-6 text-gray-500" />
          }
        />

        <If condition={isNavbarSearch}>
          <Then>
            <Button
              style={{height: '40px'}}
              variant={'primary'}
              shape="square"
              className="w-auto rounded-r "
            >
              <CgSearch className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </Then>
          <Else>
            <Button
              style={{height: '46px'}}
              variant={'primary'}
              shape="square"
              className="w-auto rounded-r "
            >
              <span>Rechercher</span>
            </Button>
          </Else>
        </If>
      </div>
    </form>
  );
};

export {GlobalSearch};

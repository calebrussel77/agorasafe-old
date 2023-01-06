import {FaLocationArrow, FaSearch} from 'react-icons/fa';
import {IoMdLocate} from 'react-icons/io';

import {Button} from '@components/lib/button/button';
import {Input} from '@components/lib/input/input';

const GlobalSearch = () => {
  return (
    <form action="#" className="w-full">
      <div className="sm:flex items-center">
        <div className="w-full flex-1 flex items-center gap-2">
          <div className="w-full">
            <label htmlFor="whatSearch" className="sr-only">
              Email address
            </label>
            <Input
              id="whatSearch"
              size="lg"
              placeholder="Que cherchez-vous (Coiffeurs, salon de coiffure...) ?"
            />
          </div>
          <div className="w-full">
            <label htmlFor="locationSearch" className="sr-only">
              Location search
            </label>
            <Input
              id="locationSearch"
              size="lg"
              placeholder="Où (Adresses, villes...) ?"
              iconAfter={<IoMdLocate className="h-5 w-5 text-gray-500" />}
            />
          </div>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            <FaSearch className="h-6 w-6 hidden sm:block" />
            <span className="block sm:hidden">Rechercher</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export {GlobalSearch};

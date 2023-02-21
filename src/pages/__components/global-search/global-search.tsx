import { IoMdSearch } from 'react-icons/io';
import { TypeAnimation } from 'react-type-animation';

import { Button } from '@components/lib/button/button';
import { Input } from '@components/lib/input/input';

const GlobalSearch = ({ onClick }) => {
  return (
    <div className="w-full sm:flex items-center">
      <div
        onClick={onClick}
        className="cursor-pointer w-full flex-1 flex items-center relative"
      >
        <TypeAnimation
          sequence={[
            'Réparer mon frigot',
            1000,
            'Réparer ma chaussure',
            1000,
            'Coursier',
            1000,
            'Faire des tresses à domicile',
            1000,
            'Débroussailler un champs',
            1000,
            'Babysitting',
            1000,
            'Cours informatique',
            1000,
            'Ménage à domicile',
          ]}
          wrapper="div"
          cursor={true}
          repeat={Infinity}
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            display: 'flex',
            justifyContent: 'start',
            paddingLeft: '42px',
            zIndex: '20',
          }}
        />
        <Input
          id="whatSearch"
          style={{ height: '46px' }}
          className="rounded-r-none border-r-0 focus:ring-0 focus:border-slate-300 pointer-events-none"
          // placeholder="Que cherchez-vous (Coiffeur, cordonnier, tailleur, frigoriste...) ?"
          iconBefore={<IoMdSearch className="h-6 w-6 text-gray-500" />}
        />
        <Button
          style={{ height: '46px' }}
          variant={'primary'}
          shape="square"
          className="w-auto rounded-r "
        >
          <span>Rechercher</span>
        </Button>
      </div>
    </div>
  );
};

export { GlobalSearch };

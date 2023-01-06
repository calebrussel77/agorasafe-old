import {ImageUI} from '@components/lib/image-ui/image-ui';

import {CompanyLogos} from '../company-logos/company-logos';
import {GlobalSearch} from '../global-search/global-search';

const HeroSection = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
      <div className="mx-auto max-w-lg px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
        <div className="py-10 lg:py-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-10 sm:mt-5 lg:mt-2">
            <span className="block">
              Trouvez les meilleurs services freelance pour
            </span>
            <span className="block bg-gradient-to-r from-primary-500 to-secondary-600 bg-clip-text pb-3 text-transparent sm:pb-5">
              n'importe quel travail.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500">
            Localisez et prenez rendez-vous auprès de vos coiffeurs où que vous
            soyez et quand vous le souhaitez. Pour les professionels/amateurs de
            coiffure, nous facilitons votre réferencement sur le web tout en
            vous donnant la flexibilité de manager vos rendez-vous.
          </p>
          <div className="mt-8">
            <GlobalSearch />
            <div className="mt-10">
              <h3 className="uppercase text-xs mb-3 font-medium text-gray-500">
                Ils nous font confiance
              </h3>
              <CompanyLogos />
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-8 lg:py-16 px-12 lg:px-0">
        <div
          className="absolute inset-x-0 top-0 hidden h-1/2 lg:block"
          aria-hidden="true"
        />
        <div className="grid grid-cols-12">
          <div className="relative z-10 col-span-4 col-start-1 row-start-1 bg-transparent py-16">
            <ImageUI
              noNeedApiPrefix
              shape="rounded"
              className="h-80 lg:h-96 w-80 rounded-3xl object-cover object-center shadow-2xl"
              src="/images/coiffeur-visage-retourne.jpg"
              name="coiffure avec homme au visage retourné"
              alt="coiffure avec homme au visage retourné"
            />
          </div>
          <ImageUI
            noNeedApiPrefix
            shape="rounded"
            className="relative shadow-lg overflow-hidden col-span-10 col-start-3 row-start-1 grid grid-cols-10 items-center rounded-3xl"
            src="/images/coiffure-femme.jpg"
            name="coiffure dame"
            alt="coiffure dame"
          />
        </div>
      </div>
    </div>
  );
};

export {HeroSection};

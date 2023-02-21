import { useRef } from 'react';

import { GlobalSearchModal } from '@components/global-search-modal/global-search-modal';
import { useModalState } from '@components/lib/modal/modal';

import { CompanyLogos } from '../company-logos/company-logos';
import { GlobalSearch } from '../global-search/global-search';
import { HeroCarousselImages } from './hero-caroussel-images/hero-caroussel-images';

const HeroSection = () => {
  const dialog = useModalState();
  const initialFocusRef = useRef<any>(null);

  return (
    <section id="hero-section" className="relative pt-4 lg:overflow-hidden">
      <div className="mx-auto max-w-screen-2xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="mx-auto max-w-lg px-4 lg:mx-0 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:px-0 lg:text-left">
            <div className="py-10 lg:py-16">
              <h1
                id="home__primary__title"
                className="text-4xl sm:text-5xl font-bold tracking-tight leading-10 sm:mt-5 lg:mt-2"
              >
                <span className="block">
                  Trouvez les meilleurs services adaptés pour
                </span>
                <span className="block bg-gradient-to-r from-primary-500 to-secondary-600 bg-clip-text pb-3 text-transparent sm:pb-5">
                  n'importe quel travail.
                </span>
              </h1>
              <p className="w-full max-w-lg mx-auto lg:mx-0 text-base sm:text-lg text-gray-500">
                Recherchez facilement des prestataires près de chez vous, qui
                seront ravis d'éffectuer vos travaux à des coûts très accessible
              </p>
              <div className="mt-8">
                <div className="max-w-xl w-full">
                  <GlobalSearch onClick={dialog.show} />
                  <GlobalSearchModal
                    dialog={dialog}
                    initialFocusRef={initialFocusRef}
                    onCloseDialog={() => {}}
                  />
                </div>
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
            <HeroCarousselImages />
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };

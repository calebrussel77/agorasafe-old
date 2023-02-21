import { Button } from '@components/lib/button/button';
import { ImageUI } from '@components/lib/image-ui/image-ui';

export function CtaSection() {
  return (
    <section id="cta-section" className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-secondary-700 shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block">Prêt à nous rejoindre ?</span>
                <span className="block">
                  Commencer dès à présent et ce gratuitement.
                </span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-secondary-200">
                Rejoignez des millions de personnes en offrant vos services ou
                bénéficiant des services proposés par d'autres camerounais.
              </p>
              <Button variant="primary" className="mt-8">
                Commencez maintenant
              </Button>
            </div>
          </div>
          <ImageUI
            noNeedApiPrefix
            shape="rounded"
            className="w-full hidden lg:block h-[420px] transform translate-x-16 translate-y-16"
            src="/images/jeune-homme-joyeux.png"
            alt="App screenshot"
            name="App screenshot"
          />
        </div>
      </div>
    </section>
  );
}

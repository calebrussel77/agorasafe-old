import { Button } from '@components/lib/button/button';
import { ImageUI } from '@components/lib/image-ui/image-ui';

export function CtaSection() {
  return (
    <section id="cta-section" className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-secondary-700 shadow-xl md:grid md:grid-cols-2 md:gap-4">
          <div className="px-6 pt-10 pb-3 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="hidden sm:block">Prêt à nous rejoindre ?</span>
                <span className="block">
                  Commencer dès à présent et ce gratuitement.
                </span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-secondary-200">
                Rejoignez des millions de personnes en offrant vos services ou
                bénéficiant des services proposés par d'autres camerounais.
              </p>
              <Button variant="primary" className="my-8">
                Commencez maintenant
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <ImageUI
              shape="rounded"
              className="w-full h-[200px] md:h-[420px] transform md:translate-x-16 md:translate-y-16"
              src="/images/jeune-homme-joyeux.png"
              name="jeune-homme-joyeux"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

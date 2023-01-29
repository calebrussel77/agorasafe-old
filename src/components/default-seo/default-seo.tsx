import {DefaultSeo as DefaultNextSeo} from 'next-seo';
import Head from 'next/head';
import Script from 'next/script';

const DefaultSeo = () => {
  return (
    <>
      <DefaultNextSeo
        defaultTitle="Agorasafe - Trouvez les meilleurs services adaptés pour n'importe quel travail."
        titleTemplate="%s | Agorasafe"
        languageAlternates={[
          {href: 'https://www.agorasafe.com/', hrefLang: 'en'},
          {href: 'https://www.agorasafe.com/fr', hrefLang: 'fr'},
        ]}
        description="Recherchez facilement des prestataires près de chez vous, qui
    seront ravis d'éffectuer vos travaux à des coûts très
    accessible."
        openGraph={{
          type: 'website',
          locale: 'fr_FR',
          url: 'https://www.agorasafe.com/',
          images: [
            {
              url: 'https://res.cloudinary.com/lerussecaleb/image/upload/v1673026579/preview-agorasafe_mfysvz.png',
              width: 500,
              height: 500,
              alt: 'agorasafe preview',
              type: 'image/png',
            },
          ],
          site_name: 'agorasafe',
        }}
      />
      <Head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="agorasafe" />
        <meta name="apple-mobile-web-app-title" content="agorasafe" />
        <meta name="theme-color" content="#ffff" />
        <meta name="msapplication-navbutton-color" content="#ffff" />
        <meta name="author" content="Caleb russel" />
        <meta
          name="keywords"
          content="agorasafe, agora, services, à domicile, cameroun, vente en ligne, vente, shop"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-starturl" content="/" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6HRCBQQZHN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-6HRCBQQZHN');
        `}
      </Script>
    </>
  );
};

export {DefaultSeo};

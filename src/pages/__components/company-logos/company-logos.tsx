import { ImageUI } from '@components/lib/image-ui/image-ui';

const CompanyLogos = () => {
  return (
    <div className="grid grid-cols-4 gap-8 lg:grid-cols-5">
      <div className="col-span-1">
        <ImageUI
          className="h-6 w-full"
          src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
          name="Tuple"
          alt="Tuple"
        />
      </div>
      <div className="col-span-1">
        <ImageUI
          className="h-6 w-full"
          src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
          name="Mirage"
          alt="Mirage"
        />
      </div>
      <div className="col-span-1">
        <ImageUI
          className="h-6 w-full"
          src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
          name="StaticKit"
          alt="StaticKit"
        />
      </div>
      <div className="col-span-1">
        <ImageUI
          className="h-6 w-full"
          src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
          name="Transistor"
          alt="Transistor"
        />
      </div>
    </div>
  );
};

export { CompanyLogos };

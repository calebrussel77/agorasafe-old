import { SectionError } from '@components/lib/error/section-error/section-error';
import { CenterContent } from '@components/lib/layout/center-content/center-content';
import { Spinner } from '@components/lib/spinner/spinner';

const ContentWrapper = ({ children, isLoading = false, error = null }) => {
  return (
    <div className="lg:ml-[380px] my-6 flex justify-center">
      <div className="px-6 max-w-7xl w-full">
        {isLoading ? (
          <CenterContent>
            <Spinner variant="primary" className="h-12 w-12" />
          </CenterContent>
        ) : error ? (
          <CenterContent>
            <SectionError error={error} />
          </CenterContent>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export { ContentWrapper };

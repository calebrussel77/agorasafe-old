import dynamic from 'next/dynamic';

// import {TypeAnimation} from 'react-type-animation';
import {Spinner} from '@components/lib/spinner/spinner';

// type quillEditorProps = React.ComponentProps<typeof TypeAnimation>;

const WordAutotype = dynamic<any>(() => import('./word-auto-type-instance'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full text-primary-500 items-center gap-2 justify-center p-3">
      <Spinner className="h-5 w-5" />
      <span>Loading...</span>
    </div>
  ),
});

export {WordAutotype};

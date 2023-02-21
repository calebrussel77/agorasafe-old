import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';

import { BtnSpinner } from '../spinner/spinner';

export type TEditorProps = React.ComponentPropsWithRef<typeof ReactQuill> & {
  className?: string;
  autoFocus?: boolean;
};

const Editor = dynamic<TEditorProps>(() => import('./editor-instance') as any, {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full text-primary-500 items-center gap-2 justify-center p-3">
      <BtnSpinner className="h-5 w-5" />
      <span>Loading...</span>
    </div>
  ),
});

export { Editor };

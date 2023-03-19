import dynamic from 'next/dynamic';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';

import { Spinner } from '../spinner/spinner';

export type TEditorProps = React.ComponentPropsWithRef<typeof DraftEditor> & {
  className?: string;
};

const Editor = dynamic<TEditorProps>(() => import('./editor-instance') as any, {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full text-primary-500 items-center gap-2 justify-center p-3">
      <Spinner className="h-5 w-5" />
      <span>Loading...</span>
    </div>
  ),
});

export { Editor };

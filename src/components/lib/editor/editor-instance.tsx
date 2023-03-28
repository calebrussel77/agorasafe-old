import { EditorState } from 'draft-js';
import { forwardRef, useState } from 'react';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';

import { cn } from '@helpers/misc';

const EditorInstance = forwardRef<any, any>(({ className, ...rest }, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    console.log(editorState);
  };

  return (
    <div
      ref={ref}
      {...rest}
      className={cn('border border-gray-200 rounded-xl bg-white', className)}
    >
      <DraftEditor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="px-2"
        onEditorStateChange={onEditorStateChange}
        hashtag={{}}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'APPLE', value: 'apple', url: 'apple' },
            { text: 'BANANA', value: 'banana', url: 'banana' },
            { text: 'CHERRY', value: 'cherry', url: 'cherry' },
            { text: 'DURIAN', value: 'durian', url: 'durian' },
            { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
            { text: 'FIG', value: 'fig', url: 'fig' },
            { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
            { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
          ],
        }}
      />
    </div>
  );
});

EditorInstance.displayName = 'EditorInstance';

export default EditorInstance;

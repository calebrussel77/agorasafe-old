import clsx from 'clsx';
import {EmojiStyle} from 'emoji-picker-react';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {BsEmojiLaughing} from 'react-icons/bs';
import ReactQuill from 'react-quill';
import {twMerge} from 'tailwind-merge';

import {Popover} from '../popover/popover';
import {usePopoverState} from '../popover/usePopoverState';
import {EditorEmoji} from './editor-emoji';
import {
  EditorToolbar,
  formats as defaultFormats,
  modules as defaultModules,
} from './editor-toolbar';

const data = [
  {id: 1, display: 'John Doe'},
  {id: 2, display: 'Jane Smith'},
  {id: 3, display: 'Bob Johnson'},
];

const renderImage = (url, name) =>
  `<img src="${url}" alt="emoji-icon" id="emoji-icone" />`;

const EditorInstance = forwardRef<any, any>(
  ({modules, formats, children, autoFocus, className, ...rest}, forwardRef) => {
    const isToolbarHidden = modules?.toolbar === false;
    const {popover, hide} = usePopoverState();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const quillRef = useRef(null);
    const editor = quillRef.current?.getEditor();

    useImperativeHandle(forwardRef, () => quillRef.current);

    const handleEmojiClick = emoji => {
      const emojiUrl = emoji?.getImageUrl(EmojiStyle.APPLE);
      const emojiName = emoji?.names[0];
      // editor?.insertText(selectedIndex, emoji.emoji);
      quillRef.current
        ?.getEditor()
        ?.clipboard?.dangerouslyPasteHTML(
          selectedIndex,
          renderImage(emojiUrl, emojiName)
        );
      editor?.setSelection(selectedIndex + 1);
    };

    return (
      <div
        id="editor__wrapper"
        className={twMerge(
          'max-w-lg w-full flex items-end py-2 border rounded-xl',
          className
        )}
      >
        <div>
          {!isToolbarHidden && <EditorToolbar />}
          <ReactQuill
            id="editor"
            ref={quillRef}
            modules={{
              ...defaultModules,
              ...modules,
            }}
            formats={{
              ...defaultFormats,
              ...formats,
            }}
            placeholder={'Write something awesome...'}
            {...rest}
          />
        </div>

        <div className="ml-2 space-x-2">
          <Popover.Trigger
            {...{...popover, state: popover.state}}
            onClick={() =>
              setSelectedIndex(
                quillRef.current.getEditor()?.getSelection()?.index || 0
              )
            }
            disclosure={
              <button
                className={clsx(
                  'hover:bg-gray-100 rounded-full p-1 transition duration-200',
                  popover?.state?.open ? 'bg-gray-100' : ''
                )}
              >
                <BsEmojiLaughing className="h-5 w-5" />
              </button>
            }
          />
          <EditorEmoji handleEmojiClick={handleEmojiClick} popover={popover} />
          {children}
        </div>
      </div>
    );
  }
);

EditorInstance.displayName = 'EditorInstance';

export default EditorInstance;

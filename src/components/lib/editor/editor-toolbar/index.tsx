import {Quill} from 'react-quill';
import {twMerge} from 'tailwind-merge';

import {Tooltip} from '@components/lib/tooltip/tooltip';

const atValues = [
  {id: 1, value: 'Fredrik Sundqvist'},
  {id: 2, value: 'Patrik Sjölin'},
];
const hashValues = [
  {id: 3, value: 'Fredrik Sundqvist 2'},
  {id: 4, value: 'Patrik Sjölin 2'},
];

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
];

Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  // clipboard: {
  //   matchVisual: false,
  // },
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ['@', '#'],
    source: function (searchTerm: any, renderList: any, mentionChar: any) {
      let values;

      if (mentionChar === '@') {
        values = atValues;
      } else {
        values = hashValues;
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i]);
        renderList(matches, searchTerm);
      }
    },
  },
  toolbar: {
    container: '#toolbar',
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
  'mention',
];

// Quill Toolbar component
export const EditorToolbar = () => (
  <div id="toolbar" className="mb-6">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="3">
        <option value="1">Title 1</option>
        <option value="2">Title 2</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-bold')} />}
      >
        Bold
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-italic')} />}
      >
        Italic
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-underline')} />}
      >
        Underline
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-strike')} />}
      >
        Strike
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-list')} value="ordered" />}
      >
        Ordered list
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-list')} value="bullet" />}
      >
        Bullet list
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-indent')} value="-1" />}
      >
        Indent at left
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-indent')} value="+1" />}
      >
        Indent at right
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-blockquote')} />}
      >
        Citations
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-link')} />}
      >
        Links
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-image')} />}
      >
        Images
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={<button className={twMerge('ql-video')} />}
      >
        Videos
      </Tooltip>
    </span>
    <span className="ql-formats">
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={
          <button className={twMerge('ql-undo')}>
            <CustomUndo />
          </button>
        }
      >
        Undo
      </Tooltip>
      <Tooltip
        mouseEnterDelay={200}
        offsetY={12}
        trigger={
          <button className={twMerge('ql-redo')}>
            <CustomRedo />
          </button>
        }
      >
        Redo
      </Tooltip>
    </span>
  </div>
);

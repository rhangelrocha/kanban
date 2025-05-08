import React, { useCallback, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';

interface Props {
  atValues?: { id: number; value: string }[] | Record<string, any>;
  onChange?: (value: string) => void;
  height?: string;
  toolbarOptions?: Record<string, any>;
  formatOptions?: string[];
  value?: string;
}

const Editor: React.FC<Props> = function (props: Props) {
  const { atValues, value, onChange, toolbarOptions, formatOptions } = props;
  const reference = useRef(null);

  const modules = {
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@'],
      source: useCallback(
        async (
          searchTerm: string,
          renderItem: (arg0: { id: number; value: string }[] | undefined, arg1: any) => void,
          mentionChar: string,
        ) => {
          let values;

          if (mentionChar === '@') {
            values = atValues;
          }

          if (searchTerm.length === 0) {
            renderItem(values as any, searchTerm);
          } else if (values) {
            const matches = atValues?.filter((item: any) =>
              item.value.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            renderItem(matches, searchTerm);
          }
        },
        [],
      ),
    },

    toolbar: toolbarOptions || [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['image', 'code-block', 'link'],
      [{ background: [] }],
      [{ color: [] }],
    ],
  };

  const formats = formatOptions || [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'code-block',
    'color',
    'background',
  ];

  return (
    <>
      <ReactQuill
        style={{ color: '#0B0E1E' }}
        theme="snow"
        ref={reference}
        modules={modules}
        onChange={onChange}
        formats={formats}
        value={value}
      />
    </>
  );
};

export default React.memo(Editor);
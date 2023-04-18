import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Dispatch, SetStateAction } from 'react';
interface CKEditorInputProps {
  onChange: (data: string) => void;
  errorsMessage?: string;
  data: string;
}

const CKEditorInput = ({
  onChange,
  errorsMessage,
  data,
}: CKEditorInputProps) => {
  return (
    <div className='form-control max w-xl w-full mt-4'>
      <label className='bg-gray-200 rounded-t-md'>
        <span className='ml-4'>Post Content</span>
      </label>
      <CKEditor
        data={data}
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'blockQuote',
            'link',
            'numberedList',
            'bulletedList',
            '|',
            'undo',
            'redo',
          ],
        }}
      />
      <p className='text-red-500'>{errorsMessage}</p>
    </div>
  );
};

export default CKEditorInput;

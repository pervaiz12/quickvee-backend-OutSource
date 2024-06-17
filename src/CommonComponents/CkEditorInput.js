import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Custom Upload Adapter Plugin
function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyLocalUploadAdapter(loader);
    };
}

// Custom Upload Adapter Class
class MyLocalUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    resolve({ default: reader.result });
                };

                reader.onerror = error => {
                    reject(error);
                };

                reader.readAsDataURL(file);
            }));
    }

    abort() {
        // Handle abort if necessary.
    }
}

const CkEditorInput = ({ value, onChange }) => {
    return (
        <div className="ckeditor">
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onInit={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(event, data);
                }}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin]
                }}
            />
        </div>
    );
};

export default CkEditorInput;

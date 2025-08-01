npm install --save @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic


npm install --save @ckeditor/ckeditor5-alignment

// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


# 컴포넌트  
<CKEditor
	editor={ ClassicEditor }
	config={{
	    placeholder: "내용을 입력하세요.",
	    toolbar: {
	        items: [
	            'undo', 'redo',
	            '|', 'heading',
	            '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
	            '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
	            '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
	            '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
	            '|', 'mediaEmbed',
	        ],
	        shouldNotGroupWhenFull: false
	    },
	    editorConfig: {
	        height: 500, // Set the desired height in pixels
	    },
	    alignment: {
	        options: ['left', 'center', 'right', 'justify'],
	    },
	    
	    // extraPlugins: [uploadPlugin]            // 업로드 플러그인
	}}
	data=""         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
	onReady={ editor => {
	    // You can store the "editor" and use when it is needed.
	    console.log( 'Editor is ready to use!', editor );
	} }
	onChange={ ( event, editor ) => {
	    const data = editor.getData();
	    console.log( { event, editor, data } );
	    setContent(data);
	} }
	onBlur={ ( event, editor ) => {
	    console.log( 'Blur.', editor );
	} }
	onFocus={ ( event, editor ) => {
	    console.log( 'Focus.', editor );
	} }
	/>
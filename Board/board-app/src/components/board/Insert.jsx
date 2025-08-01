import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './css/Insert.module.css'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// api
import * as fileAPI from '../../apis/files'

const Insert = ({onInsert}) => {

  // state
  const [ title, setTitle ] = useState('')
  const [ writer, setWriter ] = useState('')
  const [ content, setContent ] = useState('')
  const [ mainFile, setMainFile ] = useState(null)
  const [ files, setFiles ] = useState([])




  // 변경 이벤트 함수 
  const changeTitle = (e) => { setTitle(e.target.value)}
  const changeWriter = (e) => { setWriter(e.target.value)}
  const changeContent = (e) => { setContent(e.target.value)}
  const changeMainFile = (e) => { setMainFile(e.target.files[0])}
  const changeFiles = (e) => {  setFiles(e.target.files)}
  // 

  // 게시글 등록 함수 
  const onSumbit = () => { 
    // application/json
    // const data = { 
    //   'title' : title,
    //   'writer' : writer,
    //   'content' : content
    // }

    // multipart/form-data
    const formData = new FormData()
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)
    // 파일 데이터 세팅 
    if ( mainFile) formData.append('mainFile', mainFile)
    if( files ) { 
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        formData.append("files", file)
      }
    }
    const headers = { 'Content-Type' : 'multipart/form-data' }

    onInsert(formData, headers)
  }

  // 이미지 drag & drop 기능1
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return customUploadAdapter(loader);
    };
  } 

  // 이미지 drag & drop 기능2
  const customUploadAdapter = (loader) => {
        return {
          upload() {
            return new Promise( (resolve, reject) => {
              const formData = new FormData();
              loader.file.then( async (file) => {
                    console.log(file);
                    formData.append("pTable", 'editor');
                    formData.append("pNo", 0);
                    formData.append("type", 'SUB');
                    formData.append("data", file);  //파일 데이터

                    const headers = {
                        headers: {
                            'Content-Type' : 'multipart/form-data',
                        },
                    };
    
                    let response = await fileAPI.upload(formData, headers);
                    let data = await response.data;
                    let id = data.id;
                    console.log(`data : ${data}`);
                    

										// 이미지 렌더링
                    await resolve({
                        default: `http://localhost:8080/files/img/${id}`
                    })
                    
              });
            });
          },
        };
    };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>게시글 쓰기</h1>
        <table className={styles.table} border={1}>
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                {/* <input type="text" className='form-input'} /> */}
                {/* 
                    CSS modules의 클래스 선택자는 카멜케이스 쓰는 것이 관례
                                    CSS               JavaScript
                    * 카멜케이스 : .formInput   : ➡ { styles.formInput}
                    * 케밥케이스 : .form-input  : ➡ { styles.['form-input']}
                */}
                <input type="text" onChange={changeTitle} className={styles['form-input']} />
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>
                <input type="text" onChange={changeWriter} className={styles['form-input']} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {/* <textarea
                  cols={40}
                  rows={10}
                  onChange={changeContent}
                  className={styles['form-input']}
                ></textarea> */}
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
                      
                      extraPlugins: [uploadPlugin]            // 업로드 플러그인
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
              </td>
            </tr>
            <tr>
              <td>메인 파일</td>
              <td>
                <input type="file" onChange={changeMainFile} />
              </td>
            </tr>
            <tr>
              <td>첨부 파일</td>
              <td>
                <input type="file" onChange={changeFiles} multiple />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn-box">
          <Link to="/boards" className='btn'>목록</Link>
          <button className='btn' onClick={onSumbit}>등록</button>
        </div>
    </div>
  )
}

export default Insert

import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './css/Read.module.css'

const Read = ({board, fileList, onDownload}) => {
  

  // const fileList = [
  //   {id:'id1', originName:'파일명1', type:'MAIN', fileSize:'10028'},
  //   {id:'id2', originName:'파일명2', type:'MAIN', fileSize:'2028'},
  //   {id:'id3', originName:'파일명3', type:'MAIN', fileSize:'4028'},
  // ]

  // id 수정에 넘기기 위한 값 저장 
  const { id } = useParams() 

  return (
    <div className="container">
      <h1 className={styles.title}>게시글 조회</h1>
      <form>
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
                {/* value VS defaultValue 

                - Controllered Component (상태관리 컴포넌트)
                * 상태들이 변경되면 UI 에 업데이트
                * value 값의 변경을 UI 업데이트 가능
                - Uncontrollered Component (컴포넌트)
                * 상태 변경 감지 안함
                * defaultValue 값은 초기에만 세팅
                */}

                <input type="text" defaultValue={board.title ?? ''} className={styles['form-input']} readOnly />
              </td>
            </tr>
            <tr>             
              <th>작성자</th>
              <td>
                <input type="text" defaultValue={board.writer ?? ''} className={styles['form-input']} readOnly />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <textarea
                  cols={40}
                  rows={10}
                  defaultValue={board.content ?? ''}
                  className={styles['form-input']} readOnly
                ></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                { 
                  fileList.map( (file) => (
                    <div className="flex-box" key={file.id}>
                      <div className="item">
                        <div className="item-img">
                          { file.type == 'MAIN' && <span className='badge'>대표</span> }
                          <img src={`/api/files/img/${file.id}`} alt={file.originName} className='file-img'/>
                        </div>
                        <span>{file.originName} ({file.fileSize})</span>
                      </div>
                      <div className="item">
                        <button className='btn' onClick={ () => onDownload(file.id, file.originName)}>다운로드</button>
                      </div>
                    </div>
                  ))
                }
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn-box">
          <Link to="/boards" className='btn'>목록</Link>
          <Link to={`/boards/update/${id}`} className='btn'>수정</Link>
        </div>
      </form>
    </div>
  )
}

export default Read
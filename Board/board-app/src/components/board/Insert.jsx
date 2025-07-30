import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './css/Insert.module.css'

const Insert = ({onInsert}) => {


  const [ title, setTitle ] = useState('')
  const [ writer, setWriter ] = useState('')
  const [ content, setContent ] = useState('')

  // 변경 이벤트 함수 
  const changeTitle = (e) => { setTitle(e.target.value)}
  const changeWriter = (e) => { setWriter(e.target.value)}
  const changeContent = (e) => { setContent(e.target.value)}

  // 게시글 등록 함수 
  const onSumbit = () => { 
    const data = { 
      'title' : title,
      'writer' : writer,
      'content' : content
    }
    const headers = { 'Content-Type' : 'application/json' }

    // TODO : onInsert() 전달 받아서 호출 
    onInsert(data, headers)
  }

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
                <textarea
                  cols={40}
                  rows={10}
                  onChange={changeContent}
                  className={styles['form-input']}
                ></textarea>
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

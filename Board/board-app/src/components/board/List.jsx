import React, { useEffect, useState } from 'react'
import { Link  } from 'react-router-dom'
// import './css/List.css'
import styles from './css/List.module.css'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import * as format from '../../utils/format'


const List = ({list, pagination}) => {

  // state
  const [pageList, setPageList] = useState([])

  // 페이지 번호 리스트 생성 
  const createPageList = () => { 
    let newPageList = [] 
    for (let i = pagination.start; i <= pagination.end; i++) {
      newPageList.push(i)
    }
    setPageList(newPageList)
  }
  useEffect(()=> { 
    createPageList()
  }, [pagination])


  return (
    <>
      <div className="container">
        <h1 className='title'>게시글 제목</h1>
        <Link to='/boards/insert' className='btn'>글쓰기</Link>

        {/* <table border={1} className='table'> */}
        <table border={1} className={`${styles.table}`}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일자</th>
            </tr>
          </thead>
          <tbody>
            {
            list.length == 0 
            ? 
            <tr>
              <td colSpan={4} align='center'>
                조회된 데이터가 없습니다.
              </td>
            </tr>
            :
            list.map( (board) => { return (
              <tr>
                <td>{board.no}</td>
                <td>
                  <Link to={`/boards/${board.id}`}>{board.title}</Link>
                </td>
                <td>{board.writer}</td>
                <td>
                  {format.formatDate(board.createdAt)}
                </td>
              </tr>
            )
            })

            }
          </tbody>

        </table>

        {/* 페이지네이션 */}
        <div className="pagination">
          <Link to={`/boards?page=${pagination.first}`} className='btn-page'>
          <KeyboardDoubleArrowLeftIcon />
          </Link>
          <Link to={`/boards?page=${pagination.prev}`} className='btn-page'>
          <KeyboardArrowLeftIcon />
          </Link>
          {
            pageList.map( page => (
              <Link to={`/boards?page=${page}&size=${pagination.size}`} 
                className={`btn-page ` + (page == pagination.page && 'active' )}
              >{page}
              </Link>
            ))
          }
          <Link to={`/boards?page=${pagination.next}`} className='btn-page'>
          <KeyboardArrowRightIcon />
          </Link>
          <Link to={`/boards?page=${pagination.last}`} className='btn-page'>
          <KeyboardDoubleArrowRightIcon />
          </Link>
        </div>
      </div>
    
    </>
  )
}

export default List
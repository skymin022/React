import React, { useEffect, useState } from 'react'
import Update from '../../components/board/Update'
import { useNavigate, useParams } from 'react-router-dom'
import * as boards from '../../apis/boards'


const UpdateContainer = () => {

  // URL 에서 id 값 가져오기 
  const { id } = useParams()
  const navigate = useNavigate()
  
  // state 데이터 갱신 
  const [board, setBoard] = useState({})

  // 게시글 조회 요청 
  const getBoard = async () => { 
    const response = await boards.select(id)
    const data = await response.data
    console.log(`board : ${data}`)
    console.dir(data)
    setBoard(data)
  }

  // 페이지 이동 


  // 게시글 수정 요청 핸들러
    const onUpdate = async ( data, headers ) => { 
      try {
        const response = await boards.update(data, headers)
        const msg = await response.data
        console.log(msg);
        alert('수정 완료')
        // 게시글 목록으로 이동 
       console.log('navigate 호출 전'); // 이게 안 찍히면 위에 문제 있음
navigate('/boards');
      } catch (error) {
        console.log(error);
         alert('오류 발생: ' + error.message); // 추가
      }
    }

  useEffect(() => { 
    // 게시글 정보
    getBoard()
  }, [])


  // 게시글 삭제 요청 
  const onDelete = async (id) => { 
    try {
      const response = await boards.remove(id)
      const data = await response.data
      console.log(data);
      alert('삭제 완료')
      console.log('navigate 호출 전'); // 이게 안 찍히면 위에 문제 있음
navigate('/boards');
    } catch (error) {
      console.log(error);
       alert('오류 발생: ' + error.message); // 추가
    }
  }

  return (
    <>
    <Update board={board} onUpdate={onUpdate} onDelete={onDelete}/>
    </>
  )
}

export default UpdateContainer
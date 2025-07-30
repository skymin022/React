import React, { useEffect, useState } from 'react'
import Read from '../../components/board/Read'
import { useParams } from 'react-router-dom'
import * as boards from '../../apis/boards'

const ReadContainer = () => {

  // URL 에서 id 값 가져오기 
  const { id } = useParams()
  
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

  useEffect(() => { 
    // 게시글 정보
    getBoard()
  }, [])
  

  return (
    <>
    <Read board={board}/>
    </>
  )
}

export default ReadContainer
import React, { use, useEffect, useState } from 'react'
import Read from '../../components/board/Read'
import { useParams } from 'react-router-dom'
import * as boards from '../../apis/boards'
import * as files from '../../apis/files'

const ReadContainer = () => {

  // URL 에서 id 값 가져오기 
  const { id } = useParams()
  
  // state 데이터 갱신 
  const [board, setBoard] = useState({})
  const [fileList, setFileList] = useState([])

  // 게시글 조회 요청 
  const getBoard = async () => { 
    const response = await boards.select(id)
    const data = response.data  // data : board, fileList
    console.log(`board : ${data}`)
    console.dir(data)
    setBoard(data.board)
    setFileList(data.fileList)
  }

  // 다운 로드 
  const onDownload = async (id, fileName) => { 
    // API 요청 
    const response = await files.download(id)
    console.log(response)

    // 1. 서버에서 응답 파일 데이터를 받은 Blob 변환
    // 2. 브라우저를 통해 a 태그로 등록 
    // 3. a 태그의 다운로드 기능으로 요청
    const url = window.URL.createObjectURL(new Blob( [response.data]))
    const link = document.createElement('a')  // a태그를 생성
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()                            // 다운로드 기능을 가진 a태그 클릭
    document.body.removeChild(link)
  }

  useEffect(() => { 
    // 게시글 정보
    getBoard()
  }, [])
  

  return (
    <>
    <Read 
    board={board} 
    fileList={fileList}/>
    onDownload={onDownload}
    </>
  )
}


export default ReadContainer
import React, { useEffect, useState } from 'react'
import List from '../../components/board/List'
import * as boards from '../../apis/boards'
import { useLocation } from 'react-router-dom'

const ListContainer = () => {
  // state 등록 
  const [pagination, setPagination] = useState({})
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  // 게시글 목록 데이터 
  const getList = async () => { 
    const response = await boards.list(page,size)
    const data = await response.data
    const list = data.list 
    const pagination = data.pagination
    console.dir(data)
    console.dir(data.list)
    console.dir(data.pagination)

    // 데이터 업데이트
    setList(list)
    setPagination(pagination)
  }

  // URL 가져오는 방법 
  const location = useLocation()

  // 페이지 번호 클릭시 업데이트 ➡ URL page 파라미터 변경 
  const updatePage = () => { 
    const query = new URLSearchParams(location.search)
    const newPage = query.get("page") ?? 1    // ?? 1 : null 인 경우 default 값 입력
    const newSize = query.get("size") ?? 10   // ?? 10 : null 인 경우 default 값 입력
    console.log(`newPage : ${newPage}`)
    console.log(`newSize : ${newSize}`)
    setPage(newPage)
    setSize(newSize)
  }

  // Hook 
  useEffect(() => { 
    getList()
  }, [page,size] )
  // 의존성 배열 [page, size] 
  // : page, size 바뀔 때마다 재실행 


  useEffect(()=> { 
    updatePage()
  }, [location.search])
  // URL 쿼리스트링이 바뀔 때 마다, 재실행 


  return (
    <>
      <List pagination={pagination} list={list} />
    </>
  )
}

export default ListContainer
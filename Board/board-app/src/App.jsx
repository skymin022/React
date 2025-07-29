import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useLocation, Navigate } from 'react-router-dom'
import ListContainer from './pages/List'
import ReadContainer from './pages/Read'
import InsertContainer from './pages/Insert'
import UpdateContainer from './pages/Update'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home /> }/>
        <Route path='/boards' element={ <List/>} />
        <Route path='/boards/:id' element={ <Read/>} />
        <Route path='/boards/insert' element={ <Insert/>} />
        <Route path='/boards/update' element={ <Update/>} />
      </Routes>
    </BrowserRouter>
  )
}




// board/:id
const Board = () => { 
  // useParams
  // : react-router v6 이상부터 사용 가능 
  // URL 경로의 정의된 파라미터를 가져오는 Hook
  const { id } = useParams()

  // ?파라미터= 값 가져오는 방법
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const category = query.get('category')
  const option = query.get('option')

  return  ( 
    <>
    <h1>게시판</h1>
    <h3>게시글 id : {id} </h3>
    <h3>파라미터 category : {category} </h3>
    <h3>파라미터 option : {option} </h3>
    <Link to='/'>home</Link>
    </>
  )
}


export default App
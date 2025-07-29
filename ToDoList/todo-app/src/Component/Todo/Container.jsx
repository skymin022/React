import { useEffect, useState } from 'react'
import Input from './Input'
import List from './List'
import Footer from './Footer'
import Header from './Header'

const Container = () => {
  // state
  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState([]);

  // 🟡 이벤트 함수 - 체크박스 토글 
  const onToggle = async (todo) => { 
    // 할일 여부 수정 요청 
    const data = { 
      ...todo, 
      status: !todo.status
    }
    const option = { 
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    }
    try {
      const url = 'http://localhost:8080/todos'
      const responst = await fetch(url, option)
      const msg = await responst.text()
      if ( msg == 'SUCCESS')
        console.log('할일 수정 성공')
      else
        console.log('할일 수정 실패')
      // 할일 목록 요청 
      getList()
    } catch (error) {
      console.error(error)
    }
  }
  
  // 🟡 이벤트 함수 - 할일 추가 - 변화 감지 
  const onChange = (e) => { 
    // e.target           : <input>
    // e.target.value     : input에서 입력한 value
    console.log(e.target.value)
    setInput(e.target.value)
  }

  // 🟡 이벤트 함수 - 할일 추가 - 서버 전달
  const onSubmit = async (e) => { 
    e.preventDefault()    // 기본 이벤트 동작 방지 - form 제출 방지 
    let name = input 
    if ( input =='' ) name = '제목없음'

    // 데이터 등록 요청 - js의 Object
    const data = { 
      name : name,  
      seq : 1
    }
    // 서버 옵션 지정 
    const option = { 
      method : 'POST', 
      headers : { 
        'Content-Type' : 'application/json'
      }, 
      body : JSON.stringify(data) // js Object --> HTTP --> server : json으로 변환 stringify
    }
    try {
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      const msg = await response.text() // SUCCESS or FAIL
      if ( msg == 'SUCCESS')
        console.log('할일 등록 성공')
      else
        console.log('할일 등록 실패')
      // 할일 목록 요청 
      getList()

      // 할일 입력 값 비우기 
      setInput('')
    } catch (error) {
      console.error(error)
    }
  }

  // 데이터 목록 요청 
  const getList = () => { 
    // 할일 목록 요청 
    const url = 'http://localhost:8080/todos'
    fetch(url)
      .then(response => response.json()) // json -> java 객체로 변환 
      .then(data => { 
        // data.list        : 할 일 목록 
        // data.pagination  : 페이지 정보
        setTodoList(data.list)
      })
      .catch(error => {
        console.error(error)
      })
  }

  // 할일 삭제 함수 
  const onRemove = async (id) => { 
    const option = { 
      method : 'DELETE', 
      headers : { 
        'Content-Type' : 'application/json'
      }
    }
    try {
      const url = `http://localhost:8080/todos/${id}`
      const response = await fetch(url, option)
      const msg = await response.text()
      if ( msg == 'SUCCESS')
        console.log('할일 삭제 성공')
      else
        console.log('할일 삭제 실패')
      // 할일 목록 요청 
      getList()
    } catch (error) {
      console.error(error)
    }
  }

  // hook - component가 mount, update될 때 ==> useEffect()를 사용 
  // 컴포넌트가 마운트되었을 때 할일 목록 요청 
  useEffect( ()=> { 
    getList()
  }, [])

  // 🟡 이벤트 함수 - 전체 삭제
  const onDeleteAll = async () => { 
    const url ='http://localhost:8080/todos/all'
    const option = { 
      method : 'DELETE'
    }
    try {
      const response = await fetch(url, option)
      const msg = await response.text()
      if ( msg == 'SUCCESS')
        console.log('전체 삭제 성공')
      else
        console.log('전체 삭제 실패')
      // 할일 목록 요청 
      getList()
    } catch (error) {
      console.error(error)
    }
  }

  // 🟡 이벤트 함수 - 전체 완료 
  const onCompletedAll = async () => { 
    const url ='http://localhost:8080/todos/all'
    const option = { 
      method : 'PUT'
    }
        try {
      const response = await fetch(url, option)
      const msg = await response.text()
      if ( msg == 'SUCCESS')
        console.log('전체 완료 성공')
      else
        console.log('전체 완료 실패')
      // 할일 목록 요청 
      getList()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container">
      <Header  />
      <Input input={input} onChange={onChange} onSubmit={onSubmit}  />
      <List todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
      <Footer onDeleteAll={onDeleteAll} onCompletedAll={onCompletedAll} />
    </div>
  )
}

export default Container
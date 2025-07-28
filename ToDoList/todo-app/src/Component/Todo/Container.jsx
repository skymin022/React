import React from 'react'
import Input from './Input'
import List from './List'
import Footer from './Footer'
import Header from './Header'

const Container = () => {
  return (
    <div className="container">
      <Header/>
      <Input/>
      <List/>
      <Footer/>
    </div>
  )
}

export default Container
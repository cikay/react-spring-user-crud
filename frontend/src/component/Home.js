import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Table from './Table'
export default function Home() {
  const history = useHistory()
  const handleClick = () => {
    history.push('/users/add')
  }
  return (
    <>
      <Button
        variant='success'
        type='submit'
        style={{ margin: '10px 0 15px 10px' }}
        onClick={handleClick}
      >
        Kullanıcı Ekle
      </Button>
      <Table />
    </>
  )
}


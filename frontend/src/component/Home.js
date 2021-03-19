import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Table from './Table'
import ModalForm from './ModalForm'
export default function Home() {
  const [modalShow, setModalShow] = React.useState(false)

  const history = useHistory()
  const handleOpen = () => {
    setModalShow(() => true)
  }
  const handleClose = () => {
    setModalShow(() => false)
  }
  return (
    <>
      <ModalForm show={modalShow} onHide={handleClose} actionName='Ekle' />
      <Button
        variant='success'
        type='submit'
        style={{ margin: '10px 0 15px 10px' }}
        onClick={handleOpen}
      >
        Kullanıcı Ekle
      </Button>
      <Table show={modalShow} onHide={handleClose} />
    </>
  )
}

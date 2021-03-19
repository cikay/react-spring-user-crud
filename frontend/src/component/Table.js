import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useUserContext } from '../context/UserContext'
import { useHistory } from 'react-router-dom'
import ModalForm from './ModalForm'
export default function CustomizedTable() {
  const { users } = useUserContext()

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th key='email'>Email</th>
            <th key='gsm'>Gsm</th>
            <th key='tckn'>Tckn</th>
            <th key='adress'>Adres</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return <Row key={user.id} user={user} index={index} />
          })}
        </tbody>
      </Table>
    </>
  )
}

function Row({ user, index }) {
  const { updateUser, deleteUser, getUserById } = useUserContext()

  const [modalShow, setModalShow] = useState(false)

  const history = useHistory()
  const handleDelete = async () => {
    await deleteUser(user.id)
  }

  const handleUpdate = async () => {
    await getUserById(user.id)
    history.push(`/users/edit/${user.id}`)
  }

  const handleOpen = () => {
    setModalShow(() => true)
  }
  const handleClose = () => {
    setModalShow(() => false)
  }
  return (
    <>
      <tr>
        <td key={index}>{index + 1}</td>
        <td key={user.email}>{user.email}</td>
        <td key={user.gsm}>{user.gsm}</td>
        <td key={user.tckn}>{user.tckn}</td>
        <td key={user.adress}>{user.adress}</td>
        <td key='btns'>
          <ModalForm
            onHide={handleClose}
            show={modalShow}
            user={user}
            actionName='Güncelle'
          />
          <Button variant='primary' onClick={handleOpen}>
            Güncelle
          </Button>{' '}
          <Button variant='danger' onClick={handleDelete}>
            Sil
          </Button>
        </td>
      </tr>
    </>
  )
}

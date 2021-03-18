import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useUserContext } from '../context/UserContext'
import { useHistory } from 'react-router-dom'
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
  const { updateUser, deleteUser } = useUserContext()

  const history = useHistory()
  const handleDelete = async () => {
    await deleteUser(user.id)
  }

  const handleUpdate = () => {
    history.push(`/edit/${user.id}`)
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
          <Button variant='primary' onClick={handleUpdate}>
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

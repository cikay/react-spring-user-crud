import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { userActions } from '../actions'
import { useUserContext } from '../context/UserContext'
import CenteredContainer from './CenteredComponent'

const defaultState = {
  email: '',
  gsm: '',
  tckn: '',
  adress: '',
  password: '',
}

export default function MyVerticallyCenteredModal({
  show,
  onHide,
  user,
  actionName,
}) {
  const { postUser, updateUser, getUserById, resetUser } = useUserContext()

  const [formData, setFormData] = useState(() => {
    if (user) {
      return user
    }
    return defaultState
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    console.log(value)
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (actionName === userActions.add) {
        const res = await postUser(formData)
      } else if (actionName === userActions.update) {
        const res = await updateUser(user.id, formData)
      }
      console.log('formData', formData)
      onHide()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Kullanıcı Ekle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email addresi</Form.Label>
            <Form.Control
              required
              type='email'
              id='email'
              onChange={handleChange}
              defaultValue={user ? user.email : ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gsm</Form.Label>
            <Form.Control
              required
              type='number'
              id='gsm'
              defaultValue={user ? user.gsm : ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tckn</Form.Label>
            <Form.Control
              required
              type='number'
              id='tckn'
              defaultValue={user ? user.tckn : ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Adres</Form.Label>
            <Form.Control
              required
              type='text'
              id='adress'
              display='inline'
              defaultValue={user ? user.adress : ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              required
              type='password'
              id='password'
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit' onClick={handleSubmit}>
            {actionName}
          </Button>{' '}
          <Button onClick={onHide}>İptal</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

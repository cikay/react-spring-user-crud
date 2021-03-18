import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useUserContext } from '../context/UserContext'
import { userActions } from '../actions'
import { useHistory } from 'react-router-dom'
const defaultState = {
  email: '',
  gsm: '',
  tckn: '',
  adress: '',
  password: '',
}
export default function AddUser({ actionName, user }) {
  const [formData, setFormData] = useState(defaultState)
  const { postUser, updateUser } = useUserContext()
  const history = useHistory()
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
      // setFormData(defaultState)
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  console.log('form', Form)

  return (
    <div style={{ margin: 'auto' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email addresi</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter email'
            id='email'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Gsm</Form.Label>
          <Form.Control
            required
            type='number'
            id='gsm'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Tckn</Form.Label>
          <Form.Control
            required
            type='number'
            id='tckn'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Adres</Form.Label>
          <Form.Control
            required
            type='text'
            id='adress'
            onChange={handleChange}
            display='inline'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Şifre</Form.Label>
          <Form.Control
            required
            type='password'
            id='password'
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          {actionName}
        </Button>{' '}
      </Form>
    </div>
  )
}

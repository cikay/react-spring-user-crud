import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useUserContext } from '../context/UserContext'
import { userActions } from '../actions'
import { useHistory, useParams } from 'react-router-dom'
const defaultState = {
  email: '',
  gsm: '',
  tckn: '',
  adress: '',
  password: '',
}
export default function UserForm({ actionName }) {
  const [formData, setFormData] = useState(defaultState)
  const {
    postUser,
    updateUser,
    user,
    getUserById,
    resetUser,
  } = useUserContext()

  const history = useHistory()
  const { id } = useParams()
  console.log('id', id)

  useEffect(async () => {
    if (id) {
      await getUserById(id)
    }
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
      // setFormData(defaultState)
      resetUser()
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ margin: 'auto' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email addresi</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter email'
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
        <Button variant='primary' type='submit'>
          {actionName}
        </Button>{' '}
      </Form>
    </div>
  )
}

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
export default function AddUser({ actionName }) {
  const [formData, setFormData] = useState(defaultState)
  const { postUser, updateUser, user, getUserById } = useUserContext()

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
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  console.log('user', user)

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
            defaultValue={user.email || ''}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Gsm</Form.Label>
          <Form.Control
            required
            type='number'
            id='gsm'
            onChange={handleChange}
            value={user ? user.gsm : ''}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tckn</Form.Label>
          <Form.Control
            required
            type='number'
            id='tckn'
            onChange={handleChange}
            value={user ? user.tckn : ''}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adres</Form.Label>
          <Form.Control
            required
            type='text'
            id='adress'
            onChange={handleChange}
            display='inline'
            value={user ? user.adress : ''}
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

import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
// const API_URL = process.env.REACT_APP_API_URL
const API_URL = 'http://localhost:8080'
const UserContext = React.createContext()
export const useUserContext = () => useContext(UserContext)
export function UserProvider({ children }) {
  const [state, setState] = useState({ users: [] })

  const [modalShow, setModalShow] = useState(false)
  const getUsers = async () => {
    console.log('url', API_URL)
    return await axios.get(`${API_URL}/users`)
  }

  const openModal = () => {
    setModalShow(true)
  }

  const closeModal = () => {
    setModalShow(false)
  }

  const postUser = async (payload) => {
    const res = await axios.post(`${API_URL}/create/`, payload)
    await getNewUsers()
  }

  const getNewUsers = async () => {
    const allUsers = await getUsers()
    console.log(allUsers)
    setState((prevState) => ({ ...prevState, users: allUsers.data }))
  }

  const updateUser = async (id, payload) => {
    const res = await axios.put(`${API_URL}/users/${id}`, payload)
    await getNewUsers()
  }

  const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL}/users/${id}`)
    await getNewUsers()
  }

  const getUserById = async (id) => {
    const res = await axios.get(`${API_URL}/users/${id}`)
    setState((prevState) => ({ ...prevState, user: res.data }))
  }

  const resetUser = () => {
    setState((prevState) => ({ ...prevState, user: '' }))
  }

  useEffect(async () => {
    const res = await getUsers()
    console.log(res)
    setState((prevState) => ({ ...prevState, users: res.data }))
  }, [])
  const value = {
    ...state,
    postUser,
    deleteUser,
    updateUser,
    getUserById,
    resetUser,
    openModal,
    closeModal,
    modalShow,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

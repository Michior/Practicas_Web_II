import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router'
import Modal from '../components/Modal'
import { useAppStore } from '../store/useAppStore'
import { Notifications } from '../components/Notifications'

export default function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage)
  useEffect(() => {
    loadFromStorage()
  }, [])
  
  return (
    <>
        <Header/>
        <Notifications/>
        <main className='mx-auto container py-16'>
            <Outlet/>
        </main>
        <Modal/>
    </>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/index.js`)
  const data = await res.json()
  
  return { props: { data }} 
  
}

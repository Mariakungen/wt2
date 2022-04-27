import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  //skriva js
  return (
    <div>Hello Pauliina</div>
  ) // skriva html
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/hello')
  const data = await res.json()
  
  return { props: { data }} 
  
}

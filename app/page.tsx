'use client'
import { styled } from 'styled-components'
// import type { NextPage } from 'next'

const Container = styled.div`
  &:hover {
    color: #fff;
  }
`

export default function Home() {
  return (
    <>
      <Container>Home</Container>
    </>
  )
}

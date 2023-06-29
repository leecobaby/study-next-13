'use client'
import tw, { styled } from 'twin.macro'
// import type { NextPage } from 'next'

const Container = styled.div`
  ${tw`text-center text-red-600`}

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

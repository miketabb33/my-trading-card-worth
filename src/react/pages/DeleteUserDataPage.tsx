import React from 'react'
import { PageLayout } from '../components/Layout'
import TextLink from '../components/base/TextLink'
import { PATH_VALUES } from '../router/pathValues'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10rem;
  gap: 2rem;
`

const DeleteUserDataPage = () => {
  return (
    <PageLayout>
      <Container>
        <h1>User Data Deletion</h1>
        <h2>Thanks for using the product!</h2>
        <h3>
          Email <a href="mailto:miketabb33@gmail.com">miketabb33@gmail.com</a>{' '}
          and request your data removal.{' '}
        </h3>
        <h3>
          On request, your personal data and trading card data will be removed
          from the system.
        </h3>
        <TextLink pathValue={PATH_VALUES.catalog()} label="Return to site" />
      </Container>
    </PageLayout>
  )
}

export default DeleteUserDataPage

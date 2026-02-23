import React from 'react'
import styled from 'styled-components'
import { useReleaseListData } from '../../network/releaseClient'
import { ApplicationReleaseDto } from '@core/network-types/release'
import MarkdownDescription from './MarkdownDescription'
import { CenterContent } from '../base/layout/CenterContent'
import Spinner from '../base/Spinner'
import ExternalTextLink from '../base/text-link/ExternalTextLink'

const Section = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
`

const Heading = styled.h1``

const DateLabel = styled.h2`
  margin-bottom: 1rem;
`

const Line = styled.div`
  height: 1px;
  width: 95%;
  background-color: ${({ theme }) => theme.staticColor.gray_400};
  margin-top: 2rem;
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

const ReleaseNotes = () => {
  const { releases, showReleases, showLoading, showError } = useInReleaseNotes()

  return (
    <div>
      <Heading>Release Notes</Heading>

      {showReleases && (
        <>
          {releases?.map((release, i) => (
            <Section key={release.date}>
              <DateLabel>{release.date}</DateLabel>
              <MarkdownDescription markdownString={release.descriptionMarkdown} />
              {i + 1 < (releases?.length || 0) && <Line />}
            </Section>
          ))}
          <Center>
            <ExternalTextLink href="https://github.com/tabb-labs/tcgvalor/releases">All Releases</ExternalTextLink>
          </Center>
        </>
      )}

      {showLoading && (
        <CenterContent>
          <Spinner />
        </CenterContent>
      )}

      {showError && (
        <>
          <Center>
            <h2>An error has occurred</h2>
            <ExternalTextLink href="https://github.com/tabb-labs/tcgvalor/releases">All Releases</ExternalTextLink>
          </Center>{' '}
        </>
      )}
    </div>
  )
}

const useInReleaseNotes = () => {
  const { data: releases, isLoading, errors } = useReleaseListData()

  const overriddenReleases: ApplicationReleaseDto[] =
    releases?.map((release) => {
      const formattedDate = new Date(release.date)

      return {
        date: formattedDate.toLocaleDateString('en-us', { month: 'long', day: 'numeric', year: 'numeric' }),
        descriptionMarkdown: release.descriptionMarkdown,
      }
    }) ?? []

  return {
    releases: overriddenReleases,
    showReleases: overriddenReleases.length > 0,
    showLoading: isLoading,
    showError: errors?.length ?? 0 > 0,
  }
}

export default ReleaseNotes

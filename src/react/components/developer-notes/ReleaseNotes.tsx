import React from 'react'
import styled from 'styled-components'
import { useReleaseListData } from '../../network/releaseClient'
import { ApplicationReleaseDto } from '../../../core/types/ApplicationReleaseDto'
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

const AllReleasesContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ReleaseNotes = () => {
  const { releases, showReleases, showLoading } = useInReleaseNotes()

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
          <AllReleasesContainer>
            <ExternalTextLink href="https://github.com/miketabb33/my-trading-card-worth/releases">
              All Releases
            </ExternalTextLink>
          </AllReleasesContainer>
        </>
      )}

      {showLoading && (
        <CenterContent>
          <Spinner />
        </CenterContent>
      )}
    </div>
  )
}

const useInReleaseNotes = () => {
  const { data: releases, isLoading } = useReleaseListData()

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
  }
}

export default ReleaseNotes

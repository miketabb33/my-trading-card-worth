import { Octokit } from '@octokit/rest'
import { ApplicationReleaseDto } from '../../../core/types/ApplicationReleaseDto'
import { ENV } from '../../env'

const octokit = new Octokit({ auth: ENV.GITHUB_TOKEN() })

export const ListReleases = async (): Promise<ApplicationReleaseDto[]> => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: 'miketabb33',
    repo: 'my-trading-card-worth',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    per_page: 6,
  })

  return response.data.map((releaseData) => {
    const release: ApplicationReleaseDto = {
      date: releaseData.published_at || '',
      descriptionMarkdown: releaseData.body || '',
    }
    return release
  })
}

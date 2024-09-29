import React from 'react'
import MarkdownDescription from './MarkdownDescription'

const FeatureConsiderations = () => {
  return (
    <div>
      <h1>Feature Considerations</h1>
      <MarkdownDescription markdownString={makeMarkdown()} />
    </div>
  )
}

export default FeatureConsiderations

const makeMarkdown = () => {
  const markdown = new FeatureMarkdown()

  markdown.addTitle('Collection')
  markdown.addBullets([
    'Support sub-collections (Binders). For example: a sub-collection of only Illustrated Pokemon cards.',
    'Pagination.',
    'Set completion tracker.',
  ])

  markdown.addTitle('Adding Cards To Collection')
  markdown.addBullets([
    'Support card conditions. For example: "Mint", "Good", "Heavily Played".',
    'Support card variations. For example: "Holographic", "Reverse Holo", "First Edition".',
    'Support individual card scanning via device camera.',
    'Support bulk card scanning via device camera. For example: scanning an entire physical binder page.',
  ])

  markdown.addTitle('Profile')
  markdown.addBullets([
    'Improve top right profile tag. Use image and drop down menu for name/email and logout.',
    'Add ability to edit profile details like: profile image, name, and email.',
  ])

  markdown.addTitle('Social')
  markdown.addBullets([
    'Ability to follow other users to see collections their collections.',
    'Ability to block other users.',
    'User to user messaging.',
    'Share collection settings. For example, hide email address.',
    'Add ability to edit profile details like: profile image, name, and email.',
  ])

  markdown.addTitle('Risk Mitigation')
  markdown.addBullets([
    "Store back up data of marketplace and Pokemon blueprints. If the source api disappears, most interactivity will be down. Storing a backup will allow interactivity to continue while I work on adding a new data source. **In this event, user's collections will be persisted, but the ability to add new cards and view prices will down until a solution is put into place.** PS: Adding a backup will also prevent the prices from needing to be reloaded, about a 30 min process, after each production deploy.",
  ])

  markdown.addTitle('Other')
  markdown.addBullets([
    'Add user ranked choice voting system to rapidly get feedback from users to determine which features to focus on next.',
  ])

  return markdown.print()
}

class FeatureMarkdown {
  private markdown = ''

  addTitle = (title: string) => {
    this.markdown += `# ${title}\r\n\r\n`
  }

  addBullets = (bullets: string[]) => {
    const section = bullets.map((b) => `- ${b}\r\n`).join('')
    this.markdown += `${section}\r\n`
  }

  print = (): string => {
    return this.markdown
  }
}

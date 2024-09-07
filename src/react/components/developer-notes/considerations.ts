import { Topic } from './Topics'

export const featureConsiderations: Topic[] = [
  {
    title: 'Collection',
    bulletPoints: [
      'Support sub-collections (Binders). For example: a sub-collection of only Illustrated Pokemon cards.',
      'Pagination.',
    ],
  },
  {
    title: 'Adding Cards To Collection',
    bulletPoints: [
      'Support card conditions. For example: "Mint" | "Good" | "Heavily Played".',
      'Support card variations. For example: "Holographic" | "Reverse Holo" | "First Edition".',
      'Support individual card scanning via device camera.',
      'Support bulk card scanning via device camera. For example: scanning an entire physical binder page.',
    ],
  },
  {
    title: 'Profile',
    bulletPoints: [
      'Improve top right profile tag. Use image and drop down menu for name/email and logout.',
      'Add ability to edit profile details like: profile image, name, and email.',
    ],
  },
  {
    title: 'Social',
    bulletPoints: [
      'Ability to follow other users to see collections their collections.',
      'Ability to block other users.',
      'User to user messaging.',
      'Share collection settings. For example, hide email address.',
      'Add ability to edit profile details like: profile image, name, and email.',
    ],
  },
  {
    title: 'Risk Mitigation',
    bulletPoints: [
      "Store back up data of marketplace and Pokemon blueprints. If the source api disappears, most interactivity will be down. Storing a backup will allow interactivity to continue while I work on adding a new data source. **In this event, user's collections will be persisted, but the ability to add new cards and view prices will down until a solution is put into place.** PS: Adding a backup will also prevent the prices from needing to be reloaded, about a 30 min process, after each production deploy.",
    ],
  },
  {
    title: 'Other',
    bulletPoints: [
      'Add user ranked choice voting system to rapidly get feedback from users to determine which features to focus on next.',
    ],
  },
]

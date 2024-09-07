import { Topic } from './Topics'

type Release = {
  version: string
  topics: Topic[]
}

const release_1_0_0: Release = {
  version: '1.0.0',
  topics: [
    {
      title: 'Catalog',
      bulletPoints: [
        'Add ability to search pokemon expansions.',
        'Add ability to add and remove cards from collection.',
      ],
    },
    {
      title: 'Collection',
      bulletPoints: [
        'Add ability to add and remove cards from collection.',
        'Display market value.',
        'Display amount of cards in collection.',
        'Add ability to share collection with others.',
        'Add ability to view collection in share mode.',
      ],
    },
    {
      title: 'Other',
      bulletPoints: [
        'Support user login.',
        'Display last updated date for pokemon card prices.',
        'Display last updated date for expansions.',
        'Add link to michael-tabb.com.',
        'Add link to donation.',
        'Add link to developer notes.',
        'Add link to privacy policy.',
      ],
    },
  ],
}

export const releases: Release[] = [release_1_0_0]

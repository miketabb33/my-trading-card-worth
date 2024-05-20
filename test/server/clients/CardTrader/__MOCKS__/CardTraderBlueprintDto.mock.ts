export const DEWGONG_SINGLE_BLUEPRINT_RESPONSE = {
  id: 111172,
  name: 'Dewgong',
  version: '25/102',
  game_id: 5,
  category_id: 73,
  expansion_id: 1472,
  fixed_properties: {
    collector_number: '025/102',
    pokemon_rarity: 'Uncommon',
  },
  editable_properties: [
    {
      name: 'condition',
      type: 'string',
      default_value: 'Near Mint',
      possible_values: [
        'Near Mint',
        'Slightly Played',
        'Moderately Played',
        'Played',
        'Poor',
      ],
    },
    {
      name: 'signed',
      type: 'boolean',
      default_value: 'false',
      possible_values: [true, false],
    },
    {
      name: 'altered',
      type: 'boolean',
      default_value: 'false',
      possible_values: [true, false],
    },
    {
      name: 'first_edition',
      type: 'boolean',
      default_value: 'false',
      possible_values: [true, false],
    },
    {
      name: 'pokemon_language',
      type: 'string',
      default_value: 'en',
      possible_values: ['en', 'nl', 'fr', 'de', 'it', 'pt', 'ru', 'es'],
    },
    {
      name: 'pokemon_reverse',
      type: 'boolean',
      default_value: 'false',
      possible_values: [true, false],
    },
  ],
  card_market_id: 273720,
  tcg_player_id: 42366,
  scryfall_id: null,
  image_url:
    'https://cardtrader.com/uploads/blueprints/image/111172/preview_dewgong-25-102-base-set.jpg',
  image: {
    url: '/uploads/blueprints/image/111172/dewgong-25-102-base-set.jpg',
    show: {
      url: '/uploads/blueprints/image/111172/show_dewgong-25-102-base-set.jpg',
    },
    preview: {
      url: '/uploads/blueprints/image/111172/preview_dewgong-25-102-base-set.jpg',
    },
    social: {
      url: '/uploads/blueprints/image/111172/social_dewgong-25-102-base-set.jpg',
    },
  },
  back_image: null,
}

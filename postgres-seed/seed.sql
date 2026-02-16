INSERT INTO game (name, created_at, updated_at)
VALUES ('Pokemon', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE
  pokemon_game_id INT;
  exp_id INT;
BEGIN
  SELECT id INTO pokemon_game_id FROM game WHERE name = 'Pokemon';

  -- Scarlet & Violet - Twilight Masquerade
  INSERT INTO expansion (game_id, name, image_url, number_of_cards, release_date, created_at, updated_at)
  VALUES (pokemon_game_id, 'Scarlet & Violet - Twilight Masquerade', 'https://archives.bulbagarden.net/media/upload/thumb/1/15/SV6_Logo_EN.png/150px-SV6_Logo_EN.png', 167, '2024-06-24T04:00:00Z', NOW(), NOW())
  RETURNING id INTO exp_id;

  INSERT INTO expansion_pokemon (expansion_id, abbreviation, series, expansion_type, expansion_number_in_series, number_of_secret_cards, symbol_url, bulbapedia_url, created_at, updated_at)
  VALUES (exp_id, 'TWM', 'Scarlet & Violet Series', 'Main Series Expansion', 6, 59, 'https://archives.bulbagarden.net/media/upload/6/65/SetSymbolTwilight_Masquerade.png', 'https://bulbapedia.bulbagarden.net/wiki/Twilight_Masquerade_(TCG)', NOW(), NOW());

  INSERT INTO expansion_platform_link (expansion_id, platform, external_id, created_at, updated_at)
  VALUES (exp_id, 'CARD_TRADER', '3674', NOW(), NOW());

  -- Scarlet & Violet - Temporal Forces
  INSERT INTO expansion (game_id, name, image_url, number_of_cards, release_date, created_at, updated_at)
  VALUES (pokemon_game_id, 'Scarlet & Violet - Temporal Forces', 'https://archives.bulbagarden.net/media/upload/thumb/d/d9/SV5_Logo_EN.png/150px-SV5_Logo_EN.png', 162, '2024-04-22T04:00:00Z', NOW(), NOW())
  RETURNING id INTO exp_id;

  INSERT INTO expansion_pokemon (expansion_id, abbreviation, series, expansion_type, expansion_number_in_series, number_of_secret_cards, symbol_url, bulbapedia_url, created_at, updated_at)
  VALUES (exp_id, 'TEF', 'Scarlet & Violet Series', 'Main Series Expansion', 5, 56, 'https://archives.bulbagarden.net/media/upload/thumb/3/33/SetSymbolTemporal_Forces.png/40px-SetSymbolTemporal_Forces.png', 'https://bulbapedia.bulbagarden.net/wiki/Temporal_Forces_(TCG)', NOW(), NOW());

  INSERT INTO expansion_platform_link (expansion_id, platform, external_id, created_at, updated_at)
  VALUES (exp_id, 'CARD_TRADER', '3605', NOW(), NOW());

  -- Scarlet & Violet - Obsidian Flames
  INSERT INTO expansion (game_id, name, image_url, number_of_cards, release_date, created_at, updated_at)
  VALUES (pokemon_game_id, 'Scarlet & Violet - ObsidianFlames', 'https://archives.bulbagarden.net/media/upload/thumb/b/bd/SV3_Logo_EN.png/150px-SV3_Logo_EN.png', 197, '2023-09-11T04:00:00Z', NOW(), NOW())
  RETURNING id INTO exp_id;

  INSERT INTO expansion_pokemon (expansion_id, abbreviation, series, expansion_type, expansion_number_in_series, number_of_secret_cards, symbol_url, bulbapedia_url, created_at, updated_at)
  VALUES (exp_id, 'OBF', 'Scarlet & Violet Series', 'Main Series Expansion', 3, 33, 'https://archives.bulbagarden.net/media/upload/thumb/3/3d/SetSymbolObsidian_Flames.png/40px-SetSymbolObsidian_Flames.png', 'https://bulbapedia.bulbagarden.net/wiki/Obsidian_Flames_(TCG)', NOW(), NOW());

  INSERT INTO expansion_platform_link (expansion_id, platform, external_id, created_at, updated_at)
  VALUES (exp_id, 'CARD_TRADER', '3371', NOW(), NOW());

  -- Scarlet & Violet - Paradox Rift
  INSERT INTO expansion (game_id, name, image_url, number_of_cards, release_date, created_at, updated_at)
  VALUES (pokemon_game_id, 'Scarlet & Violet - Paradox Rift', 'https://archives.bulbagarden.net/media/upload/thumb/7/7e/SV4_Logo_EN.png/150px-SV4_Logo_EN.png', 182, '2023-12-03T05:00:00Z', NOW(), NOW())
  RETURNING id INTO exp_id;

  INSERT INTO expansion_pokemon (expansion_id, abbreviation, series, expansion_type, expansion_number_in_series, number_of_secret_cards, symbol_url, bulbapedia_url, created_at, updated_at)
  VALUES (exp_id, 'PAR', 'Scarlet & Violet Series', 'Main Series Expansion', 4, 84, 'https://archives.bulbagarden.net/media/upload/thumb/f/fa/SetSymbolParadox_Rift.png/40px-SetSymbolParadox_Rift.png', 'https://bulbapedia.bulbagarden.net/wiki/Paradox_Rift_(TCG)', NOW(), NOW());

  INSERT INTO expansion_platform_link (expansion_id, platform, external_id, created_at, updated_at)
  VALUES (exp_id, 'CARD_TRADER', '3468', NOW(), NOW());

  -- Scarlet & Violet - 151
  INSERT INTO expansion (game_id, name, image_url, number_of_cards, release_date, created_at, updated_at)
  VALUES (pokemon_game_id, 'Scarlet & Violet - 151', 'https://archives.bulbagarden.net/media/upload/thumb/7/7c/151_Logo_EN.png/150px-151_Logo_EN.png', 165, '2023-10-22T04:00:00Z', NOW(), NOW())
  RETURNING id INTO exp_id;

  INSERT INTO expansion_pokemon (expansion_id, abbreviation, series, expansion_type, expansion_number_in_series, number_of_secret_cards, symbol_url, bulbapedia_url, created_at, updated_at)
  VALUES (exp_id, 'MEW', 'Scarlet & Violet Series', 'Special Expansion', 3.5, 42, 'https://archives.bulbagarden.net/media/upload/thumb/7/71/SetSymbol151.png/40px-SetSymbol151.png', 'https://bulbapedia.bulbagarden.net/wiki/151_(TCG)', NOW(), NOW());

  INSERT INTO expansion_platform_link (expansion_id, platform, external_id, created_at, updated_at)
  VALUES (exp_id, 'CARD_TRADER', '3403', NOW(), NOW());

  -- Scarlet & Violet - Paldean Fates
  INSERT INTO expansion (game_id, name, image_url, number_of_cards, release_date, created_at, updated_at)
  VALUES (pokemon_game_id, 'Scarlet & Violet - Paldean Fates', 'https://archives.bulbagarden.net/media/upload/thumb/9/90/PAF_Logo_EN.png/150px-PAF_Logo_EN.png', 91, '2024-02-26T05:00:00Z', NOW(), NOW())
  RETURNING id INTO exp_id;

  INSERT INTO expansion_pokemon (expansion_id, abbreviation, series, expansion_type, expansion_number_in_series, number_of_secret_cards, symbol_url, bulbapedia_url, created_at, updated_at)
  VALUES (exp_id, 'PAF', 'Scarlet & Violet Series', 'Special Expansion', 4.5, 154, 'https://archives.bulbagarden.net/media/upload/thumb/e/ea/SetSymbolPaldean_Fates.png/40px-SetSymbolPaldean_Fates.png', 'https://bulbapedia.bulbagarden.net/wiki/Paldean_Fates_(TCG)', NOW(), NOW());

  INSERT INTO expansion_platform_link (expansion_id, platform, external_id, created_at, updated_at)
  VALUES (exp_id, 'CARD_TRADER', '3561', NOW(), NOW());

END $$;

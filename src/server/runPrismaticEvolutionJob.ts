import Emailer from './Emailer'

const fetchStatus = () => {
  fetch(
    'https://www.bestbuy.com/site/pokemon-trading-card-game-scarlet-violet-prismatic-evolutions-elite-trainer-box/6606082.p?skuId=6606082'
  )
    .then((res) =>
      res.text().then((text) => {
        const arr = text
          .trim()
          .replace('\n', '')
          .split(' ')
          .filter((x) => x !== '')

        let anchorIndex = 0
        for (let i = 0; i < arr.length; i++) {
          const letter = arr[i]
          if (letter.includes('data-sku-id="6606082"')) {
            anchorIndex = i
          }
        }

        if (anchorIndex === 0) {
          sendEmail('Error: Unable to find anchor.')
        }

        const str = []
        for (let i = 0; i < 5; i++) {
          const item = arr[anchorIndex + i]
          str.push(item)
        }

        const chunk = str.join(' ').toLowerCase().replace('_', ' ')

        if (!chunk.includes('coming soon')) {
          sendEmail('Prismatic Evolution could be available at Best Buy.')
        } else {
          console.log('Prismatic Evolutions is coming soon')
        }
      })
    )
    .catch(console.error)
    .catch(console.dir)
}

const sendEmail = (text: string) => {
  Emailer.send({ to: 'miketabb33@gmail.com', subject: 'Prismatic Evolutions Update', text }).then().catch(console.error)
}

export const runPrismaticEvolutionJob = () => {
  setInterval(fetchStatus, 60_000 * 30)
}

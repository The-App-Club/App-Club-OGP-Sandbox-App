import { writeFileSync } from 'fs'
import path from 'path'

import { createCanvas, loadImage, registerFont } from 'canvas'

const createOGP = async (slug: string): Promise<void> => {
  const cacheAge = 7 * 24 * 60
  const WIDTH = 1280 as const
  const HEIGHT = 670 as const
  const DX = 0 as const
  const DY = 0 as const
  const canvas = createCanvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext('2d')

  const backgroundImage = await loadImage(
    path.resolve('./public/assets/ogp.png')
  )
  ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT)

  const fontPath = path.resolve('./public/fonts/NotoSansJP-Regular.otf')
  registerFont(fontPath, { family: 'Noto Sans Javanese' })

  ctx.font = '60px "Noto Sans Javanese"'
  ctx.fillStyle = '#000000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`こんにちわ`, WIDTH / 2, HEIGHT / 2)
  ctx.fillText(`${slug}ページ目です`, WIDTH / 2, HEIGHT / 2 + 100)

  const buffer = canvas.toBuffer()
  writeFileSync(path.resolve(`./public/generated/${slug}.png`), buffer)
}

export { createOGP }

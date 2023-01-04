import { Chance } from 'chance'
import { default as cuid } from 'cuid'

const createId = () => {
  return cuid()
}

const createIdBySeed = (seed: string) => {
  return Chance(seed).string({
    alpha: true,
    numeric: true,
    length: 10,
    casing: 'lower',
  })
}

export { createId, createIdBySeed }

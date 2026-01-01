export const boardFiles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const
export const boardRanks = [8, 7, 6, 5, 4, 3, 2, 1] as const

export type BoardFile = (typeof boardFiles)[number]
export type BoardRank = (typeof boardRanks)[number]
export type SquareId = `${BoardFile}${BoardRank}`

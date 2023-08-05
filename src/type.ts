export interface Block {
    x: number,
    y: number,
    revealed?: boolean,
    mine?: boolean,
    flagged?: boolean,
    adjacentMines?: number
}

export interface Game {
  status: "playing" | "end" | "ready",
  result: "won" | "lost" | "none",
  isGenerlate: boolean,
  bombNum: number
}


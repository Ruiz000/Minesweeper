// import { type Block,  } from "../type"

// export const utilsParams = {
//     HEIGHT : 10,
//     WIDTH :10
//   }

// export const utilsConst = {
//     direcitons : [
//         [1,1], [1,0], [1,-1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]
//       ],
//     adjacentColor : ["c-gray","c-green","c-lightblue","c-orange","c-violet","c-sky","c-fuchsia","c-pink"],
//     dev : true
//   }

//  export const adjacentColor = ["c-gray","c-green","c-lightblue","c-orange","c-violet","c-sky","c-fuchsia","c-pink"]


// export const board = Array.from({ length: utilsParams.WIDTH }, 
//     (_, x) => Array.from({ length : utilsParams.HEIGHT },
//     (_, y) : Block => ({
//       x, y , adjacentMines : 0 ,revealed: false, flagged: false })
//     )) 

// export function PlayerClick(event,item: Block) {
//     if(item.flagged) return
//     if(checkbomb(item.mine)) alert("bomb")
//     item.revealed = true
//     explodeZero(item)
//     //update view
//     let newItem = item
//     board[item.x][item.y] = newItem 
//     console.log(board[item.x][item.y])
//   }

// export function rightclick(event,item: Block) {
//     console.log(`You used rightclick`)
//     if(item.revealed) return
//     item.flagged = !item.flagged
//     let newItem = item
//     board[item.x][item.y] = newItem
//   }

//   function checkbomb( mine : boolean ) : boolean {
//     if(mine) return true
//     return false
//   }

//   function explodeZero( item : Block ) : void {
//     if(item.adjacentMines) return
//     getSibling(item).forEach((block) =>{
//     if(!block.revealed) {
//       if(!block.flagged) 
//         block.revealed = true
//         explodeZero(block)
//       }
//     })
//   }

//   function bombInit() : void {
//     for(const row of board) {
//       for(const item of row) {
//         item.mine = Math.random() < 0.1
//       }
//     }
//   }

//   function adjacentMinesCount() : void {
//     board.forEach((row,x)=> {
//       row.forEach((block,y) => {
//         if (block.mine) {return}
//         getSibling(block).forEach((item)=> {
//           if(item.mine) block.adjacentMines++
//         }) 
//       })
//     })
//   }

//   function getSibling(item: Block) : Block[] {
//     return utilsConst.direcitons.map(([dx,dy]) => {
//           let X = item.x + dx, Y = item.y + dy
//           if(boundary(X,Y)) { return undefined }
//           return board[X][Y]
//         }).filter(Boolean) as Block[]
//   }

//   function boundary(X: number, Y: number) : boolean {
//     if(X < 0 || X >= utilsParams.WIDTH || Y < 0 || Y >= utilsParams.HEIGHT)return true
//     return false
//   }

//   bombInit()
//   adjacentMinesCount()
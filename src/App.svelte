<script lang="ts">
import { type Block, type Game } from "./type"

export const utilsParams = {
    HEIGHT : 10,
    WIDTH :  10,
  }

export const utilsConst = {
    direcitons : [
        [1,1], [1,0], [1,-1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]
      ],
    adjacentColor : ["c-gray","c-green","c-lightblue","c-orange","c-violet","c-sky","c-fuchsia","c-pink"],
    dev : false
  }

const randomBomb = Math.random() * utilsParams.HEIGHT * utilsParams.WIDTH
const minBomb = Math.max(utilsParams.HEIGHT , utilsParams.WIDTH )

//  export const adjacentColor = ["c-gray","c-green","c-lightblue","c-orange","c-violet","c-sky","c-fuchsia","c-pink"]
const Game : Game = {
  status: "ready",
  result: "none",
  isGenerlate: false,
  bombNum : Math.round(Math.max(randomBomb,minBomb))
}

export const board = Array.from({ length: utilsParams.WIDTH }, 
    (_, x) => Array.from({ length : utilsParams.HEIGHT },
    (_, y) : Block => ({
      x, y , adjacentMines : 0 ,revealed: false, flagged: false })
    )) 

export function PlayerClick(event,item: Block) {
    if(Game.status == 'ready') {
      Game.status = "playing"
    }

    if(Game.status != 'playing' || item.flagged) return

    if(!Game.isGenerlate) {
      Game.isGenerlate = true
      bombInit(board,item,Game.bombNum )
    }

    item.revealed = true
    GameJudge(board,item)
    explodeZero(item)
    //update view
    let newItem = item
    board[item.x][item.y] = newItem 
  }

function GameJudge(board : Block[][],item: Block,rightClik = false) {
  if(item.mine && !rightClik) {
    Game.status = 'end'
    Game.result = "lost"
    alert("Boom! You're lost")
    return
  }
   // win in two situation
   // flage all the mine or just the mine left
  let flag = 0
  let step = 0
  const flatBoard = board.flat()
  flatBoard.forEach((item) => {
    if(item.flagged && item.mine) flag ++
    if(item.revealed && !item.mine) step++
  })
  const leftStep = utilsParams.HEIGHT * utilsParams.WIDTH - step
  console.log("leftStep: " + leftStep)
  console.log("flag: "+ flag)
  console.log("bomb: "+ Game.bombNum)
  if(flag == Game.bombNum || leftStep == Game.bombNum){
    Game.status = 'end'
    Game.result = 'won'
    console.log("Congratulation! You Won!")
  }
}


export function rightclick(event,item: Block) {
    console.log(`You used rightclick`)

    if(item.revealed || Game.status != 'playing' ) return
    item.flagged = !item.flagged
    GameJudge(board,item,true)
    let newItem = item
    board[item.x][item.y] = newItem
  }


  function explodeZero( item : Block ) : void {
    if(item.adjacentMines) return
    getSibling(item).forEach((block) =>{
    if(!block.revealed) {
      if(!block.flagged) 
        block.revealed = true
        explodeZero(block)
      }
    })
  }

  function bombInit(board : Block[][],item: Block,bombNum: number) : void {
    Array.from({ length: bombNum}, ()=> null).forEach(() => {
      let placed = false
      if(!placed) {
        place(board,item)
      }
    })
    adjacentMinesCount()
  }

  function place(board : Block[][],item : Block) {
    let x = Math.floor(Math.random() * utilsParams.WIDTH)
    let y = Math.floor(Math.random() * utilsParams.HEIGHT)
    let temp = board[x][y]
    if(Math.abs(temp.x - item.x) <=1 && Math.abs(temp.y - item.y) <= 1){
      return false
    } 
    if(temp.mine) {
      return false
    }
    temp.mine = true
    return true
  }

  function adjacentMinesCount() : void {
    let realBombNum = 0 
    board.forEach((row,x)=> {
      row.forEach((block,y) => {
        if (block.mine) {
          realBombNum ++
          return}
        getSibling(block).forEach((item)=> {
          if(item.mine) block.adjacentMines++
        }) 
      })
    })
    Game.bombNum = realBombNum
  }

  function getSibling(item: Block) : Block[] {
    return utilsConst.direcitons.map(([dx,dy]) => {
          let X = item.x + dx, Y = item.y + dy
          if(boundary(X,Y)) { return undefined }
          return board[X][Y]
        }).filter(Boolean) as Block[]
  }

  function boundary(X: number, Y: number) : boolean {
    if(X < 0 || X >= utilsParams.WIDTH || Y < 0 || Y >= utilsParams.HEIGHT)return true
    return false
  }

  
</script>

<main class="bg-warm-gray-100 h-screen p3">
  <div class="h-full text-center" >
    <h1 class="">Minesweeper</h1>

     <!-- board  -->
    <div class="w-full h-100 overflow-hidden">
      {#each board as row}
        <div class="flex justify-center align-center">
          {#each row as item}
          <button class="w-10 h-10  text-center hover-bg-gray border-1" 
          on:click={() => PlayerClick(event,item)} on:contextmenu|preventDefault={() => rightclick(event,item)}>
          {#if utilsConst.dev}
          {#if item.mine}
          <span class="c-red ">{'x'}</span>
          {:else if item.flagged}
          <span class="c-red "> { '^' } </span>
          {:else}
          <span class="{utilsConst.adjacentColor[item.adjacentMines]}"> {item.adjacentMines } </span>
          {/if}
  {:else}
          {#if item.mine && item.revealed}
          <span class="c-red ">{'x'}</span>
          {:else if item.flagged}
          <span class="c-red "> { '^' } </span>
          {:else if item.revealed}
          <span class="{utilsConst.adjacentColor[item.adjacentMines]} "> {item.adjacentMines } </span>
          {/if}
  {/if}
          </button>
          {/each}
        </div>
      {/each}
    </div>

  </div>
</main>

<style>
</style>

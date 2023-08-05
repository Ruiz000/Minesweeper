{#if parmas.utilsConst.dev}
        {#if item.mine}
        <span class="c-red ">{'x'}</span>
        {:else if item.flagged}
        <span class="c-red "> { '^' } </span>
        {:else}
        <span class="{parmas.utilsConst.adjacentColor[item.adjacentMines]}"> {item.adjacentMines } </span>
        {/if}
{:else}
        {#if item.mine && item.revealed}
        <span class="c-red ">{'x'}</span>
        {:else if item.flagged}
        <span class="c-red "> { '^' } </span>
        {:else if item.revealed}
        <span class="{parmas.utilsConst.adjacentColor[item.adjacentMines]} "> {item.adjacentMines } </span>
        {/if}
{/if}

<script>
  import { utilsConst } from "../config/logic";
       import DevView from "./DevView.svelte";
       import GameView from "./GameView.svelte";
       export let parmas
       export let item
</script>
{#if item.mine && item.revealed}
    <span class="c-red ">{'x'}</span>
    {:else if item.flagged}
    <span class="c-red "> { '^' } </span>
    {:else if item.revealed}
    <span class="{adjacentColor[item.adjacentMines]} "> {item.adjacentMines } </span>
{/if}

<script>
export let item
export let adjacentColor
</script>
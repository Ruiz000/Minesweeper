{#if item.mine}
    <span class="c-red ">{'x'}</span>
    {:else if item.flagged}
    <span class="c-red "> { '^' } </span>
    {:else}
    <span class="{adjacentColor[item.adjacentMines]}"> {item.adjacentMines } </span>
{/if}

<script>
export let item
export let adjacentColor
</script>
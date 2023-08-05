<script >
  import BtnContent from './BtnContent.svelte'
  export let parmas;
</script>

<div class="w-full h-100 overflow-hidden">
  {#each parmas.board as row}
    <div class="flex justify-center align-center">
      {#each row as item}
      <button class="w-10 h-10  text-center hover-bg-gray border-1" 
      on:click={() => parmas.PlayerClick(event,item)} on:contextmenu|preventDefault={() => parmas.rightclick(event,item)}>
        <BtnContent parmas={parmas} item={item}/>
      </button>
      {/each}
    </div>
  {/each}
</div>
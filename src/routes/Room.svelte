<script>
  import { TextField, Button } from 'svelte-materialify/src';

  import dataUtil from '../utils/dataUtil';

  import {processPlayerKey} from '../utils/playerUtil';

  let bid = 0;
  let data= dataUtil.getPlayer(1);

  function submitBid() {

  }
  
</script>
<style>
.ul-2-col {
  columns: 2;
}

.ma-5:first-of-type {
  margin-top: 0 !important;
}
</style>

<div class="d-flex justify-center mt-4 mb-4">
  {#await data}
    <p>Loading ...</p>
  {:then player}
    <div class="slide white-text d-flex align-stretch justify-space-between blue darken-3">
      <ul class="ul-2-col">
        {#each Object.entries(player) as [key, value]}
          <li class="ma-2 ma-2">{processPlayerKey(key)} : {value}</li>
        {/each}
      </ul>
    </div>
  {/await}
</div>
<div class="d-flex align-center justify-center">
  <TextField on:input={(e) => (bid = Number(e.target.value) || 0)} bind:value={bid}/>
  <Button on:click={submitBid}>Bid!</Button>
</div>
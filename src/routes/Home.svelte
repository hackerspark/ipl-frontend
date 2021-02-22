<script>
  import { Row, SlideGroup, SlideItem, Ripple, Button, Window, WindowItem, Icon} from 'svelte-materialify/src';
  import Player from '../components/Player.svelte';

  import dataUtil from '../utils/dataUtil';

  import {processPlayerKey} from '../utils/playerUtil';

  let data = dataUtil.getPlayers();

  let window;

  let interval;
  // $: {
  //   clearInterval(interval);
  //   interval = setInterval(window?.next, 5000);
  // }

</script>
<style>
  .slide {
    height: 400px;
}
.ul-2-col {
  columns: 2;
}

.ma-5:first-of-type {
  margin-top: 0 !important;
}
</style>

<!-- Carousel -->
{#await data}
  <p>Loading...</p>
{:then players}
  <Window bind:this={window}>
    {#each players as player}
      <WindowItem>
        <div class="slide white-text d-flex align-stretch justify-space-between blue darken-3">
          <ul class="ul-2-col">
            {#each Object.entries(player) as [key, value]}
              <li class="ma-5 ma-5">{processPlayerKey(key)} : {value}</li>
            {/each}
          </ul>
        </div>
      </WindowItem>
    {/each}
  </Window>
{/await}
<br />
<div class="d-flex justify-end">
  <Button class="ma-1 pa-1" on:click={window.previous}> &lt;&lt; </Button>
  <Button class="ma-1 pa-1" on:click={window.next}> &gt;&gt; </Button>
</div>

<!-- Overview -->
<!-- End Overview -->
<script>
  import { Datatable, rows } from 'svelte-simple-datatables';
  import { Button } from 'svelte-materialify/src';

  import dataUtil from '../utils/dataUtil';
  import {playerKeys} from '../lookups/playerMapping';

  import {keyToLabel} from '../utils/playerUtil';

  let data = dataUtil.getPlayers();

  const settings = {
      sortable: true,
      pagination: false,
      columnFilter: true,
  };

  function startBid(bid) {
      console.log(bid);
  }

</script>
<style>
th:first-child{width:72px;}
td{text-align:center;padding:4px 0} 
</style>

<div style="height:80vh;padding: 0 10px">
  {#await data}
    <p>Loading...</p>
  {:then players}
    <Datatable settings={settings} data={players}>
      <thead>
        {#each playerKeys as key}
          <th data-key="{key}">{keyToLabel(key)}</th>
        {/each}
        <th>Bidding</th>
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            {#each Object.values(row) as value}
              <td>{value}</td>
            {/each}
            <td>
              <Button on:click={()=> startBid(row)} class="ma-1">Start</Button>
              <Button on:click={()=> stopBid(row)} class="ma-1">Stop</Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </Datatable>
  {/await}
</div>

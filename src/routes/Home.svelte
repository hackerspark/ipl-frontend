<script>
  import { Datatable, rows } from 'svelte-simple-datatables';

  import dataUtil from '../utils/dataUtil';
  import {playerKeys} from '../lookups/playerMapping';

  import {keyToLabel} from '../utils/playerUtil';

  let data = dataUtil.getPlayers();

  const settings = {
      sortable: true,
      pagination: false,
      columnFilter: true,
  };

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
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            {#each Object.values(row) as value}
              <td>{value}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </Datatable>
  {/await}
</div>

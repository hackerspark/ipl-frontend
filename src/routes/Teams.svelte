<script>
  import { Datatable, rows } from 'svelte-simple-datatables';

  import dataUtil from '../utils/dataUtil';
  import {playerKeys} from '../lookups/playerMapping';
  import {teamKeys} from '../lookups/teamMapping';

  import {keyToLabel} from '../utils/teamUtil';

  let data = dataUtil.getTeams();

  const settings = {
      sortable: false,
      pagination: false,
      columnFilter: false,
  };

</script>
<style>
th:first-child{width:72px;}
td{text-align:center;padding:4px 0} 
</style>

<div style="height:80vh;padding: 0 10px">
  {#await data}
    <p>Loading...</p>
  {:then teams}
    <Datatable settings={settings} data={teams}>
      <thead>
        {#each teamKeys as key}
          {#if key !== 'players'}
            <th data-key="{key}">{keyToLabel(key)}</th>
          {/if}
        {/each}
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            {#each Object.values(row) as value}
              {#if typeof value !== 'object'}
                <td>{value}</td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </Datatable>
  {/await}
</div>

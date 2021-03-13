<script>
  import { onDestroy } from 'svelte';

  import { onMount } from 'svelte'

  import { TextField, Button } from 'svelte-materialify/src';

  import  bidplayeridstore  from '../stores/bidplayer';

  import  { currentbidsrecords }  from '../stores/currentbid';

  import  { currentbidplayerid }  from '../stores/currentbid';

  import dataUtil from '../utils/dataUtil';

  import {userStore} from '../stores/user';

  import {keyToLabel} from '../utils/playerUtil';

  let name;

  const unsubscribe = userStore.subscribe(value => {
    name = value;
  });

  let usern = name.username

  let bid = 0;

  let tempmessage;
  let message;
  // let messages = [];

  let messages;

  const unsubscribe2 = currentbidsrecords.subscribe(value => {
    messages = value;
  });

  let bidplayer=dataUtil.getPlayer(1);

  function sortByProperty(property){  
   return function(a,b){  
      if(a[property] > b[property])  
         return 1;  
      else if(a[property] < b[property])  
         return -1;  
  
      return 0;  
    }  
  }

  let playerIndex = 1;

  onMount(() => {

    bidplayeridstore.subscribe(currentMessage => {
      
      if (Object.keys(currentMessage).length > 0) {
          tempmessage = JSON.parse(currentMessage)


          console.log(tempmessage)

          if (("bid" in tempmessage)==true)
            {
             console.log("Getting current Bid Player");

             bidplayer = tempmessage.bid;
             currentbidplayerid.set(bidplayer)
          }
          else if (("bidvalue" in tempmessage)==true)
            {
              messages = [...messages, JSON.parse(currentMessage)];
              messages.sort(sortByProperty("bidvalue"));
              messages.reverse(sortByProperty("bidvalue"));
              console.log(messages)


              currentbidsrecords.set(messages)
              
          }
          else if (("reset" in tempmessage)==true)
            {

              console.log("Resetting the Bidding Room");
              messages = [];
              currentbidsrecords.set(messages)
              
          }
          
        }
        
    })

  })


    //let bidplayer_id = $bidplayerid

  // console.log({$bidplayerid})
  // send JSON to websocket server
  //$bidplayerid = { content: "to be saved", other_values: "all" };


  //console.log($bidplayerid)
  let data= dataUtil.getPlayer(playerIndex);

  function submitBid(bid) {



      bidplayeridstore.sendMessage(JSON.stringify({
                      bidvalue: bid,
                      bidteam: usern
                      }));
  }

onDestroy(unsubscribe);



</script>
<style>
.ul-2-col {
  columns: 2;
}

.ma-2:first-of-type {
  margin-top: 0 !important;
}
</style>

<div class="d-flex flex-column mt-4 mb-4">
  {#await bidplayer}
    <p>Loading ...</p>
  {:then player}
    <div class="white-text d-flex blue darken-3">
      <ul class="ul-2-col">
        {#each Object.entries(player) as [key, value]}
          <li class="ma-2 ma-2">{keyToLabel(key)} : {value}</li>
        {/each}
      </ul>
      <div class="d-flex justify-center align-center">
        <img src="/favicon.png"/>
      </div>
    </div>
  {:catch error}
    <h1>Bidding Yet To Start!</h1>
  {/await}
</div>
<div class="d-flex align-flex-start justify-center">
  <div style="width:50vw">
    <TextField on:input={(e) => (bid = Number(e.target.value) || 0)} bind:value={bid} outlined style="max-width:350px;">Bid</TextField>
    <Button on:click={()=> submitBid(bid)} class="ma-1">Confirm</Button>
  </div>
  <div>
    <h6>Top Bid</h6>
    <br/>
    <span class="body2">Team Name : Team Value</span>
    {#each messages as message}
      <p>

        {message.bidteam}    :   {message.bidvalue}
      </p>
    
    {/each}
  </div>

</div>
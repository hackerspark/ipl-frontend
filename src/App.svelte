<script>
  import { MaterialApp, AppBar, Icon, Button, Footer } from 'svelte-materialify/src';
  
  import Router, {location, push, replace} from 'svelte-spa-router';

  import routes from './routes';
  
  import { userStore } from './stores/user';
  
  import {footerLinks} from './lookups/footerLinks';

  import {titleLookup} from './lookups/titleLookup';
  
  // Route to homepage on route guard condition failure
  function conditionsFailed(event) {
    replace('/');
  }

  let title;

  $: title = titleLookup[$location] ?? "Invalid Link";

  $: document.title = title ? `${title}` : "Invalid Link";

</script>

<MaterialApp class="grey-bg">
  <!-- Top Bar -->
  <AppBar flat>
    <div slot="icon">
      <Button fab depressed on:click={() => push('/')}>
        <img src="favicon.png" alt="Home" class="w-40px"/>
      </Button>
    </div>
    <span slot="title">{title}</span>
    <div style="flex-grow:1;" />
    {#if $location !=='/login'}
      {#if $userStore.username}
        <Button on:click={() => push('/logout')} class="mr-5">Logout</Button>
      {:else}
        <Button on:click={() => push('/login')} class="mr-5">Login</Button>
      {/if}
    {/if}
  </AppBar>
  <!-- End Top Bar -->

  <!-- Route -->
  <Router {routes} on:conditionsFailed={conditionsFailed} />
  <!-- End Route -->

  <!-- Footer -->
  <Footer absolute padless class="justify-center flex-column">
    <!-- <div class="mt-2 mb-2">
      {#each footerLinks as link}
        <Button text rounded on:click={() =>push(link.url)}>{link.label}</Button>
      {/each}
    </div> -->
    <div class="lighten-1 pa-2 text-center" style="width:100%">
      2020 - <b>Trials</b>
    </div>
  </Footer>
<!-- End Footer -->
</MaterialApp>

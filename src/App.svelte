<script>
  import { MaterialApp, AppBar, Icon, Button, Footer,NavigationDrawer, Overlay, List, ListItem } from 'svelte-materialify/src';
  
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

  let active = false;

  function close() {
    active = false;
  }
  function open() {
    active = true;
  }

  function toggle() {
    active = !active;
  }

</script>

<MaterialApp class="grey-bg">
  <!-- Top Bar -->
  <AppBar flat>
    <div slot="icon">
      <Button fab depressed on:click={toggle}>
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
  <!-- Drawer -->
  <NavigationDrawer absolute {active}>
    <List>
      <ListItem>
      </ListItem>
    {#if $userStore.username}
      {#if $userStore.type === 'ADMIN'}
        <ListItem>
          <div on:click={() => push('/controlPanel')}>Control Panel</div>
        </ListItem>
        <ListItem>
          <div on:click={() => push('/teams')}>Teams</div>
        </ListItem>
      {:else}
        <ListItem>
          <div on:click={() => push('/')}>Home</div>
        </ListItem>
        <ListItem on:click={() => push('/room')}>
          <div>Bidding Room</div>
        </ListItem>
        <ListItem on:click={() => push('/myTeam')}>
          <div>My Team</div>
        </ListItem>
      {/if}
    {/if}
    </List>
  </NavigationDrawer>
  <Overlay {active} on:click={close} index={1} />
  <!-- End Drawer -->
  <!-- Route -->
  <Router {routes} on:conditionsFailed={conditionsFailed} />
  <!-- End Route -->

  <!-- Footer -->
  <Footer absolute padless class="justify-center flex-column z-index-0">
    <!-- <div class="mt-2 mb-2">
      {#each footerLinks as link}
        <Button text rounded on:click={() =>push(link.url)}>{link.label}</Button>
      {/each}
    </div>  -->
    <div class="lighten-1 pa-2 text-center" style="width:100%">
      2020 - <b>Trials</b>
    </div>
  </Footer>
<!-- End Footer -->
</MaterialApp>

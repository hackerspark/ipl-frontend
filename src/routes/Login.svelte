<script>
  import { Row, Col, TextField, Button } from 'svelte-materialify/src';
  import { replace } from 'svelte-spa-router';
  import {userStore} from '../stores/user';

  let username;
  let password;
  

  async function onSubmit() {
    let response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    let {type} = await response.json();

    userStore.update(user => ({
      username,
      password,
      type
    }));
    
    if(type === 'USER') {
      replace('/');
    } else {
      replace('/controlPanel');
    }
  }
</script>

<div class="mb-10 d-flex flex-column align-center justify-center mt-4">
  <TextField bind:value={username} outlined style="width:350px;">Username</TextField>
  <TextField type="password" bind:value={password} outlined style="width:350px;">Password</TextField>
  <Button name="submit" on:click={onSubmit} class="ma-5">Submit</Button>
</div>
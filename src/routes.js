import { get } from 'svelte/store';

import { wrap } from 'svelte-spa-router/wrap';

import Home from './routes/Home.svelte';
import Login from './routes/Login.svelte';
import Room from './routes/Room.svelte';
import ControlPanel from './routes/ControlPanel.svelte';
import NotFound from './routes/NotFound.svelte';

import {userStore} from './stores/user';

export default {
  '/': Home,
  '/login': Login,
  '/room': wrap({
    component: Room,
    conditions: [() => get(userStore).type === 'USER'],
  }),
  '/controlPanel': wrap({
    component: ControlPanel,
    conditions: [() => get(userStore).type === 'ADMIN'],
  }),
  '/logout': wrap({
    component: Home,
    conditions: [
      () => {
        userStore.update(user => ({
          username: undefined,
          password: undefined,
          type: undefined
        }));
        return false;
      }
    ]
  }),
  '*': NotFound,
};

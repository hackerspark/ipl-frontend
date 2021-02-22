const SERVER_ROOT = 'http://localhost:4000';

async function getPlayers() {
  let res = await fetch(`${SERVER_ROOT}/players`);
  return await res.json();
}

async function getPlayer(id) {
  let players = await this.getPlayers();
  return players.find(player => player.id === id);
}

export default { getPlayers, getPlayer };

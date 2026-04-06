export class GameState {
  constructor() {
    this.players = [];
    this.roles = {};
    this.votes = [];
    this.nights = [];
    this.day = 1;
    this.phase = "waiting";
  }
}

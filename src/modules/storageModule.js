export default class StorageModule {
  static anyStoredGames() {
    return !!localStorage.getItem('storedgames');
  }

  static getStoredGames() {
    return JSON.parse(localStorage.getItem('storedgames'));
  }

  static addGame(gameName, gameID) {
    let games = [];
    const gameObject = { gameName, gameID };
    if (this.anyStoredGames()) {
      games = this.getStoredGames();
      games.push(gameObject);
    } else {
      games.push(gameObject);
    }
    return localStorage.setItem('storedgames', JSON.stringify(games));
  }

  static deleteStoredGames() {
    return localStorage.removeItem('storedgames');
  }
}
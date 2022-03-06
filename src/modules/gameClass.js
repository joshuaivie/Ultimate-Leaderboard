import { addGameScore, generateGameID, getGameScores } from './apiInterface';

export default class Game {
  constructor(gameName, gameID) {
    this.gameName = gameName;
    this.gameID = gameID || Game.#getGameID(gameName);
  }

  static async #getGameID(gameName) {
    const gameIDRequest = await generateGameID(gameName);
    const gameID = gameIDRequest.result.replace(/Game with ID: /g, '').replace(/ added./, '').trim();
    return gameID;
  }

  async getScoreList() {
    const scoreListRequest = await getGameScores(this.gameID);
    return scoreListRequest.result;
  }

  async addScore(playerName, playerScore) {
    const addScoreRequest = await addGameScore(this.gameID, playerName, playerScore);
    return addScoreRequest.result;
  }
}
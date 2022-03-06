import { addGameScore, generateGameID, getGameScores } from "./apiInterface";

export default class Game {
  constructor(gameName, gameID) {
    this.gameName = gameName;
    this.gameID = gameID || this.#getGameID(gameName);
  }

  async #getGameID(gameName) {
    let gameIDRequest = await generateGameID(gameName);
    let gameID = gameIDRequest.result.replace(/Game with ID: /g, '').replace(/ added./, '').trim();
    return gameID;
  }

  async getScoreList() {
    let scoreListRequest = await getGameScores(this.gameID);
    return scoreListRequest.result
  }

  async addScore(playerName, playerScore) {
    let addScoreRequest = await addGameScore(this.gameID, playerName, playerScore);
    return addScoreRequest.result
  }
}
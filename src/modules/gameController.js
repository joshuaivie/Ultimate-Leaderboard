import {
  ScoreContainer,
  RefreshScoresButton,
  NewGameForm,
  NewGameNameInput,
  NewGameButton,
  AddScoreForm,
  PlayerNameInput,
  PlayerScoreInput,
} from './elements';
import {
  ShowNewGameOverlay, HideNewGameOverlay, SetGameName, GetScoreListHTML,
} from './gameHelpers';
import Game from './gameClass';
import StorageModule from './storageModule';

export default class GameController {
  constructor() {
    this.game = null;
    this.InitiateGame();
    this.ListenForGameRefresh();
    this.ListenForGameRestart();
    this.ListenForAddScore();
  }

  async InitiateGame(userInitiated = false) {
    if (!userInitiated && StorageModule.anyStoredGames()) {
      const { gameName, gameID } = StorageModule.getStoredGames()[0];
      this.game = new Game(gameName, gameID);
    } else {
      const gameName = await GameController.CollectGameName();
      this.game = new Game(gameName);
      StorageModule.deleteStoredGames();
      StorageModule.addGame(this.game.gameName, await this.game.gameID);
    }

    this.RenderGameScores(this.game);
    SetGameName(this.game.gameName);
  }

  async RenderGameScores(game = this.game) {
    const scoreListArray = await game.getScoreList();
    let scoresListHTML = '';
    scoreListArray.sort((a, b) => b.score - a.score).forEach((score, index) => {
      scoresListHTML += GetScoreListHTML(score, index);
    });
    ScoreContainer.innerHTML = scoresListHTML;
  }

  static async CollectGameName() {
    return new Promise((resolve) => {
      ShowNewGameOverlay();
      NewGameForm.onsubmit = (e) => {
        e.preventDefault();
        const newGameName = NewGameNameInput.value;
        if (!newGameName.trim()) {
          alert('Please enter a valid game name!');
        } else {
          HideNewGameOverlay();
          resolve(newGameName);
        }
      };
    });
  }

  ListenForGameRefresh() {
    RefreshScoresButton.onclick = (e) => {
      e.preventDefault();
      this.RenderGameScores();
    };
  }

  ListenForGameRestart() {
    NewGameButton.onclick = (e) => {
      e.preventDefault();
      this.InitiateGame(true);
    };
  }

  ListenForAddScore() {
    AddScoreForm.onsubmit = async (e) => {
      e.preventDefault();
      const playerName = PlayerNameInput.value;
      const playerScore = PlayerScoreInput.value;
      await this.game.addScore(playerName, playerScore);
      await this.RenderGameScores();
      PlayerNameInput.value = '';
      PlayerScoreInput.value = '';
    };
  }
}
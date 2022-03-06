import { GameName, NewGameOverlay } from './elements';

const ShowNewGameOverlay = () => {
  NewGameOverlay.style.display = 'flex';
};

const HideNewGameOverlay = () => {
  NewGameOverlay.style.display = 'none';
};

const SetGameName = (gameName) => {
  GameName.value = gameName;
};

const GetScoreListHTML = (score, index) => `
    <div class="position">
     ${index + 1}.
    </div>
    <div class="highscore-right">
      <div class="profile">
        <div class="avatar">
          <img src="https://avatars.dicebear.com/api/adventurer-neutral/${score.user}.svg" alt="${score.user}">
        </div>
        <div class="name">
          ${score.user}
        </div>
      </div>
      <div class="score">
        ${score.score} pts
      </div>
    </div>`;

export {
  ShowNewGameOverlay, HideNewGameOverlay, SetGameName, GetScoreListHTML,
};
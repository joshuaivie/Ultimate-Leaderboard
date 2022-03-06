const BaseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/`
const NewGamePath = `/games/`
const GameScoresPath = `/games/:id/scores/`

const getNewGameIDEndpoint = () => {
  const path = NewGamePath.substring(1)
  return { endpoint: `${BaseURL}${path}` }
}

const getScoreListEndpoint = (gameID) => {
  const path = GameScoresPath.substring(1).replace(/:id/g, gameID)
  return { endpoint: `${BaseURL}${path}` }
}

const getAddScoreEndpoint = getScoreListEndpoint;

export {
  getNewGameIDEndpoint,
  getScoreListEndpoint,
  getAddScoreEndpoint
}
import {
  getNewGameIDEndpoint,
  getScoreListEndpoint,
  getAddScoreEndpoint
} from './apiEndpoint'

const generateGameID = async (gameName) => {
  try {
    const url = getNewGameIDEndpoint().endpoint
    const data = { name: gameName }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return await response.json();

  } catch (error) {
    return error
  }
}

const getGameScores = async (gameID) => {
  try {
    const ID = await gameID
    const url = getScoreListEndpoint(ID).endpoint
    const response = await fetch(url)
    return await response.json();
  } catch (error) {
    return error
  }
}

const addGameScore = async (gameID, playerName, playerScore) => {
  try {
    const ID = await gameID
    const url = getAddScoreEndpoint(ID).endpoint
    const data = {
      user: playerName,
      score: playerScore
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return await response.json();

  } catch (error) {
    return error
  }
}

export {
  generateGameID,
  getGameScores,
  addGameScore,
}
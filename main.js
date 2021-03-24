import axios from "axios";

export class AdgameSDK {
  requester = null;
  gameId = "";
  constructor( ) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    console.log("urlParams",urlParams)
    const gameId = urlParams.get('gameId')
    const token =  urlParams.get('token')
    if(!gameId) {
      throw new Error(`Cần thêm vào url ở iframe ${window.location.href}?gameId=[gameId]`)
    }
    this.gameId  = gameId
    this.requester = axios.create({
      baseURL: "https://api-game.adgame.asia/",
      timeout: 5000,
      headers: {
        Authorization: token || '',
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.gameId = gameId;
  }
  getDataGame() {
    return this.requester.get(`api/game/${this.gameId}`).then(({ data }) => {
      return data;
    });
  }

  getGametoUser() {
    return this.requester.get(`api/game`).then(({ data }) => {
      return data;
    });
  }
  getGameForDashBoard({ search }) {
    return this.requester
      .get(`api/game/get-game-for-dashboard`)
      .then(({ data }) => {
        return data;
      });
  }

  addGameById(body) {
    return this.requester.post(`api/game`, body).then(({ data }) => {
      return data;
    });
  }

  updateGameById(body) {
    return this.requester
      .put(`api/game/${this.gameId}`, body)
      .then(({ data }) => {
        return data;
      });
  }
}
console.log("hello day la script adgame");
window.AdgameSDK = AdgameSDK;

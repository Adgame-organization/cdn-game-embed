import axios from "axios";

export class AdgameSDK {
  requester = null;
  gameId = "";
  constructor( ) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const gameId = urlParams.get('gameId')
    const token =  urlParams.get('token')
    if(!gameId) {
      throw new Error(`Cần thêm vào url ở iframe ${window.location.href}?gameId=[gameId]`)
    }

    this.gameId  = gameId
    this.requester = axios.create({
      baseURL: "https://api.adgame.club/",
      timeout: 5000,
      headers: {
        Authorization: token || '',
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.gameId = gameId;
  }
  
  addTrackingLog(gameId , body) {
    return this.requester.post(`/tracking-log/${this.gameId}`, body).then(({data}) => data)
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

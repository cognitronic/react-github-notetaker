var appConstants = require('../constants/appConstants');
var axios = require('axios');

var id = "fa812f295bc77bf3c80a";
var sec = "53deba49f8429bdf995cd33818cb84a3acfff641";
var param = "?client_id=" + id + "&client_secret=" + sec;

var githubUtils = {
  getBio: function(username){
    var url = "https://api.github.com/users/" + username + param;
    return axios.get(url);
  },
  getRepos: function(username){
    var url = "https://api.github.com/users/" + username + "/repos" + param;
    return axios.get(url);
  }
};

module.exports = githubUtils;
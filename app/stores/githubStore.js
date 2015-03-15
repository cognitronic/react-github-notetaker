/**
 * Created by Danny Schreiber on 3/15/2015.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = {
	user: '',
	bio: {},
	repos: []
};



function newUser(user){
	_state.user = user;
}

function setBio(bio){
	_state.bio = bio;
}

function setRepos(repos){
	_state.repos = repos;
}


var githubStore = objectAssign({}, EventEmitter.prototype,{
	addChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	},
	getUser: function(){
		return _state.user;
	},
	getBio: function(){
		return _state.bio;
	},
	getRepos: function(){
		return _state.repos;
	}
});



AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case appConstants.GITHUB_CHANGE_USER:
			newUser(action.data);
			githubStore.emit(CHANGE_EVENT);
			break;
		case appConstants.GITHUB_USER_BIO:
			setBio(action.data);
			githubStore.emit(CHANGE_EVENT);
			break;
		case appConstants.GITHUB_USER_REPOS:
			setRepos(action.data);
			githubStore.emit(CHANGE_EVENT);
			break;
		default:
			return true;
	}
});

module.exports = githubStore;
/**
 * Created by Danny Schreiber on 3/15/2015.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = {
	notes: [],
	user: ''
};

function addNote(note){
	_state.notes = _state.notes.concat(note);
}

function changeUser(user){
	_state = {
		user: user,
		notes: user.notes
	};
}

var notesStore = objectAssign({}, EventEmitter.prototype, {

	getState: function() {
		return _state;
	},
	addChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function(cb){
		this.on(CHANGE_EVENT, cb);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case appConstants.ADD_NOTE:
			addNote(action.data);
			notesStore.emit(CHANGE_EVENT);
			break;
		case appConstants.CHANGE_USER:
			changeUser(action.data);
			notesStore.emit(CHANGE_EVENT);
			break;
		default:
			return true;
	}
});



module.exports = notesStore;
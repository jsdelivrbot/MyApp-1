import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { LoadingProvider } from '../../providers/loading';
import { GroupAddPage } from '../group-add/group-add';
import { FormControl } from '@angular/forms';
import { GroupchatPage } from '../groupchat/groupchat';




/*
  Generated class for the Chats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
	groupsRef: any;
	groupList: any;
	filteredGroupList: any;
	peopleRef: any;
	peopleList: any;
	filteredPeopleList: any;
	chatType: string = "groups";

	

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
  	this.groupsRef = firebase.database().ref('/Weddings/0/weddingGroups');
  	this.groupsRef.on('value', groupList => {
  	let groups = [];
  		groupList.forEach( group => {
    		groups.push(group.val());
  		});
  		this.groupList = groups;
  		this.filteredGroupList = groups;
  	});

  	this.initializeGroups();
  	
  	this.peopleRef = firebase.database().ref('/Weddings/0/weddingPeople');
  	this.peopleRef.on('value', peopleList => {
  	let people = [];
  		peopleList.forEach( person => {
    		people.push(person.val());
  		});
  		this.peopleList = people;
  		this.filteredPeopleList = people;
  	});

  	this.initializePeople();

  }

  initializeGroups(): void {
  	this.groupList = this.filteredGroupList;
  }

  initializePeople(): void {
  	this.peopleList = this.filteredPeopleList;
  }

  ionViewDidLoad() {
    // loads list of groups when page loads
    setTimeout(() => {
      this.initializeGroups();
    }, 500);
  }

  goToGroupAddPage(){
  this.navCtrl.push(GroupAddPage);
  }

  goToGroupChat(group){
  this.navCtrl.push(GroupchatPage, { group: group });
  }

  searchGroups(searchGroupBar) {
  	// Reset items back to all of the items
  	this.initializeGroups();

  	// set searchedGroup to the value of the searchbar
  	var searchedGroup = searchGroupBar.srcElement.value;

  	// if the value is an empty string don't filter the items
  	if (!searchedGroup) {
    	return;
  	}
  	this.groupList = this.groupList.filter((group) => {
    	if(group.groupName && searchedGroup) {
      	if (group.groupName.toLowerCase().indexOf(searchedGroup.toLowerCase()) > -1) {
        	return true;
      	}
      	return false;
    	}
  	});
  }

  searchPeople(searchPeopleBar) {
  	// Reset items back to all of the items
  	this.initializePeople();


  	// set searchedGroup to the value of the searchbar
  	var searchedPeople = searchPeopleBar.srcElement.value;

  	// if the value is an empty string don't filter the items
  	if (!searchedPeople) {
    	return;
  	}
  	this.peopleList = this.peopleList.filter((person) => {
    	if(person.fullname && searchedPeople) {
      		if (person.fullname.toLowerCase().indexOf(searchedPeople.toLowerCase()) > -1) {
        		return true;
      		}
      		if (person.firstname.toLowerCase().indexOf(searchedPeople.toLowerCase()) > -1) {
        		return true;
      		}
      		if (person.lastname.toLowerCase().indexOf(searchedPeople.toLowerCase()) > -1) {
        		return true;
      		}
      		return false;
    	}
  	});
  }

}

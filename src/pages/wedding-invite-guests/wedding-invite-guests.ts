import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Contacts, ContactFieldType, ContactFindOptions } from 'ionic-native';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-wedding-invite-guests',
  templateUrl: 'wedding-invite-guests.html'
})
export class WeddingInviteGuestsPage {
	weddingData;
  public contacts = [];
  public contactsFromPhone = [];
  public nonNullContacts = [];
  public sortedContacts = [];
  public groupedContacts = [];
  public contactsForEmail = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public af: AngularFire) {
    this.weddingData = navParams.data.weddingData;
    this.contactsFromPhone = [{"_objectInstance":{"id":2,"rawId":null,"displayName":null,"name":{"givenName":"Paul","honorificSuffix":null,"formatted":"Paul Peyton","middleName":null,"familyName":null,"honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(843) 421-8381","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Golf Cart","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":3,"rawId":null,"displayName":null,"name":{"givenName":"Susan","honorificSuffix":null,"formatted":"Susan Pertik","middleName":null,"familyName":"Pertik","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"8502173259","pref":false,"id":0,"type":"mobile"}],"emails":[{"value":"test9@test9.com","pref":false,"id":0,"type":"home"},{"value":"test2@test2.com","pref":false,"id":1,"type":"home"},{"value":"test3@test3.com","pref":false,"id":2,"type":"work"}],"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"LM eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":4,"rawId":null,"displayName":null,"name":{"givenName":"Ryan","honorificSuffix":null,"formatted":"Ryan Gove","middleName":null,"familyName":null,"honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"6092903704","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lm Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":5,"rawId":null,"displayName":null,"name":{"givenName":"Scott","honorificSuffix":null,"formatted":"Scott Presnell","middleName":null,"familyName":"Presnell","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(850) 885-5849","pref":false,"id":0,"type":"work"},{"value":"(850) 217-9845","pref":false,"id":1,"type":"Blackberry"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":6,"rawId":null,"displayName":null,"name":{"givenName":"Michelle","honorificSuffix":null,"formatted":"Michelle Boss","middleName":null,"familyName":"Boss","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+19729480126","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":7,"rawId":null,"displayName":null,"name":{"givenName":"Mary","honorificSuffix":null,"formatted":"Mary Davenport","middleName":null,"familyName":null,"honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(214) 808-0328","pref":false,"id":0,"type":"mobile"}],"emails":[{"value":"test4@test4.com","pref":false,"id":0,"type":"home"}],"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Parents Neughbor","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":9,"rawId":null,"displayName":null,"name":{"givenName":"Charles","honorificSuffix":null,"formatted":"Charles Dorer","middleName":null,"familyName":"Dorer","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(321) 501-5216","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"LM Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":10,"rawId":null,"displayName":null,"name":{"givenName":null,"honorificSuffix":null,"formatted":"Kelly O'Conner","middleName":null,"familyName":null,"honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+13217951014","pref":false,"id":0,"type":"mobile"}],"emails":[{"value":"test5@test5.com","pref":false,"id":0,"type":"home"}],"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_10","type":"url","pref":"false"}],"categories":null,"urls":[{"value":"fb://profile/2020604","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":11,"rawId":null,"displayName":null,"name":{"givenName":null,"honorificSuffix":null,"formatted":"Mike Davita","middleName":null,"familyName":"Davita","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"8503987236","pref":false,"id":0,"type":"mobile"}],"emails":[{"value":"test1@test1.com","pref":false,"id":0,"type":"home"}],"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lockheed Eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":12,"rawId":null,"displayName":null,"name":{"givenName":"Lauren","honorificSuffix":null,"formatted":"Lauren Magee","middleName":null,"familyName":"Magee","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"19187082027","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_12","type":"url","pref":"false"}],"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":13,"rawId":null,"displayName":null,"name":{"givenName":"Gloria","honorificSuffix":null,"formatted":"Gloria Schiller","middleName":null,"familyName":"Schiller","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"5613749000","pref":false,"id":0,"type":"other"},{"value":"561 306 3519","pref":false,"id":1,"type":"other"}],"emails":null,"addresses":[{"pref":"false","locality":"Boynton Beach","region":"Fl","id":0,"postalCode":"33437","country":null,"type":"home","streetAddress":"10447 Utopia Circle E"}],"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_13","type":"url","pref":"false"}],"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":15,"rawId":null,"displayName":null,"name":{"givenName":"Kelly","honorificSuffix":null,"formatted":"Kelly Scarpitta","middleName":null,"familyName":"Scarpitta","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"13215068340","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":[{"value":"fb://profile/1196397081","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":16,"rawId":null,"displayName":null,"name":{"givenName":"Alan","honorificSuffix":null,"formatted":"Alan Johnson","middleName":null,"familyName":"Johnson","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+18178996123","pref":false,"id":0,"type":"mobile"}],"emails":[{"value":"test1@test1.com","pref":false,"id":0,"type":"home"}],"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lm Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":17,"rawId":null,"displayName":null,"name":{"givenName":"Jose","honorificSuffix":null,"formatted":"Jose Moralez","middleName":null,"familyName":"Moralez","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+14077613213","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Aspire","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":[{"value":"fb://profile/208702324","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":18,"rawId":null,"displayName":null,"name":{"givenName":"Cody","honorificSuffix":null,"formatted":"Cody Danials","middleName":null,"familyName":"Danials","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"18704031587","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_18","type":"url","pref":"false"}],"categories":null,"urls":[{"value":"fb://profile/153102048","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":19,"rawId":null,"displayName":null,"name":{"givenName":"Mark","honorificSuffix":null,"formatted":"Mark Mobley","middleName":null,"familyName":"Mobley","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4795303649","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"SWEPCO","department":null,"type":null}],"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_19","type":"url","pref":"false"}],"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":20,"rawId":null,"displayName":null,"name":{"givenName":"Amanda","honorificSuffix":null,"formatted":"Amanda Shae","middleName":null,"familyName":"Shae","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4699512976","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":[{"value":"fb://profile/16731083","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":22,"rawId":null,"displayName":null,"name":{"givenName":"Beth","honorificSuffix":null,"formatted":"Beth Ely","middleName":null,"familyName":"Ely","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4074932501","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":23,"rawId":null,"displayName":null,"name":{"givenName":"Tom","honorificSuffix":null,"formatted":"Tom Llewellyn","middleName":null,"familyName":"Llewellyn","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4848242115","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lm Eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":24,"rawId":null,"displayName":null,"name":{"givenName":"Matthew","honorificSuffix":null,"formatted":"Matthew Lombard","middleName":null,"familyName":"Lombard","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4692364843","pref":false,"id":0,"type":"mobile"},{"value":"4699951643","pref":false,"id":1,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_24","type":"url","pref":"false"}],"categories":null,"urls":[{"value":"fb://profile/8319690","pref":false,"id":0,"type":"profile"}]},"rawId":null}];
    // Contacts.find(['givenName', 'familyName', 'emails'], {filter: "", multiple: true}).then(data => {
    //   this.contactsFromPhone = data;
    //});
      for(var i = 0; i < this.contactsFromPhone.length; i++){
        this.contacts[i] = {
          firstName: this.contactsFromPhone[i]._objectInstance.name.givenName,
          lastName: this.contactsFromPhone[i]._objectInstance.name.familyName,
          email: this.contactsFromPhone[i]._objectInstance.emails
        };
        if(this.contacts[i].email == null){
          this.contacts.splice(i, 1);
        }
        else if(this.contacts[i].email != null && this.contacts[i].firstName == null && this.contacts[i].lastName == null){
          this.contacts[i] = {
            firstName: "",
            lastName: "Uknown",
            email: this.contacts[i].email[0].value
          };
        }
        else if(this.contacts[i].email != null && this.contacts[i].firstName == null){
          this.contacts[i] = {
            firstName: "",
            lastName: this.contacts[i].lastName,
            email: this.contacts[i].email[0].value
          };
        }
        else if(this.contacts[i].email != null && this.contacts[i].lastName == null){
          this.contacts[i] = {
            firstName: this.contacts[i].firstName,
            lastName: "Unknown",
            email: this.contacts[i].email[0].value
          };
        }
        else if(this.contacts[i].email != null && this.contacts[i].firstName != null && this.contacts[i].lastName != null){
          this.contacts[i] = {
            firstName: this.contacts[i].firstName,
            lastName: this.contacts[i].lastName,
            email: this.contacts[i].email[0].value
          };
        }
      } 
      //console.log(this.contacts);
      this.sortContacts(this.contacts);

      // for(var i = 0; i < this.contacts.length; i++) {
      //   if(this.contacts[i]._objectInstance.emails == null){
      //     console.log(this.contacts[i]._objectInstance.name.familyName);
      //     this.contacts.splice(i, 1);
      //   }
      //   if(this.contacts[i]._objectInstance.name.familyName == null){
      //     this.contacts[i]._objectInstance.name.familyName = " ";
      //   }
      //   this.nonNullContacts[i] = {
      //    firstName: this.contacts[i]._objectInstance.name.givenName,
      //    lastName: this.contacts[i]._objectInstance.name.familyName
      //    };
      // }
      //console.log("AAAAAAAHHHHHHHHHH");
      //this.sortContacts(this.nonNullContacts);
      //this.removeNullNames(this.contacts); 
    //}); 
    // console.log(JSON.stringify(this.contacts[5]._objectInstance.name.familyName));
    // this.removeNullNames(this.contacts);  
  }

  // initializeContacts(){
  //   //this.contacts = [{"_objectInstance":{"id":2,"rawId":null,"displayName":null,"name":{"givenName":"Paul","honorificSuffix":null,"formatted":"Paul Peyton","middleName":null,"familyName":"Peyton","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(843) 421-8381","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Golf Cart","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":3,"rawId":null,"displayName":null,"name":{"givenName":"Susan","honorificSuffix":null,"formatted":"Susan Pertik","middleName":null,"familyName":"Pertik","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"8502173259","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"LM eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":4,"rawId":null,"displayName":null,"name":{"givenName":"Ryan","honorificSuffix":null,"formatted":"Ryan Gove","middleName":null,"familyName":"Gove","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"6092903704","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lm Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":5,"rawId":null,"displayName":null,"name":{"givenName":"Scott","honorificSuffix":null,"formatted":"Scott Presnell","middleName":null,"familyName":"Presnell","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(850) 885-5849","pref":false,"id":0,"type":"work"},{"value":"(850) 217-9845","pref":false,"id":1,"type":"Blackberry"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null}];
  //   //this.contacts = [{"_objectInstance":{"id":2,"rawId":null,"displayName":null,"name":{"givenName":"Paul","honorificSuffix":null,"formatted":"Paul Peyton","middleName":null,"familyName":"Peyton","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(843) 421-8381","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Golf Cart","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":3,"rawId":null,"displayName":null,"name":{"givenName":"Susan","honorificSuffix":null,"formatted":"Susan Pertik","middleName":null,"familyName":"Pertik","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"8502173259","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"LM eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":4,"rawId":null,"displayName":null,"name":{"givenName":"Ryan","honorificSuffix":null,"formatted":"Ryan Gove","middleName":null,"familyName":"Gove","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"6092903704","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lm Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":5,"rawId":null,"displayName":null,"name":{"givenName":"Scott","honorificSuffix":null,"formatted":"Scott Presnell","middleName":null,"familyName":"Presnell","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(850) 885-5849","pref":false,"id":0,"type":"work"},{"value":"(850) 217-9845","pref":false,"id":1,"type":"Blackberry"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":6,"rawId":null,"displayName":null,"name":{"givenName":"Michelle","honorificSuffix":null,"formatted":"Michelle Boss","middleName":null,"familyName":"Boss","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+19729480126","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":7,"rawId":null,"displayName":null,"name":{"givenName":"Mary","honorificSuffix":null,"formatted":"Mary Davenport","middleName":null,"familyName":"Davenport","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(214) 808-0328","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Parents Neughbor","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":9,"rawId":null,"displayName":null,"name":{"givenName":"Charles","honorificSuffix":null,"formatted":"Charles Dorer","middleName":null,"familyName":"Dorer","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(321) 501-5216","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"LM Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":10,"rawId":null,"displayName":null,"name":{"givenName":"Kelly","honorificSuffix":null,"formatted":"Kelly O'Conner","middleName":null,"familyName":"O'Conner","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+13217951014","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/A760FB5E-81A1-4E81-9F7F-AE649905B98E/tmp/contact_photo_10","type":"url","pref":"false"}],"categories":null,"urls":[{"value":"fb://profile/2020604","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":11,"rawId":null,"displayName":null,"name":{"givenName":"Mike","honorificSuffix":null,"formatted":"Mike Davita","middleName":null,"familyName":"Davita","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"8503987236","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lockheed Eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":12,"rawId":null,"displayName":null,"name":{"givenName":"Lauren","honorificSuffix":null,"formatted":"Lauren Magee","middleName":null,"familyName":"Magee","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"19187082027","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/A760FB5E-81A1-4E81-9F7F-AE649905B98E/tmp/contact_photo_12","type":"url","pref":"false"}],"categories":null,"urls":null},"rawId":null}];
  //   this.contacts = [{"_objectInstance":{"id":2,"rawId":null,"displayName":null,"name":{"givenName":"Paul","honorificSuffix":null,"formatted":"Paul Peyton","middleName":null,"familyName":null,"honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(843) 421-8381","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Golf Cart","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":3,"rawId":null,"displayName":null,"name":{"givenName":"Susan","honorificSuffix":null,"formatted":"Susan Pertik","middleName":null,"familyName":null,"honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"8502173259","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"LM eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":4,"rawId":null,"displayName":null,"name":{"givenName":"Ryan","honorificSuffix":null,"formatted":"Ryan Gove","middleName":null,"familyName":"Gove","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"6092903704","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lm Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":5,"rawId":null,"displayName":null,"name":{"givenName":"Scott","honorificSuffix":null,"formatted":"Scott Presnell","middleName":null,"familyName":"Presnell","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(850) 885-5849","pref":false,"id":0,"type":"work"},{"value":"(850) 217-9845","pref":false,"id":1,"type":"Blackberry"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":6,"rawId":null,"displayName":null,"name":{"givenName":"Michelle","honorificSuffix":null,"formatted":"Michelle Boss","middleName":null,"familyName":"Boss","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+19729480126","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":7,"rawId":null,"displayName":null,"name":{"givenName":"Mary","honorificSuffix":null,"formatted":"Mary Davenport","middleName":null,"familyName":"Davenport","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(214) 808-0328","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Parents Neughbor","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":9,"rawId":null,"displayName":null,"name":{"givenName":"Charles","honorificSuffix":null,"formatted":"Charles Dorer","middleName":null,"familyName":"Dorer","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"(321) 501-5216","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"LM Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":10,"rawId":null,"displayName":null,"name":{"givenName":"Kelly","honorificSuffix":null,"formatted":"Kelly O'Conner","middleName":null,"familyName":"O'Conner","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+13217951014","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_10","type":"url","pref":"false"}],"categories":null,"urls":[{"value":"fb://profile/2020604","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":11,"rawId":null,"displayName":null,"name":{"givenName":"Mike","honorificSuffix":null,"formatted":"Mike Davita","middleName":null,"familyName":"Davita","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"8503987236","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lockheed Eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":12,"rawId":null,"displayName":null,"name":{"givenName":"Lauren","honorificSuffix":null,"formatted":"Lauren Magee","middleName":null,"familyName":"Magee","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"19187082027","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_12","type":"url","pref":"false"}],"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":13,"rawId":null,"displayName":null,"name":{"givenName":"Gloria","honorificSuffix":null,"formatted":"Gloria Schiller","middleName":null,"familyName":"Schiller","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"5613749000","pref":false,"id":0,"type":"other"},{"value":"561 306 3519","pref":false,"id":1,"type":"other"}],"emails":null,"addresses":[{"pref":"false","locality":"Boynton Beach","region":"Fl","id":0,"postalCode":"33437","country":null,"type":"home","streetAddress":"10447 Utopia Circle E"}],"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_13","type":"url","pref":"false"}],"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":15,"rawId":null,"displayName":null,"name":{"givenName":"Kelly","honorificSuffix":null,"formatted":"Kelly Scarpitta","middleName":null,"familyName":"Scarpitta","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"13215068340","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":[{"value":"fb://profile/1196397081","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":16,"rawId":null,"displayName":null,"name":{"givenName":"Alan","honorificSuffix":null,"formatted":"Alan Johnson","middleName":null,"familyName":"Johnson","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+18178996123","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lm Orlando","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":17,"rawId":null,"displayName":null,"name":{"givenName":"Jose","honorificSuffix":null,"formatted":"Jose Moralez","middleName":null,"familyName":"Moralez","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"+14077613213","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Aspire","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":[{"value":"fb://profile/208702324","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":18,"rawId":null,"displayName":null,"name":{"givenName":"Cody","honorificSuffix":null,"formatted":"Cody Danials","middleName":null,"familyName":"Danials","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"18704031587","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_18","type":"url","pref":"false"}],"categories":null,"urls":[{"value":"fb://profile/153102048","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":19,"rawId":null,"displayName":null,"name":{"givenName":"Mark","honorificSuffix":null,"formatted":"Mark Mobley","middleName":null,"familyName":"Mobley","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4795303649","pref":false,"id":0,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"SWEPCO","department":null,"type":null}],"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_19","type":"url","pref":"false"}],"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":20,"rawId":null,"displayName":null,"name":{"givenName":"Amanda","honorificSuffix":null,"formatted":"Amanda Shae","middleName":null,"familyName":"Shae","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4699512976","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":[{"value":"fb://profile/16731083","pref":false,"id":0,"type":"profile"}]},"rawId":null},{"_objectInstance":{"id":22,"rawId":null,"displayName":null,"name":{"givenName":"Beth","honorificSuffix":null,"formatted":"Beth Ely","middleName":null,"familyName":"Ely","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4074932501","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":23,"rawId":null,"displayName":null,"name":{"givenName":"Tom","honorificSuffix":null,"formatted":"Tom Llewellyn","middleName":null,"familyName":"Llewellyn","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4848242115","pref":false,"id":0,"type":"mobile"}],"emails":null,"addresses":null,"ims":null,"organizations":[{"pref":"false","title":null,"name":"Lm Eglin","department":null,"type":null}],"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},"rawId":null},{"_objectInstance":{"id":24,"rawId":null,"displayName":null,"name":{"givenName":"Matthew","honorificSuffix":null,"formatted":"Matthew Lombard","middleName":null,"familyName":"Lombard","honorificPrefix":null},"nickname":null,"phoneNumbers":[{"value":"4692364843","pref":false,"id":0,"type":"mobile"},{"value":"4699951643","pref":false,"id":1,"type":"other"}],"emails":null,"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":[{"value":"/var/mobile/Containers/Data/Application/2AF43C60-216D-45C7-94E7-36557DD0EB9D/tmp/contact_photo_24","type":"url","pref":"false"}],"categories":null,"urls":[{"value":"fb://profile/8319690","pref":false,"id":0,"type":"profile"}]},"rawId":null}];
  //   Contacts.find(['givenName', 'familyName', 'emails'], {filter: "", multiple: true}).then(data => {
  //     this.contacts = data;
  //   });

  //   this.removeNullNames(this.contacts);
  //   //this.groupContacts(this.sortedContacts);

  // }

  // removeNullNames(contacts){
  //   // remove contacts that dont have a familyName
  //   this.contacts = contacts;
  //   for(var i = 0; i < this.contacts.length; i++) {
  //     if(this.contacts[i]._objectInstance.name.familyName == null){
  //         this.contacts.splice(i, 1);
  //     }
  //   }
  //   this.nonNullContacts = this.contacts;
  //   console.log(JSON.stringify(this.nonNullContacts[0]._objectInstance.name.familyName));
  //   this.sortContacts(this.nonNullContacts);
  // }

  sortContacts(nonNullContacts){
    this.nonNullContacts = nonNullContacts;
    this.nonNullContacts.sort((function(a, b){ // sort object by Employee Name
      var nameA=a.lastName.toLowerCase(), nameB=b.lastName.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return -1 
        if (nameA > nameB)
          return 1
        return 0 //default return value (no sorting)
    }));
    this.sortedContacts = this.nonNullContacts;
    this.groupContacts(this.sortedContacts);
  }

  groupContacts(sortedContacts){
    this.contacts = sortedContacts;

    let currentLetter = false;
    let currentContacts = [];
 
    this.contacts.forEach((value, index) => {
 
      if(value.lastName.charAt(0) != currentLetter){
 
        currentLetter = value.lastName.charAt(0);
 
        let newGroup = {
          letter: currentLetter,
          contacts: []
        };

        currentContacts = newGroup.contacts;
        this.groupedContacts.push(newGroup);
      } 
        currentContacts.push(value);
    }); 
  }

  goToTabsPage(){
    this.navCtrl.setRoot(TabsPage);
  }

  goToEmailInvite(){
    console.log(this.contactsForEmail);
  }

  checkedContact(contact, checked){
    if(checked == true){
      this.addContactsForEmail(contact);
    }
    if(checked == false){
      this.removeContactsForEmail(contact);
    }

  }

 addContactsForEmail(contact){
    this.contactsForEmail.push(contact);
      console.log(this.contactsForEmail);
    }

 removeContactsForEmail(contact){
  for(var i = 0; i < this.contactsForEmail.length; i++) {
    if(this.contactsForEmail[i] == contact){
      this.contactsForEmail.splice(i, 1);
    }
  }
    console.log(this.contactsForEmail);
 } 



}

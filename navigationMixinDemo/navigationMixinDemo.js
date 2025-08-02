import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigationMixinDemo extends NavigationMixin(LightningElement) {
    
    // redirect tot ge lightning page tab not on the Object tab like Account , Contact etc.
    // it is mendatory to identify the type of the tab like is it lightning tab , visual force tab etc.
    handleOpenLightningTabPage() {
        this[NavigationMixin.Navigate]({
            type : 'standard__navItemPage',
            attributes : {
                apiName : 'SampleLightningAppPage' // api name of the lightning page tab.
            },
        })
    }

    // redirect / navigate to the object home page like Account / contact .. etc
    handleOpenObjectHomePage() {
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Account', // api name of the object.
                actionName : 'home' // redirect uou to the object home page
            },
        })
    }

    // redirect / navigate to the object home page along with the filter on the list
    handleOpenObjectHomePageWithFilter() {
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Account', // api name of the object.
                actionName : 'list'
            }, state : {
                // the value of filter name will be present at the url when you chnage the filter like Recently Viewed -> All Accounts
                filterName : '__Recent'// 'AllAccounts' 
            }
        })
    }

    // open the standard and custom object creattion popup 
    // open Account creation page 
    handleOpenAccountCreationPage() {
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
             attributes : {
                objectApiName : 'Account',
                actionName : 'new'
            }
        })
    }

    // opent the standard and custom object record page 
    handleOpenAccountRecordPage() {
        this[NavigationMixin.Navigate](
            {
                type : 'standard__recordPage',
                attributes : {
                    recordId : '0015g00001gpCcrAAE', // the record id of the Account that you want to open
                    objectApiName : 'Account', // api name of the object.
                    actionName : 'view' // action name like view, edit, new
                }
            }
        )
    }

    // navigate to the web page 
    handleOpenWebPage() {
        this[NavigationMixin.Navigate](
            {
                type : 'standard__webPage',
                //target : '_blank', // open the web page into the separate page
                attributes : {
                   url : 'https://www.salesforceben.com/'
                }
            }
        )
    }

    // open the file that file should be present in your org 
    handleOpenFile() {
        this[NavigationMixin.Navigate](
            {
                type : 'standard__namedPage',
                attributes : {
                   pageName : 'filePreview'
                },
                state : {
                    recordIds : '069J1000007q5EPIAY,069J1000007qd6CIAQ',
                    selectedRecordIds : '069J1000007q5EPIAY'
                }
            }
        )
    }
}
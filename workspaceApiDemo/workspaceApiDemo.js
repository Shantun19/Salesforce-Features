import { LightningElement, wire } from 'lwc';
import { IsConsoleNavigation, openTab, openSubtab,closeTab, EnclosingTabId, getFocusedTabInfo , refreshTab , setTabLabel , getAllTabInfo , focusTab } from 'lightning/platformWorkspaceApi';

export default class WorkspaceApiDemo extends LightningElement {

    // in salesforce the IsConsoleNavigation() is a method or a wire adaptor used to determin the context of an app.
    // means it determine weather you have placed your component in a lightning app or in a console app.
    // it return true or false , true -> console app , false -> not a console app.
    @wire(IsConsoleNavigation)
    isConsoleNavigation;

    // on the load of this component you will get the parent record tab id .
    // you can use this parent record tab id to open a new sub tab in the same context.
    @wire(EnclosingTabId)
    parentTabId;

    handleOpenTabUsingRecordId() {
        // its a good practise to check wether your app is console or lightning
        if (this.isConsoleNavigation) {
            openTab({
                // the openTab() is a method used to open a new tab using a record Id.
                // you can pass related record Ids as well as the separate record Ids.
                recordId: 'a0AJ1000002w6oKMAQ', // open this account tab
                label: 'open tab using workspace api', // you can also provide the custom name of the tab.
                focus: true
            }).catch(error => {
                console.log('the error => ', error);
            })
        }
    }

    // open the tab using the url 
    handleOpenTabUsingUrl() {
        if (this.isConsoleNavigation) {
            openTab({
                url: '/lightning/r/Book__c/a0AJ1000002w6ooMAA/view',
                label: 'open tab using url',
                focus: true
            }).catch(error => {
                console.log('the error => ', error);
            })
        }
    }

    handleOpenTabUsingPageRef() {
        if (this.isConsoleNavigation) {
            openTab({
                // pagereference is the javascript object that determine what page you want to navugate to.
                // its a part of workspace api and navigation mixin.
                pageReference: {
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Book__c',
                        actionName: 'list'
                    },
                },
                label: 'open tab using page reference',
                focus: true
            }).catch(error => {
                console.log('the error => ', error);
            })
        }
    }

    // for all the 3 function above if they redirect to the same object then what would be the priority
    // pageReference - first priority 
    // recordId - second priority 
    // url - last priority

    /*************************************** section - 2 opening the sub tab ***************************** */

    handleOpenSubTabUsingRecordId() {
        if (this.isConsoleNavigation) {
            // you can open the sub tab for the any record Id either it is related or not.
            openSubtab(this.parentTabId, {
                recordId: 'a0AJ1000002w6oKMAQ',
                label: 'opening the sub tab',
                focus: true,
            }).catch(error => {
                console.log('the error => ', error);
            })
        }
    }

    // open the sub tab using the url 
    handleOpenSubTabUsingUrl() {
        if (this.isConsoleNavigation) {
            openSubtab(this.parentTabId, {
                url: '/lightning/r/Book__c/a0AJ1000002w6ooMAA/view',
                label: 'opening the sub tab using url',
                focus: true,
            }).catch(error => {
                console.log('the error => ', error);
            })
        }
    }

    // open the sub tab using the page reference 
    handleOpenSubTabUsingPageRef() {
        if (this.isConsoleNavigation) {
            openSubtab(this.parentTabId, {
                // pagereference is the javascript object that determine what page you want to navugate to.
                // its a part of workspace api and navigation mixin.
                pageReference: {
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Book__c',
                        actionName: 'list'
                    },
                },
                label: 'open tab using page reference',
                focus: true
            }).catch(error => {
                console.log('the error => ', error);
            })
        }
    }

    /*************************************** section - 3 closing the tab ***************************** */

    // handle closing the tab 
    handleCloseTab() {
        if (this.isConsoleNavigation) {
            // getFocusedTabInfo will return the javascript object with the main information and sub tan information.
            getFocusedTabInfo().then(tabInfo => {
                closeTab(tabInfo.tabId); // close the most outer main tab
            }).catch(error => {
                console.log('the error => ', error);
            })
        }
    }

    // handle close tab using Async 
    async handleCloseTabUsingAsync() {
        if (this.isConsoleNavigation) {
            try {
                const {tabId} = await getFocusedTabInfo();
                await closeTab(tabId);
            }
            catch(error) {
                console.log('the error => ', error);
            }
        }
    }

    // handle closing the sub tab 
    async handleCloseSubTab() {
        if (this.isConsoleNavigation) {
            const tabInfo = await getFocusedTabInfo();
            if(tabInfo.subtabs) {
                // in this case the main outer tab is still there but all the sub tab were closed.
                tabInfo.subtabs.forEach(tab => {
                    closeTab(tab.tabId);
                })
            }            
        }
    }

    async handleRefreshTab() {
        if(this.isConsoleNavigation) {
            const { tabId } = await getFocusedTabInfo();
            await refreshTab(tabId , {
                includeAllSubtabs: true
            });
        }
    }

    async handleSetTabLabel() {
        if (this.isConsoleNavigation) {
            const {tabId} = await getFocusedTabInfo();
            await setTabLabel(tabId, 'Hurray !!'); // set the label of main tab the tab where you places this component.
        }
    }

    async handleSetFocus() {
        if(this.isConsoleNavigation) {
            const allTabs = await getAllTabInfo();
            const { tabId } = await getFocusedTabInfo();
            const selectedTabIndex = allTabs.findIndex(nextTab => {
                return nextTab.tabId === this.tabId
            });
            const nextTabId = allTabs[selectedTabIndex++].tabId
            await focusTab(nextTabId);
        }
    }
}

/*
getFocusedTabInfo return this json : 
{
    "tabId": "ctab0",
    "url": "https://shrinesoftware8-dev-ed.develop.lightning.force.com/lightning/r/Account/001J100000VR3fqIAD/view",
    "pinned": false,
    "closeable": true,
    "title": "Heather | Account",
    "icon": "standard:account",
    "iconAlt": "Account",
    "highlighted": false,
    "pageReference": {
        "type": "standard__recordPage",
        "attributes": {
            "recordId": "001J100000VR3fqIAD",
            "actionName": "view",
            "objectApiName": "Account"
        },
        "state": {}
    },
    "isSubtab": false,
    "parentTabId": null,
    "subtabs": [
        {
            "tabId": "ctab0_1",
            "url": "https://shrinesoftware8-dev-ed.develop.lightning.force.com/lightning/r/Book__c/a0AJ1000002w6oKMAQ/view?ws=%2Flightning%2Fr%2FAccount%2F001J100000VR3fqIAD%2Fview",
            "pinned": false,
            "closeable": true,
            "title": "Let us C | Book",
            "icon": "custom:custom65",
            "iconAlt": "Book  c",
            "customTitle": "opening the sub tab",
            "highlighted": false,
            "pageReference": {
                "type": "standard__recordPage",
                "attributes": {
                    "actionName": "view",
                    "recordId": "a0AJ1000002w6oKMAQ",
                    "objectApiName": "Book__c"
                },
                "state": {
                    "ws": "/lightning/r/Account/001J100000VR3fqIAD/view"
                }
            },
            "isSubtab": true,
            "parentTabId": "ctab0",
            "focused": false,
            "recordId": "a0AJ1000002w6oKMAQ"
        }
    ],
    "focused": true,
    "recordId": "001J100000VR3fqIAD"
}
*/
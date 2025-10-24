import { LightningElement, wire } from 'lwc';
import getAccountData from '@salesforce/apex/RefreshApexController.getAllAccounts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Account ID', fieldName: 'Id' }
];

export default class RefreshApexDemo extends LightningElement {
    accounts = [];
    selectedRows = [];
    columns = columns;
    wiredAccountResult; // store entire wire result

    @wire(getAccountData)
    wiredAccounts(result) {
        this.wiredAccountResult = result; // store wire result for refreshApex()
        const { data, error } = result;
        if (data) {
            this.accounts = data;
        } else if (error) {
            console.error('Error fetching accounts:', error);
        }
    }

    handleSelectedRow(event) {
        this.selectedRows = event.detail.selectedRows;
    }

    handleDeleteAccount() {
        if (this.selectedRows.length > 0) {
            const recordId = this.selectedRows[0].Id;
            deleteRecord(recordId)
                .then(() => {
                    console.log('The record was deleted successfully');
                    // Refresh the data table without reloading the page
                    return refreshApex(this.wiredAccountResult);
                })
                .catch((error) => {
                    console.error('An error occurred while deleting:', error);
                });
        } else {
            console.log('No account selected for deletion');
        }
    }
}

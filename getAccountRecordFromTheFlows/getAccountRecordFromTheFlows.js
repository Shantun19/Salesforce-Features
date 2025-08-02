import { LightningElement , api} from 'lwc';

export default class GetAccountRecordFromTheFlows extends LightningElement {
    @api getAccountRecord;

    connectedCallback() {
        console.log('the account record is + ' ,this.getAccountRecord);
        
    }
}
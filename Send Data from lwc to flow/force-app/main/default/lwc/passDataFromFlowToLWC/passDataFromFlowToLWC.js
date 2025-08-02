import { LightningElement , api} from 'lwc';

export default class PassDataFromFlowToLWC extends LightningElement {
    // it is a public property that receive value from the flow
    @api valueComingFromFlow;
}
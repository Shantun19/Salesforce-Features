import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendReissueEmail from '@salesforce/apex/ReissueEmailController.sendReissueEmail';

export default class ReIssueEmail extends LightningElement {
    @api recordId = '0015g00001RWNEwAAP';
    @track emailValue = '';
    @track emailPills = [];

    handleEmailChange(event) {
        this.emailValue = event.target.value.trim();
    }

    // Click Add Email button
    handleAddEmail() {
        const email = this.emailValue;
        // Empty check
        if (!email) {
            this.showToast('Error', 'Please enter an email address.', 'error');
            return;
        }
        // Email validation
        if (!this.isValidEmail(email)) {
            this.showToast('Error', 'Please enter a valid email address.', 'error');
            return;
        }
        // Prevent duplicate email pills
        if (this.emailPills.some(p => p.label === email)) {
            this.showToast('Warning', 'Email already added.', 'warning');
            return;
        }
        // Add pill
        this.emailPills = [
            ...this.emailPills,
            {
                type: 'icon',
                label: email,
                name: email,
                iconName: 'utility:email'
            }
        ];
        // Clear input after adding
        this.emailValue = '';
        const inputCmp = this.template.querySelector('lightning-input');
        if (inputCmp) {
            inputCmp.value = '';
        }
    }

    // Remove pill
    handlePillRemove(event) {
        const name = event.detail.item.name;
        this.emailPills = this.emailPills.filter(p => p.name !== name);
    }

    // Email validation function
    isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    // Helper: Show Toast messages
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }

    handleSendEmail() {
        if (this.emailPills.length === 0) {
            this.showToast('Error', 'Please add at least one email.', 'error');
            return;
        }

        const emails = this.emailPills.map(p => p.label);

        sendReissueEmail({
            accountId: this.recordId,
            toEmails: emails
        })
            .then(() => {
                this.showToast('Success', 'Email sent successfully.', 'success');
                this.emailPills = [];
                this.emailValue = '';
                const inputCmp = this.template.querySelector('lightning-input');
                if (inputCmp) {
                    inputCmp.value = '';
                }
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }
}

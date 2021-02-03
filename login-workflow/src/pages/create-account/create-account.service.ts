import { AccountDetails } from './create-account.component';
import { TemplateRef } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

export class CreateAccountService {
    /* Account Registration Pages start with 0 index. */
    currentPage = 0;

    constructor(public detailsStartPage: number, public accountDetails: AccountDetails[]) {}

    /* Decrements currentPage index by 1. */
    prevStep(): void {
        this.currentPage--;
    }

    /* Increments currentPage index by 1. */
    nextStep(): void {
        this.currentPage++;
    }

    /* Returns current page number. */
    getCurrentPage(): number {
        return this.currentPage;
    }

    /* Returns true if on-screen custom account detail forms contain valid entries. */
    hasValidAccountDetails(): boolean {
        const detailsIndex = this.currentPage - this.detailsStartPage; /* index of custom accountDetails to use. */
        const hasCustomForms = this._hasDetailsAtIndex(detailsIndex);
        return !hasCustomForms || this.accountDetails[detailsIndex].isValid();
    }

    /* Returns true if the current page is an Accounts Details entry page. */
    isAccountDetailsPage(): boolean {
        return (
            this.currentPage >= this.detailsStartPage &&
            this.currentPage < this.detailsStartPage + this.getNumberOfAccountDetailsPages()
        );
    }

    /* Returns true if current page is the first account details page. */
    isFirstAccountDetailsPage(): boolean {
        return this.currentPage === this.detailsStartPage;
    }

    isCustomAccountsDetailsPage(): boolean {
        return !this.isFirstAccountDetailsPage() && this.isAccountDetailsPage();
    }

    /* Returns true if the current page is the last account details page. */
    isLastAccountDetailsPage(): boolean {
        return this.currentPage === this.detailsStartPage + this.getNumberOfAccountDetailsPages() - 1;
    }

    /* Searches for custom AccountDetails and returns true if it exists. */
    private _hasDetailsAtIndex(index: number): boolean {
        return (
            this.accountDetails &&
            this.accountDetails[index] &&
            this.accountDetails[index].formControls &&
            this.accountDetails[index].formControls.length > 0
        );
    }

    /* Returns how many pages of account details a user will have to fill out. */
    getNumberOfAccountDetailsPages(): number {
        return this.accountDetails.length === 0 ? 1 : this.accountDetails.length;
    }

    /* Returns true when the user has finished the account-details section of self-registration. */
    showAccountCreatedPage(): boolean {
        return this.currentPage === this.detailsStartPage + this.getNumberOfAccountDetailsPages();
    }

    /* Returns the number of steps to show in the mobile stepper based off of how many account details pages there are. */
    getNumberOfSteps(): number {
        return this.detailsStartPage + this.getNumberOfAccountDetailsPages();
    }

    /* Returns user-provided custom account details for the currentPage. */
    getCustomAccountDetailsTemplate(): TemplateRef<MatFormField> {
        const detailsIndex = this.currentPage - this.detailsStartPage; /* index of custom accountDetails to use. */
        if (this._hasDetailsAtIndex(detailsIndex)) {
            return this.accountDetails[detailsIndex].form;
        }
    }

    /* Called upon completing the self-registration process, empties all forms.  */
    clearAccountDetails(): void {
        for (const detail of this.accountDetails) {
            for (const formControl of detail?.formControls || []) {
                formControl.reset();
            }
        }
    }

    /* Returns string[] of custom account detail values. */
    getAccountDetailsCustomValues(): string[] {
        const customAccountDetails = [];
        for (const detail of this.accountDetails) {
            for (const control of detail?.formControls || []) {
                customAccountDetails.push(control.value);
            }
        }
        return customAccountDetails;
    }
}

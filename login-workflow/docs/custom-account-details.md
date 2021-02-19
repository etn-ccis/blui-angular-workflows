# Custom Account Details
The `@pxblue/angular-auth-workflow` allows for custom account detail fields to be added during a user's self-registration.   To add custom form fields to the self registration pages, follow the steps below:

### Create a custom `<pxb-create-account>` component.

```angular2
<ng-template #createAccountPage>
    <pxb-create-account [accountDetails]="accountDetails"></pxb-create-account>
</ng-template>

<pxb-auth [createAccountRef]="createAccountPage"></pxb-auth>
``` 

### Add your custom form content as a `<ng-template>`
```angular2
<ng-template #customFormRef>
  <form>
      <mat-form-field appearance="fill">
          <mat-label>Custom Field</mat-label>
          <input matInput [formControl]="customFormControl" required />
          <mat-error *ngIf="customFormControl.hasError('required')">
              Emergency Contact is <strong>required</strong>
          </mat-error>
      </mat-form-field>
  </form>
</ng-template>
```

### Populate the `accountDetails` @Input

Each `accountDetails` object has 3 properties:

| Property            | Description                                            |
| ------------------- | ------------------------------------------------------ | 
| form                | What to render                                         |
| formControls        | A map listing all of the fields in the form            |
| isValid             | function we run to determine if user-input is valid    |

Each `accountDetails` represents a new page in the self-registration process.  


```
import { AccountDetails } from '@pxblue/angular-auth-workflow';


// What to Render
@ViewChild('customFormRef') customFormRef: TemplateRef<MatFormField>;

// To capture user inputs
customFormControl: FormControl;

// An array of accountDetails where each object represents a new page. 
accountDetails: AccountDetails[]; 

ngAfterViewInit(): void {
  this.customFormControl= new FormControl('', Validators.required);
  this.accountDetails = [
      {   /* Page 1 */
          form: this.customFormRef,
          formControls: new Map([['custom', this.customFormControl]]),
          isValid: () => this.customFormControl.value,
      }
  ];
}

```

This solution scales so that a user can have as many pages as they want.  Adding `undefined` as the first entry of the `accountDetails[]` will shift all custom forms onto their own page.  

Check out the Example project to see an example of custom registration forms.

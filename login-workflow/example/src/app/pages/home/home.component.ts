import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PxbChangePasswordModalService } from '@pxblue/angular-auth-workflow';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private readonly _router: Router,
        public readonly _changePasswordModalService: PxbChangePasswordModalService
        ) {}

    ngOnInit(): void {}

    openDialog() {
        this._changePasswordModalService.openDialog();
      }

    logout(): void {
        void this._router.navigate(['auth']);
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import {AccountService} from "@app/_services/account.service";
import {AlertService} from "@app/_services/alert.service";
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
    templateUrl: 'forgot-password.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink]
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.alertService.clear();
    this.accountService.forgotPassword(this.f.email.value)
      .pipe(first())
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.alertService.success('Please check your email for password reset instructions'),
        error: error => this.alertService.error(error)
      });
  }
}

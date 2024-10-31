import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService} from "@app/_services/account.service";
import {AlertService} from "@app/_services/alert.service";
import {MustMatch} from "@app/_helpers/must-match.validator";
import {NgClass, NgIf} from '@angular/common';
import {Account} from "@app/models/account";
import {Datepicker, DatepickerInterface, DatepickerOptions, InstanceOptions} from "flowbite";

// set the target element of the input field or div
const $datepickerEl: HTMLInputElement = document.getElementById('datepicker-custom') as HTMLInputElement;

// optional options with default values and callback functions
const options: DatepickerOptions = {
  defaultDatepickerId: null,
  autohide: false,
  format: 'mm/dd/yyyy',
  maxDate: null,
  minDate: null,
  orientation: 'bottom',
  buttons: false,
  autoSelectToday: 0,
  title: null,
  rangePicker: false,
  onShow: () => {
  },
  onHide: () => {
  },
};

// instance options object
const instanceOptions: InstanceOptions = {
  id: 'datepicker-custom-example',
  override: true
};

/*
* $datepickerEl: required
* options: optional
* instanceOptions: optional
*/
const datepicker: DatepickerInterface = new Datepicker(
  $datepickerEl,
  options,
  instanceOptions
);

@Component({
  templateUrl: 'register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      street: [''],
      postalCode: [''],
      city: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const accountToBeRegistered = this.form.value;

    this.accountService.getAllAccounts(accountToBeRegistered.email).subscribe({
      next: (value) => {
        if (value) {// display email already registered "email" in alert
          setTimeout(() => {
            this.alertService.info(`
                        <h4>Du bist bereits registriert!</h4>
                        <p>Deine Email-Adresse <strong>${accountToBeRegistered.email}</strong> wurde bereits im System gefunden.</p>
                        <p>Falls du dein Passwort vergessen hast, klicke auf <strong><a href="${location.origin}/account/forgot-password"></strong><i>Passwort vergessen</i></a>.</p>
                    `, {autoClose: false});
          }, 1000);

        } else {  //continue with registration
          this.accountService.register(accountToBeRegistered).pipe(first()).subscribe({
            next: (value) => {
              this.alertService.success(`
                    <h4><strong>Registrierung erfolgreich!</strong></h4>
                    <p>Bitte überprüfe deinen Posteingang (<strong>${this.f.email.value}</strong>) und verfollständige den Registrierungsprozess!</p>`,
                {keepAfterRouteChange: true});
              this.router.navigate(['../login'], {relativeTo: this.route});
            },
            error: error => {
              setTimeout(() => {
                this.alertService.error(`
                    <h4><strong>Registrierung fehlgeschlagen!</strong></h4>
                    <p>Du konntest am System nicht registriert werden, bitte versuche es erneut!</p>
                `, {autoClose: false});
              }, 1000);
              console.log("Fehler bei einer Registrierung: " + error);
              this.loading = false;
            }
          });
        }
      },
      error: error => {
        return;
      }
    });
  }
}

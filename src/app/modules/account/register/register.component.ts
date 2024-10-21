import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService} from "@app/_services/account.service";
import {AlertService} from "@app/_services/alert.service";
import {MustMatch} from "@app/_helpers/must-match.validator";
import {NgClass, NgIf} from '@angular/common';
import {Account} from "@app/models/account";

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

    this.accountService.getAll().subscribe({
      next: (value) => {
        const foundAccount = value.find(x => x.email === accountToBeRegistered.email);

        if (foundAccount) {// display email already registered "email" in alert
          setTimeout(() => {
            this.alertService.info(`
                        <h4>Du bist bereits registriert!</h4>
                        <p>Deine Email-Adresse <strong>${accountToBeRegistered.email}</strong> wurde bereits im System gefunden.</p>
                        <p>Falls du dein Passwort vergessen hast, klicke auf <strong><a href="${location.origin}/account/forgot-password"></strong><i>Passwort vergessen</i></a>.</p>
                    `, {autoClose: false});
          }, 1000);

        } else {  //continue with registration
          this.accountService.register(this.form.value).pipe(first()).subscribe({
            next: (value) => {
              this.alertService.success(`
                    <h4><strong>Registrierung erfolgreich!</strong></h4>
                    <p>Bitte überprüfe deinen Posteingang und verfollständige den Registrierungsprozess!</p>`,
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
              console.log("Fehler beim Registrierungsprozess: " + error);
              this.loading = false;
            }
          });
        }
      },
      error: error => {
        return;
      }
    });

    /** Text to send via EMAIL:
     * setTimeout(() => {
     *             const verifyUrl = `${location.origin}/account/verify-email?token=${account.verificationToken}`;
     *             alertService.info(`
     *                     <h4>Verifizierung Email</h4>
     *                     <p>Danke für deine Registrierung!</p>
     *                     <p>Bitte klicke auf den untenstehenden Link um deine Email-Adresse zu verifizieren:</p>
     *                     <p><a href="${verifyUrl}">${verifyUrl}</a></p>
     *                     <div><strong>NOTE:</strong> The fake backend displayed this "email" so you can test without an api. A real backend would send a real email.</div>
     *                 `, {autoClose: false});
     *           }, 1000);
     */
  }
}

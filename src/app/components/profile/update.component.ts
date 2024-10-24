import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AccountService} from "@app/_services/account.service";
import {AlertService} from "@app/_services/alert.service";
import {MustMatch} from "@app/_helpers/must-match.validator";
import { NgClass, NgIf } from '@angular/common';


@Component({
    templateUrl: 'update.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink]
})
export class UpdateComponent implements OnInit {
  account = this.accountService.accountValue;
  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [this.account.title, Validators.required],
      firstName: [this.account.firstName, Validators.required],
      lastName: [this.account.lastName, Validators.required],
      email: [this.account.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
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
    this.accountService.update(this.account._id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Aktualisierung erfolgreich!', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.deleting = true;
      this.accountService.delete(this.account._id)
        .pipe(first())
        .subscribe(() => {
          this.alertService.success('Benutzerkonto wurde erfolgreich gelöscht!', { keepAfterRouteChange: true });
        });
    }
  }
}

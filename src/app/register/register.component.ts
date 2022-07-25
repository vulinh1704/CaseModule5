import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(''),
    phone: new FormControl('', [Validators.required])
  });
  user: any;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  checkConfirmPassword: any;

  register() {
    this.user = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      phone: this.registerForm.value.phone
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.checkConfirmPassword = true;
    } else {
      this.checkConfirmPassword = false;
      this.authenticationService.register(this.user).subscribe(() => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log(error);
      })
    }
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

}

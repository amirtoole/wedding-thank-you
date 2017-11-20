import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  code = '';
  formControl = new FormControl();

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.code = localStorage.getItem('loginCode');
    if (this.code != null) {
      this.submit();
    }
  }

  submit(): void {
    this.errorMessage = '';
    this.code = this.code.toUpperCase();
    this.loginService.login(this.code).subscribe(successful => {
      if (!successful) {
        this.formControl.setErrors({
          'invalid': true
        });
      }
      else {
        this.router.navigateByUrl('gallery');
      }
    });
  }

  isError(): boolean {
    return this.errorMessage.length > 0;
  }
}

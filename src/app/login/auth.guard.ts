import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';
import { ImageService } from '../services/image.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService, private imageService: ImageService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.imageService.cloudFrontUrl != null) {
      return true;
    }
    const loginCode = localStorage.getItem('loginCode');
    if (loginCode == null) {
      this.router.navigateByUrl('');
      return false;
    }
    return this.loginService.login(loginCode).map(valid => {
      if (!valid) {
        this.router.navigateByUrl('');
      }
      return valid;
    });
  }
}

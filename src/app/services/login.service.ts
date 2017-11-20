import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ImageService } from './image.service';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  private readonly lambdaURL = 'https://5n1dzf66vh.execute-api.us-east-1.amazonaws.com/dev/get-s3-credentials?code=';

  constructor(private http: HttpClient, private imageService: ImageService) {
    if (!environment.production) {
      const lStorage = JSON.parse(localStorage.getItem('develop'));
      if (lStorage != null) {
        this.imageService.images = lStorage.images;
        this.imageService.cloudFrontUrl = lStorage.cloudFrontSignedUrl;
      }
    }
  }

  login(code: string): Observable<boolean> {
    return this.http.get(this.lambdaURL + code)
      .mergeMap((result: any) => {
        localStorage.setItem('loginCode', code);
        if (!environment.production) {
          localStorage.setItem('develop', JSON.stringify(result));
        }
        this.imageService.images = result.images;
        this.imageService.cloudFrontUrl = result.cloudFrontSignedUrl;
        return Observable.of(true);
      })
      .catch(err => {
        localStorage.removeItem('loginCode');
        return Observable.of(false);
      });
  }
}

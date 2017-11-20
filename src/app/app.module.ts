import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { ImageService } from './services/image.service';
import { NgxImageGalleryModule } from './gallery-module/ngx-image-gallery.module';
import { AuthGuard } from './login/auth.guard';
import { LoginService } from './services/login.service';

const routes = <Route[]>[
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    NgxImageGalleryModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    ImageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

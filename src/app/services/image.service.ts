import { Injectable } from '@angular/core';
import { GALLERY_IMAGE } from '../gallery-module/ngx-image-gallery.conf';


@Injectable()
export class ImageService {

  images: string[];
  cloudFrontUrl: string;

  getThumbnailForImage(image: string): string {
    return this.cloudFrontUrl.replace('.net/*', `.net/thumbnails/${image}`);
  }

  constructor() {
  }

  getImages(): GALLERY_IMAGE[] {
    const imagesArray = <GALLERY_IMAGE[]>[];
    let c = 0;
    this.images.forEach(image => {
      const url = this.getThumbnailForImage(image);
      imagesArray.push({
        url: url,
        extUrl: url.replace('/thumbnails/', '/full-size/'),
        title: image.replace('.jpg', ''),
        count: c++
      });
    });
    return imagesArray;
  }
}

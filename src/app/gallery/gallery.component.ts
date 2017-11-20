import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../services/image.service';
import { GALLERY_CONF, GALLERY_IMAGE } from '../gallery-module/ngx-image-gallery.conf';
import { NgxImageGalleryComponent } from '../gallery-module/components/ngx-image-gallery/ngx-image-gallery.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  sections = new Array<GALLERY_IMAGE[]>();
  images = new Array<GALLERY_IMAGE>();

  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showExtUrlControl: true,
    thumbnailSize: 50,
    showImageTitle: true,
    reactToMouseWheel: false,
    reactToRightClick: true
  };

  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.images = this.imageService.getImages();
    const batch = 20;
    for (let i = 0; i < this.images.length; i += batch) {
      this.sections.push(this.images.slice(i, Math.min(this.images.length, i + batch)));
    }
  }

  async sleep(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  // METHODS
  // open gallery
  openGallery(index: number = 0): boolean {
    this.ngxImageGallery.open(index);
    return false;
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }
}

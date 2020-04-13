import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewUploaderComponent } from './preview-uploader/preview-uploader.component';
import {ImageService} from './common/service/image.service';



@NgModule({
  declarations: [PreviewUploaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PreviewUploaderComponent
  ],
  providers: [ImageService]
})
export class ImageModule { }

import {Injectable} from '@angular/core';

@Injectable()
export class ImageService {
  constructor() {
  }
  toBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      if (!file) {
        return alert(`You have to choose file!`)
      }
      reader.readAsDataURL(file)
      reader.onload = () =>  resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }
}

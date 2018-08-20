import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  generateTags(tags) {
    tags = {
      title: 'Roll n Sheet Ltd',
      // tslint:disable-next-line:max-line-length
      description: 'Roll n Sheet Ltd is the leading supplier of paper and paper products to customers located in Africa and the Indian Ocean region.',
      // tslint:disable-next-line:max-line-length
      keywords: 'roll, sheet, roll n sheet, mauritius, africa, indian ocean, paper, paper products, products, deloffice, deloffice mauritius, print n pack, print, pack, packaging, stationery',
      ...tags
    };

    this.title.setTitle(tags.title);
    this.meta.updateTag({ name: 'description', content: tags.description });
    this.meta.updateTag({ name: 'keywords', content: tags.keywords });
  }
}

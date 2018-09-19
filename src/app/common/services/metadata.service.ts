import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { PlatformService } from '../services/platform.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private title: Title,
    private meta: Meta,
    private platform: PlatformService
  ) { }

  generateTags(tags) {
    let host;
    if (this.platform.platformCheck) {
      host = (window as any).location.protocol + '//' + (window as any).location.hostname + ':' + (window as any).location.port;
    } else {
      host = 'http://rollnsheet.mu:4100';
    }

    tags = {
      title: 'Roll n Sheet Ltd',
      // tslint:disable-next-line:max-line-length
      description: 'Roll n Sheet Ltd is the leading supplier of paper and paper products to customers located in Africa and the Indian Ocean region.',
      image: host + '/assets/icons/icon-512x512.png',
      // tslint:disable-next-line:max-line-length
      keywords: 'roll, sheet, roll n sheet, mauritius, africa, indian ocean, paper, paper products, products, deloffice, deloffice mauritius, print n pack, print, pack, packaging, stationery',
      ...tags
    };

    this.title.setTitle(tags.title);
    this.meta.updateTag({ name: 'description', content: tags.description });
    this.meta.updateTag({ name: 'keywords', content: tags.keywords });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Roll n Sheet Ltd' });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:image', content: tags.image });
  }
}

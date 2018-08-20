import { Directive, ElementRef, Renderer2, OnChanges, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[routerLink]'
})
export class EmptyRouterLinkDirective implements OnChanges {
    @Input() routerLink: any;

    constructor (private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnChanges() {
        if (this.routerLink === null) {
            setTimeout(() =>  {
              this.renderer.setAttribute(this.elRef.nativeElement, 'href', '#');
            }, 0);
        }
    }
}

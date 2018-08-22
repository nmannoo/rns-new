import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';

export const fadeAnimation =
trigger('fadeAnimation', [
    transition('* <=> *', [
        query(':enter', [
            style({ opacity: 0 })
        ],
        {optional: true}
        ),
        query(':leave', [
            style({ opacity: 0 }),
            animate('.3s ease-in-out', style({ opacity: 0, position: 'absolute', left: 0, right: 0, top: 0 }))
        ],
        {optional: true}
        ),
        query(':enter', [
            style({ opacity: 0 }),
            animate('.3s ease-in-out', style({ opacity: 1 }))
        ],
        {optional: true}
        )
    ])
]);

export const flyInAnimation =
trigger('flyIn', [
  transition('* <=> *', [ // each time the binding value changes
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-100px)' }),
      stagger(50, [
        animate('0.2s', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true }),
    query(':leave', [
      style({ opacity: 0, transform: 'translateY(-100px)' }),
      stagger(50, [
        animate('0.2s', style({ opacity: 0, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

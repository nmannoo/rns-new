export const Navigation = [
    {
        slug: '/',
        name: 'Home'
    },
    {
        slug: '/about',
        name: 'About'
    },
    {
        slug: '#',
        name: 'Paper',
        routeprefix: '/paper',
        prefix: 'paper',
        children: [
            {
                slug: '/container-board',
                name: 'Container Board'
            },
            {
                slug: '/folding-boxboard',
                name: 'Folding Boxboard'
            },
            {
                slug: '/coated-paper',
                name: 'Coated Paper'
            },
            {
                slug: '/uncoated-paper',
                name: 'Uncoated Paper'
            },
            {
                slug: '/newsprint',
                name: 'Newsprint'
            },
            {
                slug: '/tissue',
                name: 'Tissue',
            },
        ]
    },
    {
        slug: '#',
        name: 'Stationery',
        routeprefix: '/stationery',
        prefix: 'stationery',
        children: [
            {
                slug: '/lever-arch-file',
                name: 'Lever Arch File'
            },
            {
                slug: '/document-holder',
                name: 'Document Holder'
            },
            {
                slug: '/index-pp',
                name: 'Index PP'
            },
            {
                slug: '/archive-box',
                name: 'Archive Box'
            },
            {
                slug: '/envelopes',
                name: 'Envelopes'
            },
            {
                slug: '/thermal',
                name: 'Thermal'
            },
            {
                slug: '/sack-kraft',
                name: 'Sack Kraft'
            },
            {
                slug: '/speciality',
                name: 'Speciality'
            }
        ]
    },
    {
        slug: '#',
        name: 'Packaging',
        routeprefix: '/packaging',
        prefix: 'packaging',
        children: [
            {
                slug: '/cake-boards',
                name: 'Cake Boards'
            },
            {
                slug: '/plastic-film',
                name: 'Plastic Film'
            }
        ]
    },
    {
        slug: '/contact',
        name: 'Contact',
    },
];

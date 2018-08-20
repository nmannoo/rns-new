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
                slug: '/container-board',
                name: 'Container Board'
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
                slug: '/container-board',
                name: 'Container Board'
            }
        ]
    },
    {
        slug: '/contact',
        name: 'Contact',
    },
];

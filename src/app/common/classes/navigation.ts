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
                name: 'Folding Box Board'
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
            {
                slug: '/thermal-ncr',
                name: 'Thermal/NCR'
            },
            {
                slug: '/sack-kraft',
                name: 'Sack Kraft'
            },
            {
                slug: '/specialty',
                name: 'Specialty'
            }
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
              name: 'Thermal Paper'
            },

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
            // {
            //     slug: '/plastic-film',
            //     name: 'Plastic Film'
            // },

        ]
    },
    {
        slug: '/contact',
        name: 'Contact',
    },
];

export const AdminNavigation = [
  {
    slug: '/admin',
    name: 'Home'
  },
  {
    slug: '/admin/pages',
    name: 'Pages'
  },
  {
    slug: '/admin/products',
    name: 'Products'
  },
  {
    slug: '/admin/sliders',
    name: 'Sliders'
  },
  // {
  //   slug: '/admin/users',
  //   name: 'Users'
  // }
];

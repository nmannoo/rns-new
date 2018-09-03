export const mapConfig = {
  map: {
    name: 'world_countries',
    zoom: {
      init: {
        level: 3,
        x: 650,
        y: 240
      }
    },
    defaultArea: {
      attrs: {
          fill: '#f7f7f7',
          stroke: '#ced8d0',
          'stroke-width': 0.5
      },
      attrsHover: {
        fill: '#778899'
      }
    },
    defaultLink: {
      attrs: {
        stroke: '#d20c1d'
      }
    },
    defaultPlot: {
      size: 4,
      attrs: {
        fill: '#d20c1d'
      },
      text: {
        attrs: {
          fill: '#000',
        },
        // attrsHover: {
        //   fill: '#000',
        // }
      }
    }
  },
  areas: {
    'ET': {
      attrs: {
        fill: '#bababa'
      }
    },
    'MZ': {
      attrs: {
        fill: '#bababa'
      }
    },
    'KE': {
      attrs: {
        fill: '#bababa'
      }
    },
    'MG': {
      attrs: {
        fill: '#bababa'
      }
    },
    'ZA': {
      attrs: {
        fill: '#bababa'
      }
    },
    'TZ': {
      attrs: {
        fill: '#bababa'
      }
    },

  },
  plots: {
    'ethiopia': {
      latitude: 9.040568,
      longitude: 39.389991,
      tooltip: {content: 'Ethiopia'}
    },
    'kenya': {
      latitude: 0.482751,
      longitude: 37.869299,
      tooltip: {content: 'Kenya'}
    },
    'tanzania': {
      latitude: -6.378843,
      longitude: 34.856222,
      tooltip: {content: 'Tanzania'}
    },
    'mozambique': {
      latitude: -17.328421,
      longitude: 35.759106,
      tooltip: {content: 'Mozambique'}
    },
    'southafrica': {
      latitude: -30.669874,
      longitude: 24.001264,
      tooltip: {content: 'South Africa'}
    },
    'madagascar': {
      latitude: -19.002846,
      longitude: 46.460938,
      tooltip: {content: 'Madagascar'}
    },
    'comoros': {
      latitude: -11.652533,
      longitude: 43.347701,
      tooltip: {content: 'Comoros'}
    },
    'seychelles': {
      latitude: -4.656809,
      longitude: 55.477931,
      tooltip: {content: 'Seychelles'}
    },
    'mayotte': {
      latitude: -12.816968,
      longitude: 45.155792,
      tooltip: {content: 'Mayotte'}
    },
    'reunion': {
      latitude: -21.1307,
      longitude: 55.5265,
      tooltip: {content: 'Reunion'}
    },
    'mauritius': {
      latitude: -20.244959,
      longitude: 57.561768,
      tooltip: {content: 'Mauritius'}
    },
  },
  links: {
    'mu-et': {
      factor: 0.8,
      between: ['ethiopia', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-ke': {
      factor: 0.8,
      between: ['kenya', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-tz': {
      factor: 0.5,
      between: ['tanzania', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-mz': {
      factor: 0.5,
      between: ['mozambique', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-za': {
      factor: 0.5,
      between: ['southafrica', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-mg': {
      factor: 0.5,
      between: ['madagascar', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-km': {
      factor: 0.3,
      between: ['comoros', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-yt': {
      factor: 0.3,
      between: ['mayotte', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-sc': {
      factor: 0.2,
      between: ['seychelles', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },
    'mu-re': {
      factor: 0.5,
      between: ['reunion', 'mauritius'],
      attrs: {
        'stroke-width': 0.8
      }
    },

  }
};

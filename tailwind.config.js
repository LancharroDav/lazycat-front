module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        'main' : '#2B2C26',
        'back' : '#F1F4F9',
        'aux' : '#85C199',
        'aux2' : '#4F9D69',
        'letters' : '#F3F5F7',
        'letters-dark' : '#565656',
        'remark' : '#CE84AD'        
      },
      opacity: {
        '5' : '0.05',
        '10' : '0.1',
	      '20' : '0.2',
        '90' : '0.9',
        '98' : '0.98'
      },
      height: {
        '20pc': '20%',
        '70pc': '70%',
        '80pc': '80%',
        '100pc' : '100%'
      },
      scale: {
        '200': '2'
      },
      width: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem'
      }
    },
  },
  variants: {},
  plugins: [],
}

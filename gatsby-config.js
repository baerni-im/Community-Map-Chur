require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    author: 'Bernhard Aebersold',
    title: 'Chur hilft Chur',
    description:
      'Gemeinsam gegen Corona: Einkaufshilfe, Lieferservice, Unterhaltung und vieles mehr: Jetzt auf Chur hilft Chur',
    email: 'beni.aebersold@gmail.com',
    teaserImage: "https://www.churhilftchur.ch/teaser.jpg",
    twitter: {
      hashtag: 'churhilftchur',
      handle: '@baern_i'
    },
    share: {
      text: 'churhilftchur.ch - Hilf auch du in deiner Community',
      hashtags: 'ChurhilftChur,Communitychur,Coronavirus,BleibtZuhause,StayTheFuckHome' // separate with commas,
    },
    menuLinks: [
      {title: 'Home', link: '/', icon: 'map'},
      {title: 'Hinzufügen', link: '/add', icon: 'plus'},
      {title: 'Kontakt', link: '/contact', icon: 'info'},
    ],
    mapData: {
      bounds: [
        [9.513218,46.858411], /*oben links 46.858411, 9.513218*/
        [9.539684,46.847415] /*unten rechts*/
      ]
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-137035852-2",
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          databaseURL: process.env.FIREBASE_URL
        }
      }
    },
    {
      resolve: `gatsby-source-firebase`,
      options: {
        // point to the firebase private key downloaded
        // credential: require('./secret/firebase-creds'),

        credential: {
          "type": process.env.FIREBASE_TYPE,
          "project_id": process.env.FIREBASE_PROJECT_ID,
          "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          "client_email": process.env.FIREBASE_CLIENT_EMAIL,
          "client_id": process.env.FIREBASE_CLIENT_ID,
          "auth_uri": process.env.FIREBASE_AUTH_URI,
          "token_uri": process.env.FIREBASE_TOKEN_URI,
          "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
          "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
        },

        // your firebase database root url
        databaseURL: process.env.FIREBASE_URL,

        // you can have multiple "types" that point to different paths
        types: [
          // if you're data is really simple, this should be fine too
          {
            type: "MapPoints",
            path: "data/",
          }
        ]
      }
    }
  ],
};

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import { Link } from 'gatsby'
import { MapViewComponent } from '../components/mapview.main'
/* SEO Component with React Helmet */
import Head from '../components/head'

const Index = () => {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title,
          email
        }
      }
    }
  `);

  return (
    <Layout>
      <Head title={data.site.siteMetadata.title} />
      <div className='index'>
        <section className='ui vertical very fitted segment' style={{marginTop: '1rem'}}>
          <div className='ui container'>
            <h1 className='ui header'>
              <div className='content'>
                <span className={'page-title'}>Chur hilft Chur</span>
                <div className='sub header'>
                  Mit der interaktiven Chur-hilft-Chur-Karte bleibst du während der Coronavirus-Isolation mit deiner Community in Kontakt.{' '}
                  <Link to={'/add'}>
                    Füge weitere Informationen zur Karte hinzu,
                  </Link>
                  {' '}wenn du anderen behilflich sein kannst. #ChurhilftChur
                </div>
              </div>
            </h1>

          </div>
        </section>
        <section>
          <MapViewComponent />
        </section>
        <section className='ui vertical segment intro'>
          <div className='ui text container formcontainer'>
            <h2>Was sehe ich auf der Karte?</h2>
            <p>
              Die Karte zeigt Personen oder Geschäfte, die ihre Hilfe oder Dienstleistungen für euch Churer und Churerinnen anbieten. Vom Restaurant, das neu Take-Away anbietet bis zur Einzelperson, die anderen via Skype gerne Musik vorspielt, sind alle Angebote willkommen.
            </p>

            <Link
              to={'/add'}
              className='ui primary fluid button'
              style={{marginTop: '1rem'}}
            >
              Information hinzufügen
            </Link>
            <h2>Wie kann ich einen Eintrag entfernen?</h2>
            <p>
              Schreibe mir eine Mail an{' '}
              <a
                href={`mailto:${data.site.siteMetadata.email}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {data.site.siteMetadata.email}
              </a>
              .{' '}Andernfalls werden sämtliche Daten entfernt, sobald diese Karte nicht mehr benötigt wird.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;

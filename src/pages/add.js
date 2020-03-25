import React from 'react';
import { Link } from 'gatsby'
/* SEO Component with React Helmet */
import Head from '../components/head'
import Layout from '../components/layout'
import { MapAddComponent } from '../components/mapview.add'

const Add = () => {
  return (
    <Layout>
      <Head title={`Add`} />
      <div className='index'>
        <section className='ui vertical very fitted segment' style={{marginTop: '1rem'}}>
          <div className='ui container'>
            <h1 className='ui header'>
              <div className='content'>
              <span className='page-title'>
                Du hast nützliche Infos oder bietest Hilfe an?
              </span>
                <div className='sub header'>
                  Den einen fällt im HomeOffice die Decke auf den Kopf und die anderen kämpfen mit ihrem KMU um ihre Existenz. Vielen Dank für deine Hilfe oder deine Information mit dem Eintrag in die interaktive Karte.
                </div>
              </div>
            </h1>
          </div>
        </section>

        <section className='ui vertical segment'>
          <div className='ui text container formcontainer'>
            <h2>So funktionierts</h2>
            Wähle einen Ort auf der Karte, wo deine Information erscheinen soll. Danach kannst du deinen Eintrag genauer beschreiben und wir geben ihn <strong>nach einer manuellen Prüfung</strong> auf der Karte frei.{' '}

          </div>
        </section>
        <section>
          <MapAddComponent />
        </section>

      </div>
    </Layout>
  );
};

export default Add;

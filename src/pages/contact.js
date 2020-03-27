import React from 'react';

import Layout from '../components/layout';
import Head from '../components/head';

const Contact = () => {
  return (
    <Layout>
      <Head title={`Contact`} />
      <section className='ui vertical very fitted segment' style={{marginTop: '1rem'}}>
        <div className='ui container'>
          <h1 className='ui header'>
            <div className='content'>
            <span className='page-title'>
              Nimm Kontakt auf
            </span>
              <div className='sub header'>
                Dieses Projekt wurde von <a href={'https://bernhardaebersold.ch/'} target={'_blank'}>Bernhard Aebersold</a> umgesetzt. Die Vorlage stammt vom Webentwickler <a href={'mailto:marc.fehr@gmail.com'}>Marc Fehr,</a> der seinen Code auf <a href={'https://gitlab.com/marc.fehr/community-isolation-map'} target={'_blank'} rel={'noopener noreferrer'}>Gitlab</a> kostenlos zur Verfügung stellt. Beim Projekt geht es darum, nachbarschaftlich für einander da zu sein, in einer Zeit, in der man isoliert sein sollte. Ziel ist es, dass weitere solche kleine Communities entstehen. Bitte teilt die Idee euren Freunden mit. Ich freue mich, auf dein Feedback!
              </div>
            </div>
          </h1>
          <div className={'ui yellow message'} style={{fontWeight: 500, fontStyle: 'italic'}}>
            <i className={'icon external link'} />Im Tutorial lernst du, wie du deine eigene Community-Karte machst. <a href={'https://medium.com/@marcfehr/how-to-build-a-fast-and-reliable-community-mapping-tool-with-gatsbyjs-and-firebase-74a0fa6b5b83?source=userActivityShare-f57d26da4972-1584988662&_branch_match_id=689400773593121406'} target={'_blank'} rel={'noopener noreferrer'}>Los gehts</a>.
          </div>
        </div>
      </section>

      <section className='ui vertical segment' style={{minHeight: '55vh'}}>
        <div className='ui text container formcontainer'>
          <h2>Email</h2>
          <ul>
            <li>
              {/* If you're a developer, add yourself here and create a MR on Gitlab do get onto the original repository */}
              <a href='mailto:info@churhilftchur.ch'>
                Bernhard Aebersold
              </a>, Journalist, Fotograf und Student an der Fachhochschule Graubünden.
            </li>
          </ul>
          <h2>Teile Chur-hilft-Chur auf deinen Kanälen</h2>
          <p>Teile die Idee hinter Chur-hilft-Chur, damit noch weitere Community-Karten entstehen.</p>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

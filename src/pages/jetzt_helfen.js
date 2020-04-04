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
              Unterstütze das lokale Gewerbe
            </span>
              <div className='sub header'>
                Die Junge Wirtschaftskammer Chur versucht das lokale Gewerbe in diesen schwierigen Zeiten ebenfalls zu unterstützen. Dafür bietet sie auf der Webseite <a href={'https://www.gewerbehilfe-graubuenden.ch/alle-unternehmen/'} target={'_blank'}>Gewerbehilfe-Graubünden</a> Gutscheine an. Bei einem Kauf erhält das Unternehmen das oftmals dringend benötigte Geld umgehend und Du kannst den Gutschein nach dem Lockdown einlösen.<br></br>
                Hilf auch du mit!
                </div>
            </div>
          </h1>
          </div>
      </section>

      <section className='ui vertical segment' style={{minHeight: '55vh'}}>
        <div className='ui text container formcontainer'>
          <h2>So funktionierts</h2>
          <ul>
            <li>
              Kauf einen Gutschein deiner Wahl auf <a href={'https://www.gewerbehilfe-graubuenden.ch/alle-unternehmen/'} target={'_blank'}>Gewerbehilfe-Graubünden</a>.
            </li>
            <li>
              {/* If you're a developer, add yourself here and create a MR on Gitlab do get onto the original repository */}
              Die Gewerbehilfe Graubünden bezahlt den Wert des Gutscheins umgehend an das Unternehmen.
            </li>
            <li>
              {/* If you're a developer, add yourself here and create a MR on Gitlab do get onto the original repository */}
              Nach dem Lockdown wirfst du mit Gutscheinen um dich als wären es Hunderter-Nötli.
            </li>
          </ul>
          <div>
          <img src="../../static/gewerbehilfe.png">
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

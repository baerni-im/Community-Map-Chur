import React, { useState } from 'react'
import './mapview.add.scss'
import AnimatedMap from './map-add/animatedmap/component.js'
import categories from '../components/categories'
import { useStaticQuery, graphql, Link } from 'gatsby';
import firebase from "gatsby-plugin-firebase";

const scrollToElement = require('scroll-to-element');

/*
See gatsby-config.js in main dir for bounds
 */

export function MapAddComponent() {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title,
          share {
            text,
            hashtags
          },
          mapData {
            bounds
          }
        },
      }
    }
  `);

  const [mapActive, setMapActive] = useState(false);
  const [map, setMap] = useState(null);
  const [positionSelected, setPositionSelected] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [showError, setShowError] = useState(false);
  const [content, setContent] = useState({
    position: [],
    category: '',
    title: '',
    description: '',
    contact: '',
    address: '',
    phone: '',
    email: '',
    name: '',
    timestamp: Date.now(),
    approved: false
  })

  const onChange = e => {
    // content[e.target.name] = e.target.value
    const c = { ...content }
    c[e.target.name] = e.target.value
    setContent(c)
  };

  React.useEffect(() => {
    if (mapActive) {
      map.on('click', e => {
        const pos = [e.lngLat.lng, e.lngLat.lat]

        console.log(pos);
        setContent({ ...content, position: pos })
        map.getSource('position').setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: pos }
            }
          ]
        })
      });

      // Fit effect
      map.fitBounds(
        data.site.siteMetadata.mapData.bounds,
        { duration: 700 }
      )
    }
  }, [mapActive]);

  React.useEffect(() => {
    scrollToElement('#formcontent')
  }, [positionSelected]);

  React.useEffect(() => {
    if (formSent === true) {
      const newPostKey = firebase
        .database()
        .ref()
        .child('data')
        .push().key

      firebase
        .database()
        .ref('/data/' + newPostKey)
        .update(content)
        .then(() => {
          console.log('Writing done')
        })
        .catch(e => {
          console.log('error', e)
        })
    }
  }, [formSent])

  const validateForm = () => {
    let error = false
    error = content.title.length === 0 ? true : error
    error = content.description.length === 0 ? true : error
    error = content.address.length === 0 ? true : error
    error = content.contact.length === 0 ? true : error
    error = content.name.length === 0 ? true : error
    error = content.email.length === 0 ? true : error
    error = content.category.length === 0 ? true : error

    if (error) {
      setShowError(true)
    } else {
      setFormSent(true)
    }
  }

  return (
    <div id={'map-add-component'}>
      <div
        id='mapcontainer'
        style={{ display: positionSelected ? 'none' : 'inherit' }}
      >
        <AnimatedMap getMapObject={m => setMap(m)} enabled={mapActive} />
        {!mapActive && (
          <div id='overlay' className='box'>
            <h3>Neue Information hinzufügen</h3>
            <p>
              Wähle eine Position auf der Karte, um ein Teil der CommunityChur zu werden.
            </p>
            <button
              className='ui primary button'
              onClick={() => setMapActive(true)}
            >
              Karte aktivieren und Service hinzufügen
            </button>
          </div>
        )}

        {content.position.length > 0 && (
          <div id='selectThisPoint' className='box'>
            <h3>Position gesetzt</h3>
            <p>Diese Position übernehmen?</p>
            <div className='ui buttons'>
              <button
                className='ui button'
                onClick={() => {
                  setContent({ ...content, position: [] })
                }}
              >
                Nein, neu wählen...
              </button>
              <button
                className='ui positive button'
                onClick={() => setPositionSelected(true)}
              >
                Ja!
              </button>
            </div>
          </div>
        )}
      </div>

      {positionSelected && !formSent && (
        <div id='formcontent' className='ui vertical segment'>
          <div className='ui text container formcontainer'>
            <button
              className='ui left labeled icon button compact'
              onClick={() => {
                setPositionSelected(false)
                setContent({ ...content, position: [] })
              }}
            >
              <i className='left arrow icon' />
              Change location
            </button>
            <div className='ui form'>
              <h4 className='ui horizontal divider header'>
                Infos zu deinem Service (sichtbar für alle)
              </h4>
              <p>
                Bitte beanworte die folgenden Fragen. Diese Informationen werden nach einer Kontrolle von uns auf der Karte erscheinen. Aktuell kann nur <strong>eine Kategorie</strong> pro Service ausgewählt werden. Wenn du mehr als eine Hilfestellung anbieten kannst, musst du mehrere Punkte in der Karte setzen.
              </p>

              <div className='field'>
                <label>Service Kategorie</label>
                <select
                  value={content.category}
                  className='ui dropdown'
                  onChange={e =>
                    setContent({ ...content, category: e.target.value })
                  }
                >
                  <option value='' />
                  {categories.map(c => (
                    <option value={c.ident} key={c.ident}>
                      {c.text}
                    </option>
                  ))}
                </select>
                {/*
                <CategoryButtons
                  onClick={name => setContent({ ...content, category: name })}
                  selected={content.category}
                /> */}
              </div>

              <div className='field required'>
                <label>Titel</label>
                <input
                  type='text'
                  name='title'
                  value={content.title}
                  onChange={onChange}
                  placeholder='Ich gehe für dich einkaufen / Mit Hunden spazieren gehen etc...'
                />
              </div>

              <div className='field required'>
                <label>Das bietest du an</label>
                <textarea
                  rows={4}
                  name='description'
                  onChange={onChange}
                  placeholder='Schreibe einen kurzen Text, der deinen Service oder deine Information beschreibt.'
                  defaultValue={content.description}
                />
              </div>

              <div className='field required'>
                <label>Kontaktaufnahme</label>
                <textarea
                  rows={4}
                  name='contact'
                  placeholder='Das ist die Kontaktadresse, die die Webseitenbesucher sehen werden. Beispiel: Whatsapp: 079 123 45 67, Email: max@mustermann.ch'
                  defaultValue={content.contact}
                  onChange={onChange}
                />
              </div>

              <div className='field required'>
                <label>Deine Adresse</label>
                <textarea
                  rows={4}
                  name='address'
                  placeholder='Beispiel: Calandastrasse 1, 7000 Chur. Wir benötigen diese Angabe, um deinen Eingabe auf der Karte zu überprüfen.'
                  defaultValue={content.address}
                  onChange={onChange}
                />
              </div>

              <h4 className='ui horizontal divider header'>
                Weitere Informationen
              </h4>
              <p>
                Diese Informationen werden nicht auf der Webseite publiziert.
              </p>

              <div className='field required'>
                <label>Dein Vor- und Nachname</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Max Mustermann'
                  defaultValue={content.name}
                  onChange={onChange}
                />
              </div>

              <div className='field required'>
                <label>Deine E-Mailadresse</label>
                <input
                  type='text'
                  name='email'
                  placeholder='max@mustermann.ch'
                  defaultValue={content.email}
                  onChange={onChange}
                />
              </div>

              <div className='field'>
                <label>Telefonnummer (freiwillig)</label>
                <input
                  type='text'
                  name='phone'
                  placeholder='079...'
                  defaultValue={content.phone}
                  onChange={onChange}
                />
              </div>

              {showError && (
                <div className='ui negative message'>
                  <div className='header'>Fehlende Daten</div>
                  <p>
                    Bitte fülle die benötigen Felder aus.
                  </p>
                </div>
              )}

              <div className='ui buttons'>
                <button className='ui positive button' onClick={validateForm}>
                  Senden
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {formSent && (
        <div className='ui vertical segment'>
          <div className='ui text container'>
            <div className='ui success message'>
              <div className='header'>Tanka!</div>
              <p>
                Deine Eingabe war erfolgreich. Nach einer Prüfung werden deine Infos auf {' '}
                <Link to='/'>{' '}{data.site.siteMetadata.title}
                </Link>{' '}
                ersichtlich sein.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className='ui vertical segment'>
        <div className='ui text container formcontainer'>
          <h2>Was geschieht mit meinen Daten?</h2>
          Die CommunityChur-Administratoren überprüfen deine Angaben und fügen sie anschliessend der Karte hinzu. Das dauert in der Regel <strong>weniger als 24 Stunden.</strong>.<br />
          <h2>Welche Einträge werden bewilligt?</h2>
          Jede und jeder kann Teil der Chur-hilft-Chur Community werden. Egal, ob du via Skype Kindergeschichten vorlesen oder
          ein paar Stücke deiner leckeren Bündner Nusstorte ausliefern möchtest: Solange du Churern irgendwie helfen kannst, ist jedes Angebot willkommen.
          <h2>Wie kann ich meine Daten entfernen?</h2>
          Wenn dein Eintrag von der Chur-hilft-Chur Karte <strong>entfernt werden soll,</strong> schick mir eine Nachricht an{' '}
          <a
            href='mailto:beni.aebersold@gmail.com'
          >
            beni.aebersold@gmail.com
          </a>
          <h2>Was können wir verbessern?</h2>
          Wir haben für jedes Anliegen ein offenes Ohr und danken dir bereits jetzt für dein konstruktives Feedback via
          <a
          href='mailto:beni.aebersold@gmail.com'
        >
          email.
        </a>{' '}.
          <h2>Warum nur in Chur?</h2>
          Zur Verhinderung einer starken Ausbreitung des Coronavirus, müssen wir unser Leben aktuell so lokal und isoliert wie möglich führen.
          Das Projekt Chur-hilft-Chur soll Menschen in einer vergleisweise kleinen Community zusammenbringen, damit einander im Sinne einer Nachbarschaftshilfe geholfen werden kann.<br>

          Die Idee dahinter stammt vom Web-Entwickler Marc Fehr, der während sechs Monaten pro Jahr in Südafrika arbeitet. Für seine lokale Community hat er
          <a
              href='https://www.whozinberg.org'
            >
              whozinberg.org
            </a> ins Leben gerufen, das identisch wie Chur-hilft-Chur funktioniert. Dankbarerweise stellt er seinen Programmiercode frei für alle zur Verfügung, damit sich weitere Communities wie Chur-hilft-Chur bilden lassen. {' '}
        </div>
      </div>
    </div>
  )
}

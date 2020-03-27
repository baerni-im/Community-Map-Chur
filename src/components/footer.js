import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import './footer.scss';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author,
          title,
          email,
          twitter {
            hashtag
          }
        }
      }
    }
  `);

  return (
    <footer className='ui vertical inverted segment'>
      <div className='ui center aligned container'>
        <i className='ui icon copyright' />{new Date().getFullYear()}{' '}{data.site.siteMetadata.title}{' ' }|{' '}<a href={`mailto:${data.site.siteMetadata.email}`}><i className='ui icon envelope' />Schreib eine Mail</a>{' '}|{' '}<a href={`https://twitter.com/baern_i`} target={'_blank'} rel={'noopener noreferrer'}><i className='ui icon twitter' />Folge mir auf Twitter</a>{' '}|{' '} Mit <i className={'ui icon heart'} /> erstellt von Bernhard Aebersold - mit der Vorlage von <a href='https://twitter.com/@mrcfhr' target={'_blank'} rel={'noopener noreferrer'}>Marc Fehr</a>{' ' }|{' '}<a href={`https://churhilftchur.ch/impressum/`} rel={'noopener noreferrer'}>Impressum</a>
      </div>
    </footer>
  );
};

export default Footer;

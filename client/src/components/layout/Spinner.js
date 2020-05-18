import React, { Fragment } from 'react';
import { Placeholder } from 'rsuite';
import spinner from '../../img/spinner.gif';

export default () => {
  const { Paragraph } = Placeholder;
  return(
      <Fragment>
          <img
            src={spinner}
            style={{ width: '35%', margin: 'auto', display: 'block' }}
            alt='Loading...'
          />
          <Paragraph style={{ marginTop: 30 }} graph="circle" active/>
          <Paragraph style={{ marginTop: 30 }} graph="square" active/>
          <Paragraph style={{ marginTop: 30 }} graph="image" active/>
      </Fragment>
    )
};
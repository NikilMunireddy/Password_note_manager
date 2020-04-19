import React, { Fragment } from 'react';
import spinner from '../../img/pencil_loading.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '75%', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
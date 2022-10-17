import React from 'react';

if (process.env.NODE_ENV === 'development') {
  console.log('enabling WDYR');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

import React from 'react';
import pagemain from '../../../src/assets/nexcodenova add.png';

function PageImage() {
  return (
    <div className="pageContentmain">
      <img
        src={pagemain}
        alt="Page Banner"
        className="pageContentImg"
      />
    </div>
  );
}

export default PageImage;
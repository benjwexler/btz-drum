
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


function KitNameContainer({ kitName }) {
  return (
    <div id="topSectionMiddle" className="col-sm-5 col-md-5 col-lg-4 d-none d-sm-flex">
     <div className="m-auto pb-1">
    <TransitionGroup>
      <CSSTransition
        key={kitName}
        appear
        timeout={{
          appear: 0,
          enter: 0,
          exit: 0,
        }}
        classNames='kitNameAnimation'
        className="m-auto"
      >
       
          <div className="pb-1">{kitName}</div>
         
      </CSSTransition>
    </TransitionGroup>
    </div>
    </div>

  );
}

export default KitNameContainer;

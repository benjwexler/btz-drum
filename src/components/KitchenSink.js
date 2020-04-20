
import React from 'react';
import PadsSection from './Pads/PadsSection';
import TopLeftControls from './TopLeftControls';
import KitNameContainer from './KitNameContainer';
import Tempo from './Tempo';
import useMyContext from '../store/UseMyContext';

const KitchenSink = () => {
  const {
    kitName,
    kits,
    activeKit,
    activeKitNum,
    setActiveKitNum,
  } = useMyContext()

  const onClickChangeKit = (changeVal) => {
    let newActiveKitNum = activeKitNum + changeVal;

    if(newActiveKitNum >= kits.length) {
      newActiveKitNum = 0
    }

    if(newActiveKitNum < 0) {
      newActiveKitNum = kits.length - 1;
    }

    return setActiveKitNum(newActiveKitNum)
  }

  const { youtubeUrl } = activeKit;
  return (
    <>
      <div id="mainContainer" className="container">
        <div className="row">
          <div id="topSectionLeft" className="col-sm-7 col-md-7 col-lg-6 d-none d-sm-block">
            <TopLeftControls />
          </div>
          <KitNameContainer
            kitName={kitName}
          />
          <div id="topSectionRight" className="col-lg-2 d-none d-lg-block">
          <Tempo />
          </div>
          <div id="mainLeft" className="col-sm-7 col-md-7 col-lg-6">
            <PadsSection />
          </div>
          <div id="mainMiddle" className="col-sm-5 col-md-5 col-lg-4 d-none d-sm-block">
            <div id="videoContainer">
              <iframe id="youtubeVid" src={youtubeUrl} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
              </iframe>

              <div id="questionsContainer">
                <div id="faqTop">
                  <div id="faqTitle">FAQ</div>
                  <div id="exitFaq">X</div>
                </div>
                <div id="faqBody">
                  <div id="faqBodyText">Coming Soon</div>
                </div>
              </div>
            </div>
            <div id="mainMiddleBottom">
              <div id="changeKitContainer">
                <div onClick={() => onClickChangeKit(-1)} id="previousKit">
                  <div id="previousKitText">Previous Kit</div>
                  <div className="changeKitSymbol">‹</div>
                </div>
                <div onClick={() => onClickChangeKit(1)} id="changeKit">
                  <div id="previousKitText">Next Kit</div>
                  <div className="changeKitSymbol">›</div>
                </div>
              </div>
            </div>
          </div>
          <div id="mainRight" className="col-lg-2 d-none d-lg-block">
            <div id="knob1Container">
              <a id="soundcloudIcon" href={activeKit.soundcloudUrl} target="_blank">
                <i className="fab fa-soundcloud fa-5x icons"></i>
              </a>
            </div>
            <div id="knob2Container" />
            <div id="knob3Container" />
            <div id="knob4Container" />
            <div id="knob5Container">
              <div id="bigKnob">
                <div id="faqText"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
};

export default KitchenSink;
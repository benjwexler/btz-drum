
import React, { useContext } from 'react';
import PadsSection from './Pads/PadsSection';
import TopLeftControls from './TopLeftControls';
import { Context } from './Context';
import KitNameContainer from './KitNameContainer';
import Tempo from './Tempo';

const KitchenSink = () => {
  const {
    isKeyMapOn,
    setIsKeyMapOn,
    isBeatRepeatOn,
    setIsBeatRepeatOn,
    beatRepeatVal,
    setBeatRepeatVal,
    kitName,
    setKitName,
    tempo
  } = useContext(Context)
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
            {/* <div id="tempoTop">Tempo</div>
            <div id="setTempo">
              <input id="set-tempo" type="number" value="80" />
            </div> */}
          </div>
          <div id="mainLeft" className="col-sm-7 col-md-7 col-lg-6">
            <PadsSection />
          </div>
          <div id="mainMiddle" className="col-sm-5 col-md-5 col-lg-4 d-none d-sm-block">
            <div id="videoContainer">
              <iframe id="youtubeVid" src="https://www.youtube.com/embed/wQ7rkIppxPM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
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
                <div id="previousKit">
                  <div id="previousKitText">Previous Kit</div>
                  <div className="changeKitSymbol">‹</div>
                </div>
                <div onClick={() => setKitName(Math.random() > .5 ? "Blah" : "YoYO")} id="changeKit">
                  <div id="previousKitText">Next Kit</div>
                  <div className="changeKitSymbol">›</div>
                </div>
              </div>
            </div>
          </div>
          <div id="mainRight" className="col-lg-2 d-none d-lg-block">
            <div id="knob1Container">
              <a id="soundcloudIcon" href="https://soundcloud.com/just-blaze" target="_blank">
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
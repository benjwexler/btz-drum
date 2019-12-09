
import React, {useContext} from 'react';
import PadsSection from './PadsSection';
import Nav from './Nav';
import TopLeftControls from './TopLeftControls';
import { Context } from './Context';

const KitchenSink = () => {
  const {
    isKeyMapOn,
    setIsKeyMapOn,
    isBeatRepeatOn,
    setIsBeatRepeatOn,
    beatRepeatVal,
    setBeatRepeatVal
  } = useContext(Context)
  return (
    <>
    <Nav />

    <div id="mainContainer" class="container">
      <div class="row">
        <div id="topSectionLeft" class="col-sm-7 col-md-7 col-lg-6 d-none d-sm-block">
          <TopLeftControls />
                </div>
                <div id="topSectionMiddle" class="col-sm-5 col-md-5 col-lg-4 d-none d-sm-block">
                  Just Blaze
                </div>
                <div id="topSectionRight" class="col-lg-2 d-none d-lg-block">
                  <div id="tempoTop">
                    Tempo
                </div>
                  <div id="setTempo">
                    <input id="set-tempo" type="number" value="80" />
                </div>
                  </div>
                  <div id="mainLeft" class="col-sm-7 col-md-7 col-lg-6">

                  <PadsSection />

                  </div> 

                  <div id="mainMiddle" class="col-sm-5 col-md-5 col-lg-4 d-none d-sm-block">
                    <div id="videoContainer">
                      <iframe id="youtubeVid" src="https://www.youtube.com/embed/wQ7rkIppxPM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                      </iframe>

                      <div id="questionsContainer">

                        <div id="faqTop">

                          <div id="faqTitle">
                            FAQ
                        </div>

                          <div id="exitFaq">
                            X
                        </div>
                        </div>

                        <div id="faqBody">
                          <div id="faqBodyText">
                            Coming
                              
                              Soon
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="mainMiddleBottom">
                        <div id="changeKitContainer">
                          <div id="previousKit">
                            <div id="previousKitText">
                              Previous Kit
                            </div>
                            <div class="changeKitSymbol">
                              ‹
                            </div>
                          </div>
                          <div id="changeKit">
                            <div id="previousKitText">
                              Next Kit
                            </div>
                            <div class="changeKitSymbol">
                              ›
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="mainRight" class="col-lg-2 d-none d-lg-block">
                      <div id="knob1Container">
                        <a id="soundcloudIcon" href="https://soundcloud.com/just-blaze" target="_blank">
                          <i class="fab fa-soundcloud fa-5x icons"></i>
                        </a>
                      </div>
                      <div id="knob2Container">
                      </div>
                      <div id="knob3Container">
                      </div>
                      <div id="knob4Container">
                      </div>
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
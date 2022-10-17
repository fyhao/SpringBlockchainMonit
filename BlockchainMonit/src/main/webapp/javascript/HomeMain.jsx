import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TokenGridView from './TokenGridView'
const HomeMain = (props) => {
  const [getStartedClicked, setGetStartedClicked] = useState(false);
  var handleGetStartedClick = () => {
  	setGetStartedClicked(true);
  };
  return (
    <>
      <div className="home-main-container">
        <div className="hero-container section-container">
          <div className="home-main-max-width max-width">
            <div className="home-main-content">
              <span className="home-main-subtitle before-Heading">
                Blockchain Monit system
              </span>
              <h1 className="home-main-title">
                <span className="home-main-text">
                  Unlock the next generation blockchain
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span className="home-main-text1">experience</span>
              </h1>
              <span className="home-main-description">
                Best DEFI in the world
              </span>
              <div className="home-main-container1">
                <Button className="button button-gradient" onClick={handleGetStartedClick} role="getStartedBtn">Get Started</Button>
              </div>
            </div>
            <div className="home-main-feature-card">
              {getStartedClicked ? <TokenGridView /> : ''}
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">
      
        {`
        :root {
  --dl-size-size-large: 144px;
  --dl-size-size-small: 48px;
  --dl-size-size-medium: 96px;
  --dl-size-size-xlarge: 192px;
  --dl-size-size-xsmall: 16px;
  --dl-space-space-unit: 16px;
  --dl-size-size-xxlarge: 288px;
  --dl-color-scheme-white: #FFFFFF;
  --dl-size-size-maxwidth: 1144px;
  --dl-radius-radius-round: 50%;
  --dl-color-scheme-green80: #105749ff;
  --dl-space-space-halfunit: 8px;
  --dl-space-space-sixunits: 96px;
  --dl-space-space-twounits: 32px;
  --dl-color-scheme-green100: #0c4237ff;
  --dl-color-scheme-orange80: #ffc78bff;
  --dl-color-scheme-yellow20: #fffef3ff;
  --dl-color-scheme-yellow80: #fff6a7ff;
  --dl-radius-radius-radius2: 2px;
  --dl-radius-radius-radius4: 4px;
  --dl-radius-radius-radius8: 8px;
  --dl-space-space-fiveunits: 80px;
  --dl-space-space-fourunits: 64px;
  --dl-color-scheme-orange100: #ffad61ff;
  --dl-radius-radius-radius16: 16px;
  --dl-space-space-eightunits: 128px;
  --dl-space-space-threeunits: 48px;
  --dl-color-scheme-lightgreen: #c7ff9bff;
  --dl-space-space-oneandhalfunits: 24px;
}
.button {
  color: var(--dl-color-scheme-green100);
  cursor: pointer;
  display: inline-block;
  padding: 12px 24px;
  border-color: var(--dl-color-scheme-green100);
  border-width: 2px;
  border-radius: 32px;
  background-color: var(--dl-color-scheme-white);
}
.input {
  color: var(--dl-color-scheme-green100);
  cursor: auto;
  padding: 0.5rem 1rem;
  border-color: var(--dl-color-scheme-green100);
  border-width: 1px;
  border-radius: 4px;
  background-color: var(--dl-color-scheme-white);
}
.textarea {
  color: var(--dl-color-scheme-green100);
  cursor: auto;
  padding: 0.5rem;
  border-color: var(--dl-color-scheme-green100);
  border-width: 1px;
  border-radius: 4px;
  background-color: var(--dl-color-scheme-white);
}
.list {
  width: 100%;
  margin: 1em 0px 1em 0px;
  display: block;
  padding: 0px 0px 0px 1.5rem;
  list-style-type: none;
  list-style-position: outside;
}
.list-item {
  display: list-item;
}
.teleport-show {
  display: flex !important;
}
.button-secondary {
  font-style: normal;
  transition: 0.3s;
  font-family: Lexend;
  font-weight: 500;
  line-height: 1;
  border-color: var(--dl-color-scheme-green80);
  margin-right: var(--dl-space-space-unit);
}
.button-secondary:hover {
  color: var(--dl-color-scheme-white);
  background-color: var(--dl-color-scheme-orange100);
}
.button-primary {
  color: var(--dl-color-scheme-white);
  font-style: normal;
  transition: 0.3s;
  font-family: Lexend;
  font-weight: 500;
  line-height: 1;
  border-color: var(--dl-color-scheme-green80);
  background-color: var(--dl-color-scheme-green80);
}
.button-primary:hover {
  color: var(--dl-color-scheme-green80);
  background-color: var(--dl-color-scheme-lightgreen);
}
.navbar-container {
  top: 0;
  width: 100%;
  display: flex;
  z-index: 1000;
  position: sticky;
  padding-top: var(--dl-space-space-oneandhalfunits);
  padding-bottom: var(--dl-space-space-oneandhalfunits);
  justify-content: center;
  background-color: var(--dl-color-scheme-white);
}
.navbar-burger-menu {
  display: none;
}
.max-width {
  width: 100%;
  display: flex;
  max-width: var(--dl-size-size-maxwidth);
  align-items: center;
  padding-left: var(--dl-space-space-oneandhalfunits);
  padding-right: var(--dl-space-space-oneandhalfunits);
  justify-content: space-between;
}
.button-gradient {
  display: flex;
  font-size: 18px;
  background: linear-gradient(90deg, #C7FF9B 0%, #FFF6A7 100%);
  font-style: normal;
  transition: 0.3s;
  align-items: center;
  font-weight: 700;
  line-height: 0.9;
  padding-top: 20px;
  border-color: transparent;
  margin-right: var(--dl-space-space-unit);
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 20px;
}
.button-gradient:hover {
  color: var(--dl-color-scheme-white);
  background: unset;
  border-color: var(--dl-color-scheme-white);
}
.button-transparent {
  color: var(--dl-color-scheme-white);
  font-size: 18px;
  font-style: normal;
  transition: 0.3s;
  font-weight: 700;
  line-height: 0.9;
  padding-top: 20px;
  border-color: var(--dl-color-scheme-white);
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 20px;
  background-color: transparent;
}
.button-transparent:hover {
  color: var(--dl-color-scheme-green80);
  background-color: var(--dl-color-scheme-lightgreen);
}
.section-container {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding-top: var(--dl-space-space-eightunits);
  flex-direction: column;
  padding-bottom: var(--dl-space-space-eightunits);
}
.hero-container {
  padding-top: 0 !important;
  background-color: var(--dl-color-scheme-green80);
}
.bg-transparent {
  background-color: transparent;
}
.question-content {
  display: flex;
  overflow: hidden;
  max-height: 0;
  transition: 0.3s;
  align-items: flex-start;
  flex-direction: column;
}
.question {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 20px;
  border-color: rgba(44, 39, 33, 0.08);
  border-width: 1px;
  padding-left: var(--dl-space-space-twounits);
  border-radius: 12px;
  margin-bottom: var(--dl-space-space-unit);
  padding-right: var(--dl-space-space-twounits);
  flex-direction: column;
  padding-bottom: 20px;
  justify-content: space-between;
  background-color: var(--dl-color-scheme-white);
}
.footer-column {
  width: 15%;
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--dl-space-space-oneandhalfunits);
  flex-direction: column;
  justify-content: flex-start;
}
.before-heading {
  font-size: 14px;
  font-style: normal;
  font-family: Urbanist;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
}
.brand-name {
  font-size: 20px;
  font-style: normal;
  font-family: Urbanist;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  text-decoration: none;
}
.navbar-link {
  font-size: 16px;
  font-style: normal;
  font-family: Titillium Web;
  font-weight: 600;
  line-height: 1.5;
  text-transform: none;
  text-decoration: none;
}
.content {
  font-size: 16px;
  font-family: Titillium Web;
  font-weight: 400;
  line-height: 1.15;
  text-transform: none;
  text-decoration: none;
}

@media(max-width: 767px) {
  .navbar-burger-menu {
    display: flex;
  }
  .section-container {
    padding-top: var(--dl-space-space-fourunits);
    padding-bottom: var(--dl-space-space-fourunits);
  }
  .footer-column {
    width: 30%;
  }
}
@media(max-width: 479px) {
  .footer-column {
    width: 50%;
  }
}


          .home-main-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .home-main-max-width {
            align-items: center;
          }
          .home-main-content {
            flex: 0 0 auto;
            width: 45%;
            display: flex;
            align-items: flex-start;
            margin-right: var(--dl-space-space-twounits);
            margin-bottom: var(--dl-space-space-threeunits);
            flex-direction: column;
          }
          .home-main-subtitle {
            color: var(--dl-color-scheme-orange100);
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-main-title {
            color: #e8c7c7;
            font-size: 52px;
            font-style: normal;
            font-family: Urbanist;
            font-weight: 600;
            line-height: 1.2;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-main-text {
            font-style: normal;
            font-family: Urbanist;
            font-weight: 600;
          }
          .home-main-text1 {
            font-style: normal;
            font-family: Urbanist;
            font-weight: 600;
          }
          .home-main-description {
            color: var(--dl-color-scheme-white);
            font-size: 18px;
            line-height: 1.5;
            margin-bottom: var(--dl-space-space-threeunits);
          }
          .home-main-container1 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: stretch;
            flex-direction: row;
          }
          .home-main-feature-card {
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-twounits);
            align-items: center;
            padding-left: 4px;
            flex-direction: column;
            background-color: #f7eded;
          }
          .home-main-icon {
            fill: #595959;
            width: var(--dl-size-size-small);
            height: var(--dl-size-size-small);
          }
          .home-main-text2 {
            font-style: normal;
            margin-top: var(--dl-space-space-unit);
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-main-text3 {
            color: #999999;
            text-align: center;
          }
          .home-main-text4 {
            font-size: 0.75rem;
            margin-top: var(--dl-space-space-unit);
            font-weight: 500;
          }
          @media (max-width: 991px) {
            .home-main-content {
              width: 50%;
              margin-right: var(--dl-space-space-unit);
            }
          }
          @media (max-width: 767px) {
            .home-main-max-width {
              flex-direction: column-reverse;
            }
            .home-main-content {
              width: 100%;
              margin-right: 0px;
            }
          }
        `}
      </style>
    </>
  )
}

export default HomeMain

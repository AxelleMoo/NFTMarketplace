import React from 'react';
import Image from 'next/image';
import {TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti';
import {RiSendPlaneFill, iSendPlaneFill} from 'react-icons/ri'

//INTRNAL IMPORT
import images from '../../img'
import {Discover, HelpCenter} from '../NavBar/index';
import Style from './Footer.module.css'

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo" height={100} width={100}/>
          <p>
            Digital marketplace for collectibles and non-fungible tokens (NFTs). Buy, sell, trade
            exclusive digital items on this webiste.
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook/>
            </a>
            <a href="#">
              <TiSocialTwitter/>
            </a>
            <a href="#">
              <TiSocialYoutube/>
            </a>
            <a href="#">
              <TiSocialInstagram/>
            </a>
            <a href="#">
              <TiSocialLinkedin/>
            </a>
          </div>
        </div>
        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover/>
        </div>
        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter/>
        </div>
        <div className={Style.subscibe}>
          <h3>Subscribe</h3>
          <div className={Style.subscribe_box}>
            <input type='email' placeholder='Enter you email *'/>
            <RiSendPlaneFill className={Style.subscribe_box_send}/>
          </div>
          <div className={Style.subscribe_box_info}>
            <p>Discover, collect, and sell extaordinary NFTs is the first largest NFT maretplace</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
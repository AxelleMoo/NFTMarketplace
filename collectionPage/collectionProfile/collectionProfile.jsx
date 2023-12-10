import React from 'react'
import Image from 'next/image'
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

import Style from './collectionProfile.module.css'
import images from "../../img"

const collectionProfile = () => {
  const cardArray = [1,2,3,4];
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image src={images.nft_image_1} alt="nft image" width={300} height={300} className={Style.collectionProfile_box_left_img}/>

          <div className={Style.collectionProfile_box_left_social}>
          <a href="#">
              <TiSocialFacebook/>
            </a>
            <a href="#">
              <TiSocialInstagram/>
            </a>
            <a href="#">
              <TiSocialLinkedin/>
            </a>
            <a href="#">
              <TiSocialTwitter/>
            </a>
          </div>
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>Awesome NFT collection</h1>
          <p>Experience this unique collection of bunnies. Created by a 9 year old and designed for a masterthesis at kuleuven.</p>

          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el,i) =>(
              <div className={Style.collectionProfile_box_middle_box_item}>
                <small>${i+1}95,4683</small>
                <span>+ {i+2}.11%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default collectionProfile
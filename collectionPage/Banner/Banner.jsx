import React from 'react'

import Image from "next/image"

import Style from "./Banner.module.css"

const Banner = ({bannerImage}) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image className={Style.banner_img_img} src={bannerImage} alt="background" width={1600} height={300}/>
      </div>

      <div className={Style.banner_img_mobile}>
      <Image className={Style.banner_img_img} src={bannerImage} alt="background" width={1600} height={900}/>
      </div>
    </div>
  )
}

export default Banner
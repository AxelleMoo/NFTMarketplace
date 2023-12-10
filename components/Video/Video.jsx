import React from 'react'
import Image from "next/image"

import Style from './Video.module.css'
import images from '../../img'

const Video = () => {
  return (
    <div className={Style.Video}>
        <div className={Style.Video_box}>
            <h1>
                <span>🎬</span>The Videos
            </h1>
            <p>Check out our most popular videos. View more with perspectives on just about any topic.</p>

            <div className={Style.Video_box_frame}>
                <div className={Style.Video_box_frame_left}>
                    <Image  className={Style.Video_box_frame_left_img} src={images.nftvideo} alt="Video image" width={1920} height={1080}/>  
                </div>
                
                <div className={Style.Video_box_frame_right}>Hey</div>
            </div>
        </div>
    </div>
  )
}

export default Video
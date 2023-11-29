import React from 'react';
import Image from 'next/image';

//INTERNAL IMPORTS
import Style from './Notification.module.css';
import images from '../../../img';

const Notification = () => {
  return (
    <div className={Style.notification}>
      <p>Notification</p>
      <div className={Style.notification_box}>
        <div className={Style.notification_box_img}>
          <Image src={images.user1} alt="profile image" width={50} height={50}/>
        </div>
        <div className={Style.notification_box_innfo}>
          <h4>Shoaib Akhter</h4>
          <p>Measures action your user..</p>
          <small>3 minutes ago</small>
        </div>
        <span className={Style.notification_box_new}></span>
      </div>
    </div>
  )
}

export default Notification
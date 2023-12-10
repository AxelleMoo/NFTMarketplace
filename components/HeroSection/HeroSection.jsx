import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image';

import Style from './HeroSection.module.css';
import { Button } from '../componentsindex';
import images from '../../img';

//SMART CONTRACT IMPORT
import { NFTMarktplaceContext } from '@/Context/NFTMarketplaceContext';

const HeroSection = () => {
  const {titleData} = useContext(NFTMarktplaceContext)
  return (
    <div className={Style.heroSection}>
        <div className={Style.heroSection_box}>
            <div className={Style.heroSection_box_left}>
                <h1>{titleData}</h1>
                <p>Discover the most outstanding NFTS in all topics and sell them</p>
                <Button btnName='Start your search'/>
            </div>
            
        </div>
    </div>
  )
}

export default HeroSection

//Line 17
//<div className={Style.heroSection_box_right}>
//<Image src={images.hero} alt="Hero Section" width={600} height={600}/>
//</div>
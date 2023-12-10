import React from 'react'

import Style from './NFTDetailsPage.module.css'
import { NFTDescription, NFTDetailsImg, NFTTabs } from './NFTDetailsIndex'

const NFTDetailsPage = ({nft}) => {
  return (
    <div className={Style.NFTDetailsPage}>
        <div className={Style.NFTDetailsPage_box}>
            <NFTDetailsImg nft={nft}/>
            <NFTDescription nft={nft}/>
        </div>
    </div>
  )
}

export default NFTDetailsPage
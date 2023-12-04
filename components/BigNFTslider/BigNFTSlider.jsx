import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {AiFillFire, AiFillHeart, AiOutlineHeight} from 'react-icons/ai';
import { MdVerified, MdTimer } from 'react-icons/md';
import { TbArrowBigLeftLines, TbArrowBigRightLine } from 'react-icons/tb';

import Style from './BigNFTSlider.module.css';
import images from '../../img';
import { Button } from '../componentsindex';

const BigNFTSlider = () => {
    const [idNumber, setIdNumber] = useState(1);

    const sliderData = [
        {
            title: "hello",
            id: 1,
            name: "Axelle Moortgat",
            collection: "OnChainBunnies",
            price: "0.0005 ETH",
            like: 243,
            image: images.user1,
            nftImage: images.nft_image_1,
            time:{
                days:27,
                hours: 10,
                minutes: 11,
                seconds: 5
            }
        },
        {
            title: "bunnie 2",
            id: 2,
            name: "Axelle Moortgat",
            collection: "OnChainBunnies",
            price: "0.0005 ETH",
            like: 243,
            image: images.user2,
            nftImage: images.nft_image_2,
            time:{
                days:27,
                hours: 10,
                minutes: 11,
                seconds: 5
            }
        },
        {
            title: "bunnie 3",
            id: 3,
            name: "Axelle Moortgat",
            collection: "OnChainBunnies",
            price: "0.0005 ETH",
            like: 243,
            image: images.user3,
            nftImage: images.nft_image_3,
            time:{
                days:27,
                hours: 10,
                minutes: 11,
                seconds: 5
            }
        },
        {
            title: "bunnie 4",
            id: 4,
            name: "Axelle Moortgat",
            collection: "OnChainBunnies",
            price: "0.0005 ETH",
            like: 243,
            image: images.user4,
            nftImage: images.nft_image_1,
            time:{
                days:27,
                hours: 10,
                minutes: 11,
                seconds: 5
            }
        }
    ]
    const inc = useCallback(() =>{
        if(idNumber + 1 <sliderData.length){
            setIdNumber(idNumber+1);
        }
    }, [idNumber, sliderData.length]);

    const dec = useCallback(() =>{
        if(idNumber > 0){
            setIdNumber(idNumber - 1);
        }
    }, [idNumber]);


  return (
    <div className={Style.bigNFTSlider}>
        <div className={Style.bigNFTSlider_box}>
            <div className={Style.bigNFTSlider_box_left}>
                <h2>{sliderData[idNumber].title}</h2>
                <div className={Style.bigNFTSlider_box_left_creator}>
                    <div className={Style.bigNFTSlider_box_left_creator_profile}>
                        <Image className={Style.bigNFTSlider_box_left_creator_profile_img} src={sliderData[idNumber].image} alt="profile image" width={50} height={50}/>
                        <div className={Style.bigNFTSlider_box_left_creator_profile_index}>
                            <p>Creator</p>
                            <h4>{sliderData[idNumber].name} 
                                <span><MdVerified/></span>
                            </h4>
                        </div>
                    </div>
                    <div className={Style.bigNFTSlider_box_left_creator_collection}>
                        <AiFillFire className={Style.bigNFTSlider_box_left_creator_collection_icon}/>
                        <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
                            <p>Collection</p>
                            <h4>{sliderData[idNumber].collection}</h4>
                        </div>
                    </div>
                </div>
                <div className={Style.bigNFTSlider_box_left_bidding}>
                    <div className={Style.bigNFTSlider_box_left_bidding_box}>
                        <small>Current Bid</small>
                        <p>{sliderData[idNumber].price} <span>$221,21</span></p>
                    </div>
                    <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                        <MdTimer className={Style.bigNFTSlider_box_left_bidding_box_icon}/>
                        <span>Auction ending in</span>
                    </p>

                    <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>{sliderData[idNumber].time.days}</p>
                            <span>days</span>
                        </div>

                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>{sliderData[idNumber].time.hours}</p>
                            <span>hours</span>
                        </div>
                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>{sliderData[idNumber].time.minutes}</p>
                            <span>mins</span>
                        </div>
                        <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                            <p>{sliderData[idNumber].time.seconds}</p>
                            <span>secs</span>
                        </div>
                    </div>
                    <div className={Style.bigNFTSlider_box_left_button}>
                        <Button btnName='Place' handleClick={() => {}}/>
                        <Button btnName='View' handleClick={() => {}}/>
                    </div>
                </div>
                <div className={Style.bigNFTSlider_box_left_sliderBtn}>
                    <TbArrowBigLeftLines className={Style.bigNFTSlider_box_left_sliderBtn_icon} onClick={()=>dec()}/>
                    <TbArrowBigRightLine className={Style.bigNFTSlider_box_left_sliderBtn_icon} onClick={()=>inc()}/>
                </div>
            </div>


            <div className={Style.bigNFTSlider_box_right}>
                <div className={Style.bigNFTSlider_box_right_box}>
                    <Image className={Style.bigNFTSlider_box_right_box_img} src={sliderData[idNumber].nftImage} alt="NFT Image"/>

                    <div className={Style.bigNFTSlider_box_right_box_like}>
                        <AiFillHeart/>
                        <span>{sliderData[idNumber].like}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BigNFTSlider
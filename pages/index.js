import React from 'react';

// INTERNAL IMPORT
import Style from '../styles/index.module.css';
import { HeroSection,Service, BigNFTSlider, Subscribe, Title, Category, Filter, NFTCard, Collection, FollowerTab, AudioLive,Slider } from '@/components/componentsindex';

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection/>
      <Service/>
      <BigNFTSlider/>
      <Title heading="Latest Audio Collection" paragraph="Discover the most outstanding NFts in all topics of life."/>
      <AudioLive/>
      <Title heading="Filter By Collection" paragraph="Discover the most outstanding NFts in all topics of life."/>
      <FollowerTab/>
      <Title heading="Explore NFT Videos" paragraph="Explore the NFTs in the most categories."/>
      <Slider/>
      <Collection/>
      <Title heading="Featured NFTs" paragraph="Discover the most outstanding NFts in all topics of life."/>
      <Filter/>
      <NFTCard/>
      <Title heading="Brows by category" paragraph="Explore the NFTs in the most categories."/>
      <Category/>
      <Subscribe/>
      
    </div>
  )
}

export default Home
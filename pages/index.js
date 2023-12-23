import React, { useContext, useEffect, useState } from 'react';

// INTERNAL IMPORT
import Style from '../styles/index.module.css';
import { HeroSection,Service, BigNFTSlider, Subscribe, Title, Category, Filter, NFTCard, Collection, FollowerTab, AudioLive,Slider, Brand, Video } from '@/components/componentsindex';
import { getTopCreators } from '@/TopCreators/TopCreator';
import { NFTMarktplaceContext } from '@/Context/NFTMarketplaceContext';
import { Loader } from '@/components/componentsindex';

const Home = () => {
  const {checkIfWalletConnected} = useContext(NFTMarktplaceContext);

  useEffect(() => {
    checkIfWalletConnected
  }, []);

  const {fetchNFTs} = useContext(NFTMarktplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  //CREATORS LIST
  const creators = getTopCreators(nfts);

  useEffect(() => {
    fetchNFTs().then((item) =>{
      if (item){
        setNfts(item.reverse());
        setNftsCopy(item);
      }
      
    })
  },[]);
  
  return (
    <div className={Style.homePage}>
      <HeroSection/>
      <Service/>
      <BigNFTSlider/>
      <Title heading="Latest Audio Collection" paragraph="Discover the most outstanding NFts in all topics of life."/>
      <AudioLive/>
      <Title heading="Filter By Collection" paragraph="Discover the most outstanding NFts in all topics of life."/>
      {creators.length == 0 ? (
        <Loader/>
      ): (
        <FollowerTab TopCreators={creators}/>
      )}
      <Title heading="Explore NFT Videos" paragraph="Explore the NFTs in the most categories."/>
      <Slider/>
      <Collection/>
      <Title heading="Featured NFTs" paragraph="Discover the most outstanding NFts in all topics of life."/>
      <Filter/>
      {nfts.length == 0 ? <Loader/> : <NFTCard NFTData={nfts}/>}
    
      <Title heading="Brows by category" paragraph="Explore the NFTs in the most categories."/>
      <Category/>
      <Subscribe/>
      <Brand/>
      <Video/>
    </div>
  )
}

export default Home
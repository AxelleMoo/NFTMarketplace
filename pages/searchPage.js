import React, {useState, useEffect, useContext} from 'react'

import Style from '../styles/searchPage.module.css'
import { Slider, Brand } from '@/components/componentsindex'
import { SearchBar } from '@/searchPage/searchBarIndex'
import  {Filter }from '@/components/componentsindex'
import { Loader } from '@/components/componentsindex'
import { NFTCardTwo, Banner } from '@/collectionPage/collectionindex'
import images from '../img'

//IMPORT SC
import { NFTMarktplaceContext } from '@/Context/NFTMarketplaceContext';

const searchPage = () => {
  const {fetchNFTs, setError} = useContext(NFTMarktplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    try{
      fetchNFTs().then((item) =>{
        if (item){
          setNfts(item.reverse());
          setNftsCopy(item);
        }
        
      })
    } catch (error){
        setError("Please reload the browser")
    }
    
  },[]);

  const onHandleSearch = (value)=>{
    const filteredNFTS = nfts.filter(({name}) =>
    name.toLowerCase().includes(value.toLowerCase()));

    if(filteredNFTS.length === 0){
      setNfts(nftsCopy);
    } else{
      setNfts(filteredNFTS);
    }
    }
  
    const onClearSearch = () => {
      if (nfts.length && nftsCopy.length){
        setNfts(nftsCopy);
      }
    }
  // const collectionArray = [
  //     images.nft_image_1,
  //     images.nft_image_2,
  //     images.nft_image_3,
  //     images.nft_image_1,
  //     images.nft_image_2,
  //     images.nft_image_3,
  //     images.nft_image_1,
  //     images.nft_image_2,
  //     images.nft_image_3
  // ]
  return (
    <div className={Style.searchPage}>
        <Banner bannerImage={images.creatorbackground2}/>
        <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch}/>
        <Filter/>
        {nfts.length == 0 ? <Loader/>: <NFTCardTwo NFTData={nfts}/>}
        <Slider/>
        <Brand/>
    </div>
  )
}

export default searchPage
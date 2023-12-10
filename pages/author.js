import React,{useState, useEffect,useContext} from 'react'

import Style from '../styles/author.module.css'
import { Banner } from '@/collectionPage/collectionindex'
import {Brand, Title} from "../components/componentsindex"
import images from "../img"
import { AuthorProfileCard, AuthorTaps, AuthorNFTCardBox } from '@/authorPage/componentindex'
import FollowerTabCard from '@/components/FollowerTab/FollowerTabCard/FollowerTabCard'

//IMPORT SC
import { NFTMarktplaceContext } from '@/Context/NFTMarketplaceContext'

const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "d84ff74hf99999f9974hf774f99f",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "d84ff74hf99999f9974hf774f99f",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "d84ff74hf99999f9974hf774f99f",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "d84ff74hf99999f9974hf774f99f",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "d84ff74hf99999f9974hf774f99f",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "d84ff74hf99999f9974hf774f99f",
    },
  ];

  const [collectables, setCollectables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  const { fetchMyNFTsOrListedNFTs, currentAccount} = useContext(NFTMarktplaceContext);

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
      setNfts(items);
    })
  }, []);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
      setMyNFTs(items);
    })
  }, []);
  return (
    <div className={Style.banner}>
      <Banner bannerImage={images.creatorbackground2}/>
      <AuthorProfileCard currentAccount={currentAccount}/>
      <AuthorTaps setCollectables={setCollectables} setCreated={setCreated} setLike={setLike} setFollower={setFollower} setFollowing={setFollowing}/>
      <AuthorNFTCardBox  collectables={collectables} created={created} like={like} follower={follower} following={following} nfts={nfts} myNFTs={myNFTs}/>
      <Title heading="Popular Creators" paragraph="Click on music icon and enjoy NFT music or audio"/>
      <div className={Style.author_box}>
        {followerArray.map((el,i) => (
          <FollowerTabCard i={i} el={el} key={i+1}/>
        ))}
      </div>
      <Brand/>
    </div>
  )
}

export default author
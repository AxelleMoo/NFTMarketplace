import React, {useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/router';


import { Button, Category,Brand } from '@/components/componentsindex'
import NFTDetailsPage from '@/NFTDetailsPage/NFTDetailsPage'
// import Style from 

//IMPORT SC
import { NFTMarktplaceContext } from '@/Context/NFTMarketplaceContext';

const NFTDetails = () => {

  const {currentAccount} = useContext(NFTMarktplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: ""
});

  const router = useRouter();
  useEffect(() => {
    if(!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);
  return (
    <div>
        <NFTDetailsPage nft={nft}/>
        <Category/>
        <Brand/>
    </div>
  )
}

export default NFTDetails
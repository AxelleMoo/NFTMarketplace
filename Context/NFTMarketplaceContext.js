import React, {useState, useEffect, useContext} from 'react';
import web3Modal from "web3modal";
import { ethers } from 'ethers';
import {useRouter} from "next/router";
import axios from "axios";
import {create as ipfsHttpClient} from "ipfs-http-client"

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNzg0MGZlMS1jOWZlLTQzMTctOTMxMi1hYjY3YmM0NWRkMWEiLCJlbWFpbCI6Im1vb3J0Z2F0LmF4ZWxsZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODdmZTA3M2ZiM2YyZjA2YjY3MmQiLCJzY29wZWRLZXlTZWNyZXQiOiI4ODc1YjVjYWYyNGM3NWQxZGEzMjVlMTgxY2E5NWY3MzM2ZDVkYjE1OWNlYjM4MDdhYWI2YzY0ZTUxZTEzZWE0IiwiaWF0IjoxNzAyMDQ0OTExfQ.lIq3lLbHqkBqZ7onklF4DwCc1W6zMjst0dIiZyVdnoI'

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// const projectId = "your id";
// const projectSecretKey = "secret key";
// const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`;

// const subdomain = "your subdomain";

// const client = ipfsHttpClient({
//     host: "infura-ipfs.io",
//     port: 5001,
//     protocol: "https",
//     headers: {
//         authorization: auth
//     }
// });

import {NFTMarketplaceAddress, NFTMarketplaceABI} from "./constant"

//FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider);

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartcontract = async()=> {
    try {
        // const web3modal = new web3Modal();
        // const connection = await web3modal.connect();
        // const provider = new ethers.providers.Web3Provider(connection);
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        // const { address, chainId, isConnected } = web3Modal.useWeb3ModalAccount()
        // const { walletProvider } = web3Modal.useWeb3ModalProvider()
        // const ethersProvider =  new ethers.BrowserProvider(walletProvider)
        // const signer = await ethersProvider.getSigner()
        // const contract = fetchContract(signer);

        return contract

    }catch(error) {
        console.log(error);
        console.log("something went wrong while connecting with smart contract")
    }
}


export const NFTMarktplaceContext = React.createContext();

export const NFTMarketplaceProvider = (({children}) => {
    const titleData = "Discover, collect, and sell NFTS"
    //___USESTATE
    const [currentAccount, setCurrentAccount] = useState(" ");
    const router = useRouter();

    //UPLOAD TO IPFS FUNCTION
    // const uploadToIPFS = async(file) => {
    //     try {
    //         const added = await client.add({content: file});
    //         const url = `${subdomain}/ipfs/${added.path}`;
    //         return url;
    //     } catch(error){
    //         console.log("Error Uploading to IPFS");
    //     }
    // }

    //UPLOAD TO PINATA FUNCTION
    const uploadToPinata = async(file) => {

        console.log(file)
        if (file) {
            try {
                const formData = new FormData();
                
                formData.append("file", file);

           

                const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'Authorization': `Bearer ${JWT}`
                }
                });
                console.log(res.data)
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
                return ImgHash;
            } catch(error){
                console.log(error);
            }
        }
    }

    //CHECK IF WALLET IS CONNECTED
    const checkIfWalletConnected = async() => {
        try{
            if(!window.ethereum) return console.log("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            })

            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{
                console.log("No account found")
            }

        }
        catch(error){
            console.log("Something wrong while connecting to wallet")
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    //CONNECT WALLET FUNCTION
    const connectWallet = async()=>{
        try{
            if(!window.ethereum) return console.log("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })

            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log("Error while connecting to wallet")
        }
    }

    //CREATE NFT
    const createNFT = async(name, price, image, description, router)=>{
        if (!name || !description || !price || !image){
            return console.log("Data is missing")
        }
        const data = JSON.stringify({ name, description, image});

        try{
            
            const response = await axios({
                method: "POST",
                url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data: data,
                headers: {
                    'Authorization': `Bearer ${JWT}`,
                    "Content-Type": "application/json",
                },
            });

            const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

            console.log(url)

            await createSale(url, price);

        }catch(error){
            console.log("Error while creating NFT")
        }
    }

    const createSale = async(url, formInputPrice, isReselling, id)=>{
        try{
            
            // const price = ethers.utils.parseUnits(formInputPrice, "ether")
            const price = ethers.parseUnits(formInputPrice, "ether")
            const contract = await connectingWithSmartcontract()

            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling ? await contract.createToken(url, price, {value: listingPrice.toString()
            }) : await contract.reSellToken(url, price, {value: listingPrice.toString()})

            await transaction.wait();
            router.push('./searchPage')
        }catch(error){
            console.log(error)
            console.log("error while creating sell")
        }
    }

    

    //FETCHNFTS FUNCTION
    const fetchNFTs = async ()=>{
        try{
            const provider = new ethers.JsonRpcProvider();
            // const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();

            const items = await Promise.all(data.map(
                async({tokenId, seller, owner, price: unformattedPrice}) =>{
                    const tokenURI = await contract.tokenURI(tokenId);

                    const{
                        data: {image, name, description},
                    } = await axios.get(tokenURI);

                    // const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");
                    const price = ethers.formatUnits(unformattedPrice.toString(), "ether");
                    console.log(typeof tokenId)
                    return {
                        price, 
                        tokenId: Number(tokenId),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    };
                }
            )
        );
        return items;

        }catch(error){
            console.log(error)
            console.log("error while fetching nft")
        }
    }

    useEffect(() => {
        fetchNFTs();
    }, []);

    //FETCHING MY NFT O LISTED NFTs
    const fetchMyNFTsOrListedNFTs = async(type)=>{
        try{
            const contract = await connectingWithSmartcontract();

            const data =
            type == "fetchItemsListed"
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFTs();
            
            const items = await Promise.all(
                data.map(async ({tokenId, seller, owner, price: unformattedPrice}) =>{
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image, name, description}
                    } = await axios.get(tokenURI);

                    // const price = ethers.utils.formatUnits(
                    //     unformattedPrice.toString(),
                    //     "ether"
                    // );

                    const price = ethers.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    
                    return{
                        price, 
                        tokenId: Number(tokenId), 
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    }
                })
            );
        return items;
        }catch(error){
            console.log(error)
            console.log("fail while fetching my nfts")
        }
    }

    useEffect(() => {
        fetchNFTs();
    }, []);


    //BUY NFTs FUNCTION
    const buyNFT = async (nft) =>{
        try{
            const contract = await connectingWithSmartcontract();
            // const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
            const price = ethers.parseUnits(nft.price.toString(), "ether");

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price
            });

            await transaction.wait()
            router.push("/author")
        } catch (error){
            console.log(error)
            console.log("Error while buying NFT")
        }
    }

    return (
        <NFTMarktplaceContext.Provider 
        value={{
            titleData,
            checkIfWalletConnected,
            connectWallet,
            uploadToPinata,
            createNFT,
            fetchNFTs,
            fetchMyNFTsOrListedNFTs,
            buyNFT,
            checkIfWalletConnected,
            currentAccount
            }}>
            {children}
        </NFTMarktplaceContext.Provider>
    )
})
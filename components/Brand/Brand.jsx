import React from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

const Brand = () => {
  return (
    <div className={Style.Brand}>
        <div className={Style.Brand_box}>
            <div className={Style.Brand_box_left}>
                <Image src={images.logo} alt="brand logo" width={100} height={100}/>
                <h1>Earn free crypto with Ciscrypt</h1>
                <p>A creative agency that lead and inspire.</p>

                <div className={Style.Brand_box_left_btn}>
                    <Button btnName="Create" handleClick={() => {}}/>
                    <Button btnName="Discover" handleClick={() => {}}/>
                </div>
            </div>
            <div className={Style.Brand_box_left}>
                <Image className={Style.Brand_box_left_img} src={images.earn} alt="brand logo" width={800} height={600}/>
            </div>
        </div>
    </div>
  )
}

export default Brand
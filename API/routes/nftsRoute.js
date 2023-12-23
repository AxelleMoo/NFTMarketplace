const express = require("express");
const nftControllers = require("./../controllers/nftControllers");
const authController = require("./../controllers/authController")

const router = express.Router();

// router.param("id", nftControllers.checkId);

//TOP 5 NFTS BY PRICE
router
  .route("/top-5-nfts")
  .get(nftControllers.aliasTopNFTs, nftControllers.getAllNfts);

//STATS ROUTER
router.route("/nfts-stats").get(nftControllers.getNFTsStats);

//GET MONTLY PLAN
router.route("/monthly-plan/:year").get(nftControllers.getMonthlyPan);

//ROUTERS NFTS
router
    .route("/")
    .get(authController.protect, nftControllers.getAllNfts)
    .post(nftControllers.createNFT);

router
  .route("/:id")
  .get(nftControllers.getSingleNFT)
  .patch(nftControllers.updateNFT)
  .delete(authController.protect, authController.restrictTo("admin", "guide"), nftControllers.deleteNFT);

module.exports = router;

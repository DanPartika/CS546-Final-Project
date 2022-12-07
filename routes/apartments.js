//require express and express router as shown in lecture code
//! to implement a map https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-javascript
const express = require("express");
const router = express.Router();
const data = require("../data");
const apartmentsData = data.Apartments;
const usersData = data.users
const { ObjectId } = require("mongodb");
const helpers = require("../helpers");

router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      return res.sendFile(path.resolve('static/homepage.html'));
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

router.route("/apartments") //apt list
  .get(async (req,res) => {
    return res.render()
  })
  .post(async (req, res) => {

  });

router
  .route("/apartments/:ApartmentId") //singular apt
  .get(async (req, res) => {
    //code here for GET
    req.params.ApartmentId = req.params.ApartmentId.trim();
    if (!ObjectId.isValid(req.params.ApartmentId)) {
      res.status(400).json({ error: "invalid ObjectId" });
      return;
    }
    try {
      const mov = await apartmentsData.getApartmentById(req.params.ApartmentId);
      res.status(200).json(mov);
    } catch (e) {
      res.status(404).json({ error: "Apartment not found" });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    //!make sure user is logged in
    if (!req.params.ApartmentId) { 
      res.status(400).json({ error: "You must supply id to delete Apartment" });
      return;
    }

    req.params.ApartmentId = req.params.ApartmentId.trim();

    if (!ObjectId.isValid(req.params.ApartmentId)) {
      res.status(400).json({ error: "Invalid ObjectID" });
      return;
    }
    try {
      const deleted = await apartmentsData.removeApartment(
        req.params.ApartmentId
      );
      let del = { ApartmentId: req.params.ApartmentId, deleted: true };
      res.status(200).json(del);
    } catch (e) {
      res.status(404).json({ error: e });
      return;
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    if (!req.params.ApartmentId) {
      res.status(400).json({ error: "must supply and ID to delete" });
      return;
    }
    req.params.ApartmentId = req.params.ApartmentId.trim();
    if (!ObjectId.isValid(req.params.ApartmentId)) {
      res.status(400).json({ error: "Invalid ObjectID" });
      return;
    }

    let ApartmentsPData = req.body;
    try {
      let params = helpers.checkApartmentParameters(apartmentName, streetAddress,rentPerMonth,rentDuration, maxResidents, numBedrooms, numBathrooms, laundry, floorNum, roomNum, appliancesIncluded, maxPets, utilitiesIncluded);

    } catch (e) {
      //console.log("ERROR")
      res.status(400).json({ error: e });
      return;
    }

    try {
      
      res.status(200).json(newPost);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

module.exports = router;

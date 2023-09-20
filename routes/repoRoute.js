import express from "express";
import {
  createRepoController,
  getRepoController,
  deleteRepoController,
  getSingleRepoController,
  searchRepoController,
  updateRepoController,
  RepoListController,
  RepoCountController
} from "../controllers/repoController.js";
import {requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Create repo
router.post(
  "/create-Repo",
  requireSignIn,
  createRepoController
);
//Update Repo
router.put(
  "/update-Repo/:pid",
  requireSignIn,
  updateRepoController
);

//get Repos
router.get("/get-Repo", getRepoController);

//single Repo
router.get("/get-Repo/:rid", getSingleRepoController);

//delete Repo
router.delete("/delete-Repo/:rid", deleteRepoController);


//Repo per page
router.get("/Repo-list", RepoListController);

//Repo per page
router.get("/Repo-count/:ownerId", RepoCountController);

//search Repo
router.get("/search/:keyword", searchRepoController);

export default router;
import repoModel from "../models/repoModal.js";
import dotenv from "dotenv";
dotenv.config();

export const createRepoController = async (req, res) => {
    try {
        const { name, description, owner, HTML, CSS, JS } = req.body;
        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !owner:
                return res.status(500).send({ error: "Owner is Required" });

        }
        const repo = new repoModel({ name, description, owner, HTML, CSS, JS });
        await repo.save();
        res.status(201).send({
            success: true,
            message: "Repository Created Successfully",
            repo,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Repo",
        });
    }
};

//get all Repos
export const getRepoController = async (req, res) => {
    try {
        const Repos = await repoModel
            .find({})
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            counTotal: Repos.length,
            message: "All Repos Fetched",
            Repos,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Erorr in getting Repos",
            error: error.message,
        });
    }
};
// get single Repo
export const getSingleRepoController = async (req, res) => {
    try {
        const Repo = await repoModel
            .findOne({ _id: req.params.rid })
        res.status(200).send({
            success: true,
            message: "Single Repo Fetched",
            Repo,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Eror while getitng single Repo",
            error,
        });
    }
};

//delete controller
export const deleteRepoController = async (req, res) => {
    try {
        await repoModel.findByIdAndDelete(req.params.rid);
        res.status(200).send({
            success: true,
            message: "Repo Deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while deleting Repo",
            error,
        });
    }
};


//upate Repo
export const updateRepoController = async (req, res) => {
    try {
        const { name, description, HTML, CSS, JS } = req.body;

        const Repos = await repoModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.body },
            { new: true }
        );
        await Repos.save();
        res.status(201).send({
            success: true,
            message: "Repo Updated Successfully",
            Repos,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte Repo",
        });
    }
};

// filters
export const RepoFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const Repos = await repoModel.find(args);
        res.status(200).send({
            success: true,
            Repos,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Repos",
            error,
        });
    }
};

export const RepoCountController = async (req, res) => {
    try {
        // Assuming you receive the owner ID in the query parameters
        const ownerId = req.params.ownerId;

        if (!ownerId) {
            return res.status(400).send({
                success: false,
                message: "Owner ID is required",
            });
        }

        const total = await repoModel.countDocuments({ owner: ownerId });

        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error in Repo count",
            error,
            success: false,
        });
    }
};


export const RepoListController = async (req, res) => {
    try {
        const limit = 9;
        const page = req.query.page ? req.query.page : 1;
        const startIndex = (page - 1) * limit;
        const endIndex = limit;

        // Assuming you receive the owner ID in the request query parameters
        const ownerId = req.query.ownerId;

        if (!ownerId) {
            return res.status(400).send({
                success: false,
                message: "Owner ID is required",
            });
        }

        const options = {
            // Add a filter for owner ID
            owner: ownerId,
        };

        // Modify the projection to include the desired fields
        const projection = { _id: 1, name: 1, description: 1 };

        const Repos = await repoModel
            .find(options)
            .select(projection)
            .skip(startIndex)
            .limit(endIndex);

        res.status(200).send({
            success: true,
            Repos,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in retrieving repositories",
            error,
        });
    }
};


// search Repo
export const searchRepoController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await RepoModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error In Search Repo API",
            error,
        });
    }
};

// similar Repos
export const realtedRepoController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const Repos = await RepoModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(6)
            .populate("category");
        res.status(200).send({
            success: true,
            Repos,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error while geting related Repo",
            error,
        });
    }
};



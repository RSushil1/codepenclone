import repoModel from "../models/repoModal.js";
import dotenv from "dotenv";
dotenv.config();

export const createRepoController = async (req, res) => {
    try {
        const { name, description, HTML, CSS, JS } = req.fields;
        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });

        }
        const repo = new repoModel({ name, description, HTML, CSS, JS });
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
            message: "Error in crearing Repo",
        });
    }
};

//get all Repos
export const getRepoController = async (req, res) => {
    try {
        const Repos = await RepoModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            counTotal: Repos.length,
            message: "All Repos ",
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
        const Repo = await RepoModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
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

// get photo
export const RepoPhotoController = async (req, res) => {
    try {
        const Repo = await RepoModel.findById(req.params.pid).select("photo");
        if (Repo.photo.data) {
            res.set("Content-type", Repo.photo.contentType);
            return res.status(200).send(Repo.photo.data);
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};

//delete controller
export const deleteRepoController = async (req, res) => {
    try {
        await RepoModel.findByIdAndDelete(req.params.pid).select("-photo");
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
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const Repos = await RepoModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            Repos.photo.data = fs.readFileSync(photo.path);
            Repos.photo.contentType = photo.type;
        }
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
        const Repos = await RepoModel.find(args);
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

// Repo count
export const RepoCountController = async (req, res) => {
    try {
        const total = await RepoModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        res.status(400).send({
            message: "Error in Repo count",
            error,
            success: false,
        });
    }
};

// Repo list base on page
export const RepoListController = async (req, res) => {
    try {
        const perPage = 9;
        const page = req.params.page ? req.params.page : 1;
        const Repos = await RepoModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            Repos,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
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

// get prdocyst by catgory
export const RepoCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const Repos = await RepoModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            Repos,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting Repos",
        });
    }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
    }
};

//payment
export const brainTreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        Repos: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
    }
};

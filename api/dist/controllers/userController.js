"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.show = exports.index = exports.store = void 0;
const store = async (req, res) => {
    try {
        console.log("connected store user");
        return res.status(200).json({ message: "store user" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
};
exports.store = store;
const index = async (req, res) => {
    try {
        console.log("connected index user");
        return res.status(200).json({ message: "index user" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        console.log("connected show user");
        return res.status(200).json({ message: "show user" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
};
exports.show = show;
const update = async (req, res) => {
    try {
        console.log("connected update user");
        return res.status(200).json({ message: "update user" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
};
exports.update = update;
const destroy = async (req, res) => {
    try {
        console.log("connected destroy user");
        return res.status(200).json({ message: "destroy user" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
};
exports.destroy = destroy;

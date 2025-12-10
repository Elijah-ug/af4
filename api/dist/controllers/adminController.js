"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.show = exports.index = exports.store = void 0;
const db_js_1 = require("../config/db.js");
const store = async (req, res) => {
    try {
        console.log("connected store admin");
        const { name, username, email, role, password } = req.body;
        const admin = await db_js_1.prisma;
        // console.log("Created here==>", admin);
        return res.status(200).json({ message: "store Admin" });
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
        console.log("connected index admin");
        return res.status(200).json({ message: "index Admin (all)" });
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
        console.log("connected show admin");
        return res.status(200).json({ message: "show single Admin" });
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
        console.log("connected update admin");
        return res.status(200).json({ message: "update admin" });
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
        console.log("connected destroy admin");
        return res.status(200).json({ message: "destroy Admin" });
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

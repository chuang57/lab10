const express = require("express");
const router = express.Router();
const data = require("../data");
const showData = data.shows;

router.get("/", async (req, res) => {
	try {
		res.render("shows/finder", { title: "Show Finder" });
	} catch (e) {
		res.status(404);
		res.render("shows/error");
		console.log(e);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const show = await showData.getShowByID(req.params.id);
		res.render("shows/id", { shows: show, title: show.name });
	} catch (e) {
		res.status(404);
		res.render("shows/error");
		console.log(e);
	}
});

router.post("/searchShows", async (req, res) => {
	let showsData = req.body.showSearchTerm;
	try {
		const newShow = await showData.getShowBySearch(showsData);
		if (showsData.trim() === "") {
			res.status(404);
			res.render("shows/emptyshow");
		}
		if (newShow.length == 0) {
			res.render("shows/noshows", { name: showsData });
		} else {
			newShow.length = 5;
			res.render("shows/searchRes", {
				showRes: newShow,
				name: showsData,
				title: "Shows Found",
			});
		}
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

module.exports = router;

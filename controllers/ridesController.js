const { db } = require("../config/firebase");

// POST /api/rides — Post a new ride
const postRide = async (req, res) => {
  try {
    const {
      from,
      to,
      date,
      time,
      seats,
      price,
      description,
      contact
    } = req.body;

    const userId = req.user.uid; // ✅ Extracted from Firebase-authenticated request

    const ride = {
      userId,
      from,
      to,
      date,
      time,
      seats: parseInt(seats),
      price: parseFloat(price),
      description: description || "",
      contact: contact || "",
      createdAt: new Date().toISOString()
    };

    const ref = await db.collection("rides").add(ride);
    res.status(201).json({ rideId: ref.id, ...ride });

  } catch (err) {
    console.error("Post Ride Error:", err);
    res.status(500).json({ error: "Failed to post ride" });
  }
};

// GET /api/rides — Fetch all rides
const getRides = async (req, res) => {
  try {
    const snapshot = await db.collection("rides").get();
    const rides = snapshot.docs.map(doc => ({
      rideId: doc.id,
      ...doc.data()
    }));
    res.status(200).json(rides);
  } catch (err) {
    console.error("Get Rides Error:", err);
    res.status(500).json({ error: "Failed to fetch rides" });
  }
};

// POST /api/rides/match — Match rides by from, to, and date
const matchRides = async (req, res) => {
  try {
    const { from, to, date } = req.body;

    if (!from || !to || !date) {
      return res.status(400).json({ message: "Missing fields: from, to, or date" });
    }

    const snapshot = await db.collection("rides").get();
    const matches = [];

    snapshot.forEach(doc => {
      const ride = doc.data();

      const isFromMatch = ride.from.toLowerCase().includes(from.toLowerCase());
      const isToMatch = ride.to.toLowerCase().includes(to.toLowerCase());
      const isDateMatch = ride.date === date;

      if (isFromMatch && isToMatch && isDateMatch) {
        matches.push({ id: doc.id, ...ride });
      }
    });

    if (matches.length === 0) {
      return res.status(404).json({ message: "No matching rides found" });
    }

    return res.status(200).json(matches);

  } catch (error) {
    console.error("Match Ride Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postRide,
  getRides,
  matchRides
};

const { db } = require("../config/firebase");

const postRide = async (req, res) => {
  try {
    const { userId, departure, destination, date, time, seats, cost } = req.body;

    const ride = {
      userId,
      departure,
      destination,
      date,
      time,
      seats,
      cost,
      createdAt: new Date().toISOString()
    };

    const ref = await db.collection("rides").add(ride);
    res.status(201).json({ rideId: ref.id, ...ride });
  } catch (err) {
    res.status(500).json({ error: "Failed to post ride" });
  }
};

const getRides = async (req, res) => {
  try {
    const snapshot = await db.collection("rides").get();
    const rides = snapshot.docs.map(doc => ({ rideId: doc.id, ...doc.data() }));
    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rides" });
  }
};

module.exports = { postRide, getRides };

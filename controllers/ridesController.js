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

const matchRides = async (req, res) => {
  try {
    const { departure, destination, date } = req.body;

    if (!departure || !destination || !date) {
      return res.status(400).json({ message: "Missing fields: departure, destination, or date" });
    }

    const db = admin.firestore();
    const snapshot = await db.collection("rides").get();

    const matches = [];

    snapshot.forEach(doc => {
      const ride = doc.data();

      const isDepartureMatch = ride.departure.toLowerCase().includes(departure.toLowerCase());
      const isDestinationMatch = ride.destination.toLowerCase().includes(destination.toLowerCase());
      const isDateMatch = ride.date === date;

      if (isDepartureMatch && isDestinationMatch && isDateMatch) {
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
  getRides,
  postRide,
  matchRides // ✅ add here
};

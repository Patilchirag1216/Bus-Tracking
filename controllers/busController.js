import Bus from "../models/bus.js";
import User from "../models/user.js";

// GET all buses
export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get available buses for a conductor
export const getAvailableBuses = async (req, res) => {
  try {
    const userId = req.query.userId; // 👈 pass current conductor id from frontend

    let buses;

    if (userId) {
      // Show unoccupied buses + the bus assigned to THIS conductor
      buses = await Bus.find({
        $or: [
          { isOccupied: false },
          { conductorId: userId }
        ]
      });
    } else {
      // Fallback: only unoccupied
      buses = await Bus.find({ isOccupied: false });
    }

    res.json(buses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ADD a new bus
export const addBus = async (req, res) => {
  try {
    const newBus = new Bus(req.body); // req.body should have bus fields
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE a bus
export const deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE bus info
export const updateBus = async (req, res) => {
  try {
    const updated = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// update bus location
export const updateBusLocation = async (req,res) =>{
  try {
    const { busId, lat, lng } = req.body;
    const updatedBusl = await Bus.findByIdAndUpdate(
      busId,
      { location: { lat, lng } },
      {new:true},
    );
    res.json({
      success: true,
      message: "Bus location updated",
      bus: updatedBusl,
    });
    // res.json(updatedBusl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
  // const { busId, lat, lng } = req.body;

  // const bus = await Bus.findById(busId);

  // if (!bus){
  //   res.send("bus is not exits");

  // }

  // const updatedBusl = await Bus.findByIdAndUpdate(
  //   busId,
  //   { Location: { lat, lng } },
  //   {new:true},
  // );

  // res.send(updatedBusl);
}

// Assign bus to conductor

export const assignBus = async (req, res) => {
  try {
    const { busId, userId, action } = req.body;

    // Fetch the user to check if they already have a bus
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (action === "select") {
      // Check if user already has a bus
      if (user.busId) {
        return res.status(400).json({ 
          success: false,
          message: "You can only select one bus at a time" 
        });
      }

      // Check if bus is already occupied
      const bus = await Bus.findById(busId);
      if (!bus) {
        return res.status(404).json({ error: "Bus not found" });
      }
      if (bus.isOccupied) {
        return res.status(400).json({ 
          success: false, 
          message: "Bus is already assigned to another conductor" 
        });
      }

      // Assign the bus
      const updatedBus = await Bus.findByIdAndUpdate(
        busId,
        { isOccupied: true, conductorId: userId },
        { new: true }
      );

      await User.findByIdAndUpdate(userId, { busId: busId });

      return res.json({ success: true, bus: updatedBus });
    }

   
    if (action === "unselect") {
        if (!user.busId) {
          return res.status(400).json({ message: "You are not assigned to any bus." });
        } 

        if (user.busId.toString() !== busId) {
          return res.status(400).json({ message: "You can only unselect your own assigned bus." });
        }

        // Safe to unassign now
        await Bus.findByIdAndUpdate(busId, { isOccupied: false, conductorId: null });
        await User.findByIdAndUpdate(userId, { busId: null });
        return res.json({ success: true });
   }


    res.status(400).json({ error: "Invalid action" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

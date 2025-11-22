import mongoose from "mongoose";
import dotenv from "dotenv";
import Bus from "./models/bus.js";

// Load environment variables
dotenv.config();

const seedBus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    // Clear old data if needed
    await Bus.deleteMany({});

    // Array of 15 buses
    const buses = [
      { routeName: "Pachora to Jalgaon", busNo: "MH 12 B 2020", timing: "9:00 AM - 11:00 AM" },
      { routeName: "Jalgaon to Pachora", busNo: "MH 12 C 1122", timing: "11:30 AM - 1:30 PM" },
      { routeName: "Pune to Mumbai", busNo: "MH 14 D 3344", timing: "6:00 AM - 10:00 AM" },
      { routeName: "Mumbai to Pune", busNo: "MH 14 E 5566", timing: "12:00 PM - 4:00 PM" },
      { routeName: "Nagpur to Amravati", busNo: "MH 31 F 7788", timing: "8:00 AM - 10:30 AM" },
      { routeName: "Amravati to Nagpur", busNo: "MH 31 G 9900", timing: "2:00 PM - 4:30 PM" },
      { routeName: "Nashik to Shirdi", busNo: "MH 15 H 2233", timing: "7:00 AM - 9:00 AM" },
      { routeName: "Shirdi to Nashik", busNo: "MH 15 J 4455", timing: "5:00 PM - 7:00 PM" },
      { routeName: "Aurangabad to Jalna", busNo: "MH 20 K 6677", timing: "9:00 AM - 10:00 AM" },
      { routeName: "Jalna to Aurangabad", busNo: "MH 20 L 8899", timing: "3:00 PM - 4:00 PM" },
      { routeName: "Kolhapur to Satara", busNo: "MH 09 M 1123", timing: "10:00 AM - 12:00 PM" },
      { routeName: "Satara to Kolhapur", busNo: "MH 09 N 3345", timing: "1:00 PM - 3:00 PM" },
      { routeName: "Solapur to Latur", busNo: "MH 13 P 5567", timing: "8:30 AM - 11:30 AM" },
      { routeName: "Latur to Solapur", busNo: "MH 13 Q 7789", timing: "4:00 PM - 7:00 PM" },
      { routeName: "Dhule to Nandurbar", busNo: "MH 18 R 9901", timing: "6:30 AM - 8:30 AM" },
    ];

    await Bus.insertMany(buses);

    console.log("✅ 15 buses seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding buses:", err);
    mongoose.connection.close();
  }
};

seedBus();

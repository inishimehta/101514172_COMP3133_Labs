const mongoose = require("mongoose");

// Email validation (common practical regex)
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// City: only alphabets and spaces
const cityRegex = /^[A-Za-z ]+$/;

// Website: must start with http or https
const urlRegex = /^https?:\/\/.+/i;

// Zipcode: 12345-1234
const zipRegex = /^\d{5}-\d{4}$/;

// Phone: 1-123-123-1234
const phoneRegex = /^1-\d{3}-\d{3}-\d{4}$/;

const GeoSchema = new mongoose.Schema(
  {
    lat: { type: String, required: [true, "address.geo.lat is required"] },
    lng: { type: String, required: [true, "address.geo.lng is required"] }
  },
  { _id: false }
);

const AddressSchema = new mongoose.Schema(
  {
    street: { type: String, required: [true, "address.street is required"] },
    suite: { type: String, required: [true, "address.suite is required"] },
    city: {
      type: String,
      required: [true, "address.city is required"],
      match: [cityRegex, "city must contain only letters and spaces"]
    },
    zipcode: {
      type: String,
      required: [true, "address.zipcode is required"],
      match: [zipRegex, "zipcode must match 12345-1234"]
    },
    geo: { type: GeoSchema, required: [true, "address.geo is required"] }
  },
  { _id: false }
);

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "company.name is required"] },
    catchPhrase: {
      type: String,
      required: [true, "company.catchPhrase is required"]
    },
    bs: { type: String, required: [true, "company.bs is required"] }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], trim: true },

    username: {
      type: String,
      required: [true, "username is required"],
      minLength: [4, "username must be at least 4 characters"],
      maxLength: [100, "username must be at most 100 characters"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true, // duplicates will error with code 11000 [web:110]
      trim: true,
      lowercase: true,
      match: [emailRegex, "email must be valid"]
    },

    address: { type: AddressSchema, required: [true, "address is required"] },

    phone: {
      type: String,
      required: [true, "phone is required"],
      match: [phoneRegex, "phone must match 1-123-123-1234"]
    },

    website: {
      type: String,
      required: [true, "website is required"],
      match: [urlRegex, "website must start with http:// or https://"]
    },

    company: { type: CompanySchema, required: [true, "company is required"] }
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

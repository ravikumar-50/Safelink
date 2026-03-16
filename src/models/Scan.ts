import mongoose, { Schema, model, models } from "mongoose";

const ScanSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    inputText: { type: String, required: true },
    url: { type: String },
    riskScore: { type: Number, required: true },
    riskLevel: { type: String, enum: ["SAFE", "SUSPICIOUS", "DANGEROUS"], required: true },
    reasons: [{ type: String }],
    domainInfo: {
      registrar: String,
      age: String,
      creationDate: String,
    },
    threatIntel: {
      virusTotal: String,
      googleSafeBrowsing: String,
    },
    serverInfo: {
      country: String,
      isp: String,
      ip: String,
    },
    scanDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Scan = models.Scan || model("Scan", ScanSchema);
export default Scan;

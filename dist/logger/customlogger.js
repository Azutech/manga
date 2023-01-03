"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, printf, colorize, simple } =
  winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const labelTimestamps = combine(
  label({ label: "boom" }),
  timestamp(),
  myFormat
);
const logger = (0, winston_1.createLogger)({
  level: "debug",
  format: labelTimestamps,
  exitOnError: false,
  transports: [
    new winston_1.transports.Console({
      format: combine(
        label({ message: true, label: "MANGA EXPRESS SERVER!" }),
        colorize(),
        simple()
      ),
    }),
    new winston_1.transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }),
    new winston_1.transports.File({
      filename: "src/logs/info.log",
      level: "info",
    }),
    new winston_1.transports.File({ filename: "src/logs/debug.log" }),
    new winston_1.transports.File({ filename: "src/logs/combined.log" }),
  ],
});
exports.default = logger;

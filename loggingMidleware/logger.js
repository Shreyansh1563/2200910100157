import morgan from "morgan";
import winston from "winston";

const loggerInstance = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "logs.log" })],
});

const logger = morgan("combined", {
  stream: {
    write: (message) => loggerInstance.info(message.trim()),
  },
});

export default logger;
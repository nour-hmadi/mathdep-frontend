// The backend's address: .env.development sets it for `npm start`, .env.production for `npm run build`.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default API_URL;

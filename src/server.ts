import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const PORT = process.env?.PORT || 5000;

// Proxy middleware for users
const usersService = createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    pathRewrite: {
        "^/api/users": "/api/users", // maintains base path
    },
    onError: (err, req, res) => {
        console.error("Proxy Error:", err);
        res.status(500).send("Resources unreachable at the moment.");
    },
    ws: true, // enable websocket connections
    logLevel: "debug", // 'debug', 'info', 'warn', or 'error'
});

// Proxy middleware for companies
const companiesService = createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: {
        "^/api/companies": "/api/companies", // maintains base path
    },
    onError: (err, req, res) => {
        console.error("Proxy Error:", err);
        res.status(500).send("Resources unreachable at the moment.");
    },
    ws: true, // enable websocket connections
    logLevel: "debug", // 'debug', 'info', 'warn', or 'error'
});

// Use the proxy middleware for different services
app.use("/api/users", usersService);

app.use("/api/companies", companiesService);

export default app;

export const runServer = () =>
    app.listen(PORT, () => console.log(`Gateway listening on port: ${PORT}`));

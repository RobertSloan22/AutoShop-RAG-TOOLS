import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user to request object
        req.user = decoded;
        
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};

// Optional: Add role-based middleware
export const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: "Forbidden - Insufficient permissions" });
        }
        next();
    };
};

// Optional: Add multiple roles middleware
export const requireAnyRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden - Insufficient permissions" });
        }
        next();
    };
};

// Optional: Add ownership verification middleware
export const verifyOwnership = (model) => {
    return async (req, res, next) => {
        try {
            const document = await model.findById(req.params.id);
            if (!document) {
                return res.status(404).json({ error: "Resource not found" });
            }
            
            if (document.userId?.toString() !== req.user.userId) {
                return res.status(403).json({ error: "Forbidden - Not the owner" });
            }
            
            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}; 
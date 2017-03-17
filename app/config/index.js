module.exports = {
    MONGODBSERVER: "mongodb://localhost:27017/aprofeServices",
    PORT: 3000,
    TOKEN_SECRET: process.env.TOKEN_SECRET || "neotoken",
    ROLES:{ADMIN:"admin", MEMBER: "member"},
    STATUSES:{ACTIVE:"active", PENDING: "pending", DELETED: "deleted"},
    APPCONFIG_ID: "AdminConfig",
    REFERRED_NAME_PREFIX: "referredLevel_",
    POINT_NAME_PREFIX: "pointLevel_",
    START_POINTS: 0
};

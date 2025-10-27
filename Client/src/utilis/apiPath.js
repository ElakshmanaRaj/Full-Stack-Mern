
export const BASE_URL = "https://full-stack-mern-04gn.onrender.com"


export const API_PATHS = {

    AUTH:{
        LOGIN :"/api/auth/login",
        REGISTER:"/api/auth/register",
        VERIFY_OTP:"/api/auth/verify",
        RESEND_OTP:"/api/auth/resend",
        GET_PROFILE:"/api/auth/profile",
        FORGOT_PASSWORD:"/api/auth/forgot-password",
        RESET_PASSWORD_OTP:"/api/auth/reset-otp",
        RESET_PASSWORD:"/api/auth/reset-password"
    },

    // ADMIN ACCESS
    ADMIN:{
        ADMIN_LOGIN:"/api/admin/login",
        ADMIN_GET_PROFILE:"/api/admin/profile",
        SUMMARY:"/api/admin/summary"
    },

    // CATEGORIES
    CATEGORY:{
        // PUBLIC ACCESS
        GET_CATEGORY:"/api/category",
        // ADMIN ACCESS
        CREATE_CATEGORY:"/api/category",
        UPDATE_CATEGORY: (id)=>`/api/category/${id}`,
        DELETE_CATEGORY: (id)=>`/api/category/${id}`,
        GET_CATEGORY_BY_ID: (id)=>`/api/category/${id}`
    },
    PRODUCT: {
        // PUBLIC ACCESS
        GET_PRODUCT:"/api/product",
        GET_PRODUCT_BY_ID: (id)=>`/api/product/${id}`,
        // ADMIN ACCESS
        CREATE_PRODUCT:"/api/product",
        UPDATE_PRODUCT: (id)=>`/api/product/${id}`,
        DELETE_PRODUCT: (id)=>`/api/product/${id}`
    },
    ORDER:{
        // PUBLIC ACCESS
        CREATE_ORDER:"/api/order",
        USER_ORDER:"/api/order/user-orders",
        // ADMIN ACCESS
        GET_ORDER:"/api/order",
        GET_ORDER_BY_ID: (id)=>`/api/order/${id}`,
        DELETE_ORDER: (id)=>`/api/order/${id}`
    }
}
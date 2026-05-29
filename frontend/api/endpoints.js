const endPoints = {
  auth: {
    login: "/auth/login",
    verify_otp: "/auth/verify-otp",
    register: "/auth/register",
    forget_password: "/auth/reset-password-link",
    reset_password: (id, token) => `/auth/reset-password/${id}/${token}`,
  },

  crud: {
    list: "/api/post/list",
    add: "/api/post/create",
    details: (id) => `/api/post/${id}`,
    edit: (id) => `/api/post/update/${id}`,
    delete: (id) => `/api/delete/${id}`,
  },
};

export default endPoints;

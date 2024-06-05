export const Route = {
  form: {
    formList: "/form",
    formFirstLogin: "/form?first_login=true",
    formDetail: (formId: number) => `/form/${formId}`,
  },
};

export const adminRoute = {
  form: {
    formList: "/admin/form",
    formDetail: (formId: number) => `/admin/form/${formId}`,
  },
};

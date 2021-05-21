let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

export const headers = {
  Accept: "application/json",
  Authorization: token,
};

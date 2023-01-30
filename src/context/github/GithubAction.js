import axios from "axios";

const github = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

export async function searchUsersData(text) {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
  //   dispatch({
  //     type: "GET_USERS",
  //     payload: items,
  //   });
}

//get user and repos
export async function getUserAndRepos(login) {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
}

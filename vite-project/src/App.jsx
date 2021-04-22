import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

function Users() {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch("https://reqres.in/api/users/").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "ERROR !!!" + error.message;

  return data.data.map((user) => {
    return (
      <div>
        <div>
          <p>
            {user.first_name} {user.last_name}
          </p>
          <img src={user.avatar} alt="avatar" />
        </div>
        <div>{isFetching ? "updating" : ""}</div>
        <ReactQueryDevtools />
      </div>
    );
  });
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

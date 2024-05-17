import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import { ErrorBoundary } from "./components/ErrorBundary";
import { PrivateRoute } from "./components/PrivateRoute";

export function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AsyncRoute
          path="/login"
          getComponent={() =>
            import("./page/Login").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="/register"
          getComponent={() =>
            import("./page/Register").then((module) => module.default)
          }
        />
        <PrivateRoute
          path="/post/:postId"
          getComponent={() =>
            import("./page/Post").then((module) => module.default)
          }
        />
        <PrivateRoute
          path="/create"
          getComponent={() =>
            import("./page/CreatePost").then((module) => module.default)
          }
        />
        <PrivateRoute
          path="/myposts/:userId"
          getComponent={() =>
            import("./page/MyPosts").then((module) => module.default)
          }
        />
        <PrivateRoute
          path="/"
          getComponent={() =>
            import("./page/Home").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="*"
          default
          getComponent={() =>
            import("./page/404").then((module) => module.default)
          }
        />
      </Router>
    </ErrorBoundary>
  );
}

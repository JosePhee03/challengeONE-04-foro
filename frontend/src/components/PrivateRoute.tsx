import AsyncRoute, { IAsyncRouteProps } from "preact-async-route";
import { useAuthenticate } from "../hook/useAuthenticate";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";

export function PrivateRoute(props: IAsyncRouteProps) {
  const { isAuthenticated } = useAuthenticate();

  useEffect(() => {
    if (!isAuthenticated) route("/login", true);
  }, [isAuthenticated]);

  return <AsyncRoute {...props} />;
}

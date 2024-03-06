import Router from "preact-router"
import AsyncRoute from "preact-async-route"
import ProgressBar from "./page/ProgressBar"
import { ErrorBoundary } from "./components/ErrorBundary"

export function App() {
  return (
    <ErrorBoundary>
      <ProgressBar />
      <Router>
        <AsyncRoute
          path="/"
          getComponent={() => import('./page/Home').then(module => module.default)}
        />
        <AsyncRoute
          path="/login"
          getComponent={() => import('./page/Login').then(module => module.default)}
        />
        <AsyncRoute
          path="/register"
          getComponent={() => import('./page/Register').then(module => module.default)}
        />
        <AsyncRoute
          path="/post/:postId"
          getComponent={() => import('./page/Post').then(module => module.default)}
        />
      </Router>
    </ErrorBoundary>
  )
}

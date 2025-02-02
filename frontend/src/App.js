import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loader/Loader.jsx";
const HomePage = lazy(() => import("./page/HomePage/HomePage.jsx"));
const ApartmentPage = lazy(() =>
  import("./page/ApartmentPage/ApartmentPage.jsx")
);
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Loader width="100" height="100" />
                </div>
              }
            >
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense
              fallback={
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Loader width="100" height="100" />
                </div>
              }
            >
              <ApartmentPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

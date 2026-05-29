import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import FormLoader from "./components/loaderCom/loadercom";
import PostAdd from "./pages/crud/post_add/postAdd";
import { PostList } from "./pages/crud/post_list/postList";
import { PostDetails } from "./pages/crud/post_details/postDetails";
import { PostEdit } from "./pages/crud/post_edit/postEdit";
import { PostDelete } from "./pages/crud/post_delete/postDelete";
import CheckPrivateRouting from "./routes/CheckPrivateRouting";
import NotFound from "./pages/notFound/notFound";
import Header from "./components/layout/header/header";
import { Footer } from "./components/layout/footer/footer";
import ForgotPassword from "./pages/auth/forgetPassword/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword/resetPassword";


const Register = lazy(() => import("./pages/auth/signUp/register"));
const Login = lazy(() => import("./pages/auth/signIn/login"));
const VerifyOTP = lazy(() => import("./pages/auth/otp/verifyotp"));


function App() {
  const AppContent = () => {
    const location = useLocation();

    const publicRoute = [
      {
        path: "/auth/register",
        component: <Register />,
      },
      {
        path: "/auth/login",
        component: <Login />,
      },
      {
        path: "/auth/verify-otp",
        component: <VerifyOTP />,
      },
      {
        path: "*",
        component: <NotFound />
      },
      {
        path: "/auth/forgot-password",
        component: <ForgotPassword/>
      },
      {
        path: "/auth/reset-password/:id/:token",
        component: <ResetPassword/>
      }
    ];

    const privateRoute = [
      {
        path: "/product/add",
        component: <PostAdd />,
      },
      {
        path: "/product/list",
        component: <PostList />,
      },
      {
        path: "/product/details/:id",
        component: <PostDetails />,
      },
      {
        path: "/product/edit/:id",
        component: <PostEdit />,
      },
      {
        path: "/product/delete/:id",
        component: <PostDelete />,
      },
    ];

    const validRoutes = [
      "/auth/register",
      "/auth/login",
      "/auth/verify-otp",
      "/product/add",
      "/product/list",
    ];

    const isDynamicRoute =
      location.pathname.startsWith("/product/details/") ||
      location.pathname.startsWith("/product/edit/") ||
      location.pathname.startsWith("/product/delete/");

    const isValidRoute =
      validRoutes.includes(location.pathname) || isDynamicRoute;

    const hideLayout =
      location.pathname.startsWith("/auth") || !isValidRoute;

    return (
      <>
        {!hideLayout && <Header />}

        <Suspense fallback={<FormLoader />}>
          <Routes>
            {publicRoute.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={item.component}
              />
            ))}

            {privateRoute.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={
                  <CheckPrivateRouting>
                    {item.component}
                  </CheckPrivateRouting>
                }
              />
            ))}
          </Routes>
        </Suspense>

        {!hideLayout && <Footer />}
      </>
    );
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
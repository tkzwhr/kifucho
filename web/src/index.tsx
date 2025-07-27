import { render } from "solid-js/web";
import "@/index.css";
import { SessionProvider } from "@/contexts/session";
import SignInPage from "@/pages/SignIn";
import TopPage from "@/pages/Top2";
import ImportFilePage from "@/pages/import/File";
import ImportTextPage from "@/pages/import/Text";
import { isLocal } from "@/utils/env.ts";
import { Auth0 } from "@afroze9/solid-auth0";
import { Route, Router } from "@solidjs/router";

const root = document.getElementById("root");

if (root) {
  if (isLocal()) {
    render(() => <App />, root);
  } else {
    render(
      () => (
        <Auth0
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          audience={import.meta.env.VITE_AUTH0_AUDIENCE}
          loginRedirectUri={`${window.location.origin}/`}
          logoutRedirectUri={`${window.location.origin}/`}
          scope="openid profile email"
        >
          <App />
        </Auth0>
      ),
      root,
    );
  }
}

function App() {
  return (
    <SessionProvider>
      <Router>
        <Route path="/" component={TopPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/import/file" component={ImportFilePage} />
        <Route path="/import/text" component={ImportTextPage} />
      </Router>
    </SessionProvider>
  );
}

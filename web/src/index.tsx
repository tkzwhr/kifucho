/* @refresh reload */
import { render } from "solid-js/web";
import "@/index.css";
import App from "@/App";
import { isLocal } from "@/utils/env";
import { Auth0 } from "@afroze9/solid-auth0";

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

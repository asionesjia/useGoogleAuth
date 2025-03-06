# Google Authentication with FedCM & One Tap

## Introduction

This project provides a React hook (`useGoogleAuth`) that abstracts Google authentication logic, supporting both **FedCM
** and **One Tap** sign-in methods. It automatically detects browser compatibility and selects the appropriate method.
This project is based on Next.js 15, but you can use it in any version of React or Next.js.

---

## Features

- **Automatic authentication selection**: Uses **FedCM** if supported, otherwise falls back to **One Tap**.
- **OAuth2.0 login fallback**: Provides a manual OAuth2.0 login button for environments where neither FedCM nor One Tap
  is available.
- **Easy integration**: Just import and use `useGoogleAuth` in your React components.
- **TypeScript support**: Fully typed for better development experience.

---

## Installation

```sh
npm install
```

---

## How It Works

1. **FedCM Check**: Uses `window.IdentityCredential` to detect FedCM support.
2. **FedCM Authentication**: If supported, requests an identity credential from Google.
3. **One Tap Fallback**: If FedCM is not available, loads the Google One Tap script and prompts the user.
4. **OAuth2.0 Fallback**: If neither FedCM nor One Tap works, provides a manual login button that redirects to Google's
   OAuth2.0 authentication flow.

---

## Usage

### 1. Import and Use Hook

```tsx
import {useGoogleAuth} from "./hooks/useGoogleAuth";

const GoogleAuthButton = () => {
  const {token, error, signInWithOAuth} = useGoogleAuth();

  return (
    <button onClick={signInWithOAuth}>
      {token ? "Logged in" : "Sign in with Google"}
    </button>
  );
};
```

### 2. Hook API

```ts
const {token, error, signInWithOAuth} = useGoogleAuth();
```

- `token`: Google credential if the user is authenticated.
- `error`: Contains error messages if authentication fails.
- `signInWithOAuth`: Triggers the appropriate authentication method.

| Function            | Description                            |
|---------------------|----------------------------------------|
| `token`             | Returns Google credential if logged in |
| `error`             | Error message if login fails           |
| `signInWithOAuth()` | Starts Google authentication           |

---

## Customization & Development

### 1. Modify Google Client ID

Update `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in `.env`.

```ts
const GOOGLE_CLIENT_ID = "your-client-id.apps.googleusercontent.com";
```

### 2. Change Redirect URI

Update `NEXT_PUBLIC_GOOGLE_REDIRECT_URI` in `.env`.

```ts
const GOOGLE_REDIRECT_URI = "https://yourdomain.com/callback";
```

Ensure that this URI is registered in the **Google Developer Console**.

### 3. Styling

Modify the `GoogleAuthButton` component to fit your design.

```tsx
<button className="custom-class" onClick={signIn}>Login with Google</button>
```

---

## Troubleshooting

### 1. `redirect_uri_mismatch`

- Ensure your **OAuth redirect URI** is correctly registered in the Google Developer Console.
- Verify that `GOOGLE_REDIRECT_URI` matches the one in your Google OAuth settings.

### 2. FedCM not working?

- Ensure your **browser supports FedCM** (currently not supported on iOS Chrome).
- Use One Tap or OAuth2.0 as a fallback.

### 3. One Tap Not Displaying?

- Google One Tap does not show if the user has **previously closed it**.
- Try opening in **Incognito Mode**.
-

---

## License

MIT License.

## Author

@asionesjia


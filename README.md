# Google Authentication with FedCM & One Tap

## Introduction | 项目介绍
This project provides a React hook (`useGoogleAuth`) that abstracts Google authentication logic, supporting both **FedCM** and **One Tap** sign-in methods. It automatically detects browser compatibility and selects the appropriate method. This project is based on Next.js 15, but you can use it in any version of React or Next.js.

该项目提供了一个 React Hook（`useGoogleAuth`），封装了 Google 认证逻辑，支持 **FedCM** 和 **One Tap** 登录方式。它会自动检测浏览器兼容性并选择合适的认证方式。该项目基于 Next.js 15 + Tailwindcss，但你可以在任意版本的 React 或 Next.js 中使用。

---

## Features | 功能特点
- **Automatic authentication selection**: Uses **FedCM** if supported, otherwise falls back to **One Tap**.
- **OAuth2.0 login fallback**: Provides a manual OAuth2.0 login button for environments where neither FedCM nor One Tap is available.
- **Easy integration**: Just import and use `useGoogleAuth` in your React components.
- **TypeScript support**: Fully typed for better development experience.

- **自动选择认证方式**：支持 **FedCM**，如果不兼容则回退到 **One Tap**。
- **OAuth2.0 兜底方案**：提供手动 OAuth2.0 登录按钮，适用于不支持 FedCM 和 One Tap 的环境。
- **易集成**：只需在组件中调用 `useGoogleAuth` 即可使用。
- **完整的 TypeScript 支持**：提供完善的类型支持，优化开发体验。

---

## Installation | 安装
```sh
npm install
```

---

## How It Works | 实现原理
1. **FedCM Check**: Uses `window.IdentityCredential` to detect FedCM support.
2. **FedCM Authentication**: If supported, requests an identity credential from Google.
3. **One Tap Fallback**: If FedCM is not available, loads the Google One Tap script and prompts the user.
4. **OAuth2.0 Fallback**: If neither FedCM nor One Tap works, provides a manual login button that redirects to Google's OAuth2.0 authentication flow.

1. **检测 FedCM**：通过 `window.IdentityCredential` 判断浏览器是否支持 FedCM。
2. **FedCM 认证**：如果支持，则请求 Google 身份凭证。
3. **One Tap 兜底**：如果不支持 FedCM，则加载 Google One Tap 并提示用户登录。
4. **OAuth2.0 兜底**：如果 FedCM 和 One Tap 都无法使用，则提供一个手动 OAuth2.0 登录按钮。

---

## Usage | 使用方法
### 1. Import and Use Hook | 引入并使用 Hook
```tsx
import { useGoogleAuth } from "./hooks/useGoogleAuth";

const GoogleAuthButton = () => {
    const { token, error, signInWithOAuth } = useGoogleAuth();
    
    return (
        <button onClick={signInWithOAuth}>
            {token ? "Logged in" : "Sign in with Google"}
        </button>
    );
};
```

### 2. Hook API
```ts
const { token, error, signInWithOAuth } = useGoogleAuth();
```
- `token`: Google credential if the user is authenticated.
- `error`: Contains error messages if authentication fails.
- `signInWithOAuth`: Triggers the appropriate authentication method.

| Function | Description | 函数说明 |
|----------|------------|---------|
| `token` | Returns Google credential if logged in | 是否已登录 |
| `error` | Error message if login fails | 登录失败的错误信息 |
| `signInWithOAuth()` | Starts Google authentication | 开始 Google 认证 |

---

## Customization & Development | 二次开发
### 1. Modify Google Client ID | 修改 Google 客户端 ID
Update `GOOGLE_CLIENT_ID` in `useGoogleAuth.ts`.

修改 `useGoogleAuth.ts` 中的 `GOOGLE_CLIENT_ID` 以匹配你的 Google OAuth 设置。

```ts
const GOOGLE_CLIENT_ID = "your-client-id.apps.googleusercontent.com";
```

### 2. Change Redirect URI | 修改回调地址
Update `GOOGLE_REDIRECT_URI` in `useGoogleAuth.ts`.

```ts
const GOOGLE_REDIRECT_URI = "https://yourdomain.com/callback";
```
Ensure that this URI is registered in the **Google Developer Console**.

确保此地址已在 **Google 开发者控制台** 中注册。

### 3. Styling | 自定义样式
Modify the `GoogleAuthButton` component to fit your design.

你可以修改 `GoogleAuthButton` 组件以符合你的 UI 设计。

```tsx
<button className="custom-class" onClick={signIn}>Login with Google</button>
```

---

## Troubleshooting | 常见问题
### 1. `redirect_uri_mismatch`
- Ensure your **OAuth redirect URI** is correctly registered in the Google Developer Console.
- Verify that `GOOGLE_REDIRECT_URI` matches the one in your Google OAuth settings.

### 2. FedCM not working?
- Ensure your **browser supports FedCM** (currently not supported on iOS Chrome).
- Use One Tap or OAuth2.0 as a fallback.

### 3. One Tap Not Displaying?
- Google One Tap does not show if the user has **previously closed it**.
- Try opening in **Incognito Mode**.

### 1. `redirect_uri_mismatch` 错误
- 请确保 **OAuth 回调 URL** 在 Google 开发者控制台中已正确注册。
- 确保 `GOOGLE_REDIRECT_URI` 与 Google OAuth 设置中的 URL 完全一致。

### 2. FedCM 无法使用？
- 请确认 **浏览器支持 FedCM**（iOS Chrome 不支持）。
- 如果不支持，系统会自动回退到 One Tap 或 OAuth2.0。

### 3. One Tap 未弹出？
- 如果用户之前关闭了 One Tap，它可能不会再次显示。
- 尝试在 **无痕模式** 下打开页面。

---

## License | 许可证
MIT License.

## Author
@asionesjia


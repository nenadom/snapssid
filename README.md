# `snapssid-firefox`

A Firefox port of [ftodoric/snapssid](https://github.com/ftodoric/snapssid). Login into Admin with ease.

1. Clone this repo:

```
git clone git@github.com:nenadom/snapssid.git
```

2. Open Firefox, and navigate to:

```
about:debugging#/runtime/this-firefox
```

3. Load unpacked extension, and select the folder.

When you need to log into the localhost:

1. Go to the dev admin URL (e.g., https://<your-dev-domain>/admin)
2. Log in if needed
3. Click the SnapSSID extension (you can pin it). Firefox will have already granted the necessary host permissions based on the manifest. If prompted, approve access.
4. You'll be redirected to http://localhost:3000/ with the session cookie copied.
5. you're in

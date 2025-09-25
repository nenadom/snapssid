# `snapssid-firefox`

a Firefox port of [ftodoric's `snapssid` plugin](https://github.com/ftodoric/snapssid)

### Installation

1. Clone this repo:

```
git clone git@github.com:nenadom/snapssid.git
```

2. Open Firefox, and navigate to:

```
about:debugging#/runtime/this-firefox
```

3. Click "Load Temporary Add-on..." and select the `manifest.json` file in this folder.

### Setup

When you need to log into the localhost:

1. Go to the dev admin URL (e.g., https://<your-dev-domain>/admin)
2. Log in if needed
3. Click the SnapSSID extension (you can pin it). Firefox will have already granted the necessary host permissions based on the manifest. If prompted, approve access.
4. You'll be redirected to http://localhost:3000/ with the session cookie copied.
5. you're in

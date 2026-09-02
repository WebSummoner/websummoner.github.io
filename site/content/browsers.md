---
title: Supported browsers
description: WebSummoner runs Chrome, Firefox, Edge, Opera, Brave, Yandex Browser and WebKit in Docker with pinned versions and matching drivers.
---

# Supported browsers

WebSummoner launches any Docker image that speaks WebDriver, but the
maintained images below are the recommended path: pinned browser versions,
matching drivers, VNC and audio support baked in.

| Browser | Image | Current version | WebDriver |
| --- | --- | --- | --- |
| Google Chrome | `websummoner/chrome` | 152.0.7977.64 | ChromeDriver 152.0.7977.64 |
| Mozilla Firefox | `websummoner/firefox` | 154.0.1 | geckodriver 0.37.1 |
| Microsoft Edge | `websummoner/edge` | 152.0.4191.53 | msedgedriver 152.0.4191.53 |
| Brave | `websummoner/brave` | 1.94.117 | ChromeDriver (Chromium core) |
| Yandex Browser | `websummoner/yandex` | 26.6.1.1083 | YandexDriver |
| Opera | `websummoner/opera` | 135.0.5973.66 | ChromeDriver — see [Opera](#opera) |
| WebKit (Safari engine) | `websummoner/safari` | 2.52.6 | WebKitWebDriver — see [WebKit](#webkit-safari) |

Every image embeds a VNC server; there are no separate `vnc_*` image variants.
Turn the live screen on per session with the `enableVNC` capability, or set
`ENABLE_VNC=true` in the container environment.

## Image tags

Each browser publishes three tag levels, so you can pin as loosely or as
tightly as you like:

| Level | Example | Meaning |
| --- | --- | --- |
| line | `chrome:152` | floats — rebuilt with the newest patch of that line |
| major.minor | `chrome:152.0` | compatibility alias |
| full | `chrome:152.0.7977.64` | immutable, driver-matched pin |

## Ready-made images

```bash
docker pull websummoner/chrome:152.0.7977.64
docker pull websummoner/firefox:154.0.1
docker pull websummoner/edge:152.0.4191.53
docker pull websummoner/brave:1.94.117
docker pull websummoner/yandex:26.6.1.1083
docker pull websummoner/opera:135.0.5973.66
docker pull websummoner/safari:2.52.6
```

All images are free to use and published on
[Docker Hub](https://hub.docker.com/u/websummoner). A minimal `browsers.json`
for two of them:

```json
{
  "chrome":  { "default": "152.0.7977.64",
               "versions": { "152.0.7977.64": { "image": "websummoner/chrome:152.0.7977.64",  "port": "4444" } } },
  "firefox": { "default": "154.0.1",
               "versions": { "154.0.1": { "image": "websummoner/firefox:154.0.1", "port": "4444" } } }
}
```

## Known limitations

Chrome, Firefox, Edge, Brave and Yandex pass the whole
[container test suite](https://github.com/WebSummoner/websummoner-container-tests).
Two engines do not, for reasons outside WebSummoner's control.

### Opera

Opera is supported on a best-effort basis. Opera's own driver,
`operachromiumdriver`, lags the Chromium version Opera ships — Opera 135 is
Chromium 151, while the newest published operadriver targets Chromium 150 — so
the image drives Opera with the matching Chrome-for-Testing ChromeDriver
instead. This is the approach the Selenium project itself recommends after it
removed Opera support in Selenium 4.3.0.

What this costs you: opening a second window (`window.open`) can crash the
renderer, so window-switching and `WebDriver.close()` are unreliable.
Everything else in the suite passes.

If your tests depend on multi-window behaviour, use a Chromium-based browser.

### WebKit (Safari)

The `safari` image is WebKitGTK — the same engine as Safari, built for Linux —
driven by `WebKitWebDriver`. It is the closest you can get to Safari without
Apple hardware, but `WebKitWebDriver` is less complete than the Chromium and
Gecko drivers. File upload works — WebSummoner copies uploaded files directly
into the browser container. `addCookie` works provided the cookie sets `sameSite`
(Chromium and Gecko default it; WebKit drops the cookie without it), and the
`proxy` capability works because WebSummoner translates it into the environment
GLib's proxy resolver reads — WebKit itself ignores the capability. Remaining
known gaps:

| Area | Behaviour |
| --- | --- |
| Proxy | the `proxy` capability is ignored, so traffic bypasses the proxy |
| Frames and windows | switching frames can raise `StaleElementReferenceException` |

WebKitGTK is also sensitive to host load: run it on an otherwise idle grid for
stable results.

## Custom images

The [images repository](https://github.com/WebSummoner/images) contains the
Dockerfiles and the public `images` build tool for producing custom browser
images. Audio, video recording, VNC, clipboard and file exchange work out of
the box in the official images — and in any image built from these
Dockerfiles.

<div class="page-nav">
  <a href="/features/">← Features</a>
  <a href="/">Home</a>
  <a href="/ecosystem/">Ecosystem →</a>
</div>

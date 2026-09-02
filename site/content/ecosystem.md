---
title: Ecosystem
description: The tools around the WebSummoner hub — CM installer, WebSummoner UI and GGR load balancer.
---

# Ecosystem

The hub is the core, with four companion tools that make day-to-day usage effortless.
All of them are developed and maintained by [RIADVICE](https://riadvice.com).

<div class="toc" markdown="1">
**On this page**

- [WebSummoner](/ecosystem/#websummoner)
- [Configuration Manager (CM)](/ecosystem/#configuration-manager-cm)
- [WebSummoner UI](/ecosystem/#websummoner-ui)
- [Ggr](/ecosystem/#ggr)
- [Ggr UI](/ecosystem/#ggr-ui)
</div>

## WebSummoner {#websummoner}

The hub itself: a ~10 MB Go binary that reads `browsers.json`, starts a
container per Selenium session and proxies the WebDriver protocol to it.
Video recording with sound, session logs, VNC, clipboard, file exchange and
DevTools proxying are built in.

[Repository](https://github.com/WebSummoner/websummoner) ·
[Quick start](https://websummoner.github.io/websummoner/quick-start/)

## Configuration Manager (CM) {#configuration-manager-cm}

One binary that installs everything: downloads the WebSummoner release, pulls
the browser images you ask for, generates `browsers.json` and starts — or
updates — the hub.

```bash
./cm websummoner start --vnc          # fresh install with VNC images
./cm websummoner update --last-versions 3
```

[Repository](https://github.com/WebSummoner/cm) · the legacy
`cm selenoid` spelling still works.

## WebSummoner UI {#websummoner-ui}

A live view of every session: browser screen over VNC, streaming logs, queue
state and usage statistics — for a single hub or an entire GGR cluster.

```bash
docker run -d -p 8080:8080 websummoner/websummoner-ui \
    --websummoner-uri http://localhost:4444
```

[Repository](https://github.com/WebSummoner/websummoner-ui)

## Ggr {#ggr}

A load balancer that puts one address in front of many hubs. It routes each
session to a host that has a free slot, so a cluster survives losing any single
machine and grows by adding hosts to a quota file.

```bash
docker run -d --name ggr -p 4444:4444 \
    -v /etc/grid-router/:/etc/grid-router:ro websummoner/ggr:latest
```

[Repository](https://github.com/WebSummoner/ggr) ·
[Quick start](https://websummoner.github.io/ggr/quick-start/)

## Ggr UI {#ggr-ui}

Collects `/status` from every hub behind Ggr and serves the combined result, so
the WebSummoner UI can show an entire cluster as though it were one hub.

[Repository](https://github.com/WebSummoner/ggr-ui)

<div class="page-nav">
  <a href="/browsers/">← Supported browsers</a>
  <a href="/">Home</a>
  <a href="https://websummoner.github.io/websummoner/">Documentation →</a>
</div>

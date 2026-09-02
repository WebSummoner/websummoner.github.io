---
title: Features
description: What WebSummoner does — performance, one-command installs, a modern UI and cluster readiness.
---

# Features

WebSummoner is a fast Selenium hub that summons a fleet of browsers into Docker
containers as ephemeral, session-scoped environments. This page expands the four pillars of the project — jump to
what interests you, every section links to the related guides.

<div class="toc" markdown="1">
**On this page**

- [Lightning fast](/features/#lightning-fast)
- [Easy installation](/features/#easy-installation)
- [Modern UI](/features/#modern-ui)
- [Cluster ready](/features/#cluster-ready)
</div>

## Lightning fast {#lightning-fast}

WebSummoner is a single Go binary, roughly 10 MB, with no runtime
dependencies — no JVM, no application server. Under load it consumes about
**10× less memory** than a Java-based Selenium hub, and sessions start as fast
as Docker can spawn a container.

Every session gets an isolated, reproducible environment: an exact browser
version pinned by your
[browsers configuration](https://websummoner.riadvice.com/websummoner/reference/browsers-config/),
disposable tmpfs, and per-container CPU/memory limits.

**Related:** [Usage statistics](https://websummoner.riadvice.com/websummoner/guides/usage-statistics/)
for watching the hub under load ·
[Recommended Docker settings](https://websummoner.riadvice.com/websummoner/reference/docker-settings/)
for sizing `-limit`.

## Easy installation {#easy-installation}

Two paths, both measured in minutes:

- **Docker only** — one `docker run` with a `browsers.json` mounted. See the
  [quick start](https://websummoner.riadvice.com/websummoner/quick-start/).
- **Configuration Manager** — `cm websummoner start --vnc` downloads the
  binary, pulls browser images, writes the config and starts everything.

Ready-made images exist for
[all major browsers](/browsers/) — no manual browser or driver installs.

**Related:** [Ecosystem: CM](/ecosystem/#configuration-manager-cm) ·
[Browser images](/browsers/#ready-made-images).

## Modern UI {#modern-ui}

[WebSummoner UI](https://github.com/WebSummoner/websummoner-ui) shows every
running session: the **live browser screen** over VNC, streaming logs, queued
requests and per-browser usage — for one instance or a whole cluster.

Sessions can be named per test (`name` capability), recorded to
**H.264 video with sound**, and their logs saved automatically.

**Related:** [Video recording (with audio)](https://websummoner.riadvice.com/websummoner/guides/video-recording/)
· [Capabilities reference](https://websummoner.riadvice.com/websummoner/reference/capabilities/).

## Cluster ready {#cluster-ready}

Run many instances behind **GGR** — the go-Grid-Router that load-balances
Selenium sessions across WebSummoner nodes with per-user quotas. Statistics
are exposed over HTTP for Telegraf/Prometheus-style monitoring pipelines.

**Related:** [Ecosystem: GGR](/ecosystem/#ggr) ·
[Migrating from Selenoid](https://websummoner.riadvice.com/websummoner/migrating-from-selenoid/).

<div class="page-nav">
  <a href="/">← Home</a>
  <a href="/browsers/">Supported browsers →</a>
</div>

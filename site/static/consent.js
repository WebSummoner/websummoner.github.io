// Consent banner for every WebSummoner site; one host, so one cookie answers for all.
// Nothing from Google is requested until the visitor accepts.
(function () {
    'use strict';

    var COOKIE = 'websummoner_consent';
    // Bump to re-ask when what we collect changes.
    var VERSION = 1;
    var MAX_AGE_DAYS = 180;
    var POLICY_URL = 'https://riadvice.com/legal/cookie-policy-eu/';

    function read() {
        var raw = document.cookie.split('; ').filter(function (c) {
            return c.indexOf(COOKIE + '=') === 0;
        })[0];
        if (!raw) return null;
        try {
            var parsed = JSON.parse(decodeURIComponent(raw.split('=')[1]));
            return parsed && parsed.version === VERSION ? parsed : null;
        } catch (e) {
            return null;
        }
    }

    function write(analytics) {
        var value = encodeURIComponent(JSON.stringify({ version: VERSION, analytics: analytics }));
        var secure = location.protocol === 'https:' ? '; Secure' : '';
        document.cookie =
            COOKIE + '=' + value + '; Path=/; Max-Age=' + MAX_AGE_DAYS * 86400 + '; SameSite=Lax' + secure;
    }

    // gtag.js is injected only here, so a visitor who never accepts never contacts Google.
    function loadGtag() {
        var id = window.WS_GA_ID;
        if (!id || window.WS_GA_LOADED) return;
        window.WS_GA_LOADED = true;

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted',
            functionality_storage: 'granted',
            security_storage: 'granted',
        });
        window.gtag('js', new Date());
        window.gtag('config', id);

        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
        document.head.appendChild(s);
    }

    // Only matters after a visitor withdraws a previous acceptance.
    function clearAnalyticsCookies() {
        if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
        var host = location.hostname;
        var domains = ['', '; Domain=' + host, '; Domain=.' + host.replace(/^[^.]+\./, '')];
        document.cookie.split('; ').forEach(function (entry) {
            var name = entry.split('=')[0];
            if (!/^(_ga|_gid|_gat)/.test(name)) return;
            domains.forEach(function (d) {
                document.cookie = name + '=; Path=/; Max-Age=0' + d;
            });
        });
    }

    function styles() {
        if (document.getElementById('ws-consent-style')) return;
        var css = [
            '.ws-consent{position:fixed;inset:auto 0 0 0;z-index:2147483000;display:flex;gap:1rem;',
            'align-items:center;flex-wrap:wrap;justify-content:center;padding:1rem 1.25rem;',
            'background:#1B1822;color:#F1EEF7;border-top:1px solid #332C42;',
            'font:14px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;',
            'box-shadow:0 -8px 24px rgba(0,0,0,.25)}',
            '.ws-consent p{margin:0;max-width:62ch;flex:1 1 32ch}',
            '.ws-consent a{color:#FFC978}',
            '.ws-consent__actions{display:flex;gap:.5rem;flex-wrap:wrap}',
            '.ws-consent button{font:inherit;font-weight:600;cursor:pointer;padding:.5rem 1.1rem;',
            'border-radius:999px;border:1px solid #332C42;background:transparent;color:#A79FB8}',
            '.ws-consent button:hover{color:#F1EEF7;border-color:#E8A24C}',
            '.ws-consent button.ws-consent__accept{background:#E8A24C;border-color:#E8A24C;color:#131118}',
            '.ws-consent button.ws-consent__accept:hover{background:#FFC978}',
            '.ws-consent button:focus-visible{outline:2px solid #FFC978;outline-offset:2px}',
            '@media (prefers-reduced-motion:no-preference){',
            '.ws-consent{animation:ws-consent-in .25s ease-out}',
            '@keyframes ws-consent-in{from{transform:translateY(100%)}to{transform:none}}}',
        ].join('');
        var el = document.createElement('style');
        el.id = 'ws-consent-style';
        el.textContent = css;
        document.head.appendChild(el);
    }

    function banner() {
        styles();
        var el = document.createElement('div');
        el.className = 'ws-consent';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-label', 'Cookie choice');
        el.innerHTML =
            '<p>We use Google Analytics to see which pages get read. ' +
            'Nothing is loaded or measured until you agree, and you can change your mind at any time. ' +
            '<a href="' + POLICY_URL + '">Cookie policy</a>.</p>' +
            '<div class="ws-consent__actions">' +
            '<button type="button" class="ws-consent__reject">Reject</button>' +
            '<button type="button" class="ws-consent__accept">Accept</button>' +
            '</div>';

        function answer(value) {
            write(value);
            if (value === 'granted') loadGtag(); else clearAnalyticsCookies();
            el.remove();
        }

        el.querySelector('.ws-consent__accept').addEventListener('click', function () {
            answer('granted');
        });
        el.querySelector('.ws-consent__reject').addEventListener('click', function () {
            answer('denied');
        });
        document.body.appendChild(el);
    }

    // Lets a "Cookie settings" link anywhere reopen the choice.
    window.wsConsentReset = function () {
        document.cookie = COOKIE + '=; Path=/; Max-Age=0';
        clearAnalyticsCookies();
        banner();
    };

    function start() {
        document.querySelectorAll('[data-ws-consent-settings]').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                window.wsConsentReset();
            });
        });
        var state = read();
        if (state) {
            if (state.analytics === 'granted') loadGtag();
            return;
        }
        banner();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();

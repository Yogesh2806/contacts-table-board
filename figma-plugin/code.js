(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };

  // src/data.ts
  var DATA = { "font": { "sans": "'Atkinson Hyperlegible Next', Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif", "mono": "'Atkinson Hyperlegible Mono', 'Roboto Mono', ui-monospace, Menlo, Consolas, monospace", "fallback": "Inter" }, "prim": { "light": [["neutral/0", "#ffffff"], ["neutral/31", "#f7f7f7"], ["neutral/39", "#f5f5f5"], ["neutral/63", "#efefef"], ["neutral/114", "#e2e2e2"], ["neutral/212", "#c9c9c9"], ["neutral/310", "#b0b0b0"], ["neutral/439", "#8f8f8f"], ["neutral/459", "#8a8a8a"], ["neutral/549", "#737373"], ["neutral/639", "#5c5c5c"], ["neutral/710", "#4a4a4a"], ["neutral/800", "#333333"], ["neutral/820", "#2e2e2e"], ["neutral/831", "#2b2b2b"], ["neutral/859", "#242424"], ["neutral/882", "#1e1e1e"], ["neutral/914", "#161616"], ["neutral/929", "#121212"], ["neutral/933", "#111111"], ["neutral/957", "#0b0b0b"], ["blue/50", "#f2f7ff"], ["blue/100", "#e2eeff"], ["blue/200", "#c5ddff"], ["blue/300", "#a0c6ff"], ["blue/600", "#286dce"], ["blue/800", "#154384"], ["violet/50", "#f8f5ff"], ["violet/100", "#f0e9ff"], ["violet/200", "#e1d2ff"], ["violet/300", "#ceb5ff"], ["violet/600", "#8053c0"], ["violet/800", "#50327b"], ["amber/50", "#fff5e9"], ["amber/100", "#ffe9cf"], ["amber/200", "#ffd29b"], ["amber/300", "#f8b65d"], ["amber/600", "#996300"], ["amber/800", "#603c00"], ["green/50", "#eefbf0"], ["green/100", "#d9f6dd"], ["green/200", "#b0ecbc"], ["green/300", "#83dc97"], ["green/600", "#00873c"], ["green/800", "#005423"]], "dark": [["neutral/0", "#ffffff"], ["neutral/31", "#f7f7f7"], ["neutral/39", "#f5f5f5"], ["neutral/63", "#efefef"], ["neutral/114", "#e2e2e2"], ["neutral/212", "#c9c9c9"], ["neutral/310", "#b0b0b0"], ["neutral/439", "#8f8f8f"], ["neutral/459", "#8a8a8a"], ["neutral/549", "#737373"], ["neutral/639", "#5c5c5c"], ["neutral/710", "#4a4a4a"], ["neutral/800", "#333333"], ["neutral/820", "#2e2e2e"], ["neutral/831", "#2b2b2b"], ["neutral/859", "#242424"], ["neutral/882", "#1e1e1e"], ["neutral/914", "#161616"], ["neutral/929", "#121212"], ["neutral/933", "#111111"], ["neutral/957", "#0b0b0b"], ["blue/50", "#0d1622"], ["blue/100", "#0f2f5d"], ["blue/200", "#154384"], ["blue/300", "#1d58aa"], ["blue/600", "#6ea8ff"], ["blue/800", "#c5ddff"], ["violet/50", "#15101f"], ["violet/100", "#382356"], ["violet/200", "#50327b"], ["violet/300", "#69429f"], ["violet/600", "#b88efc"], ["violet/800", "#e1d2ff"], ["amber/50", "#1a1206"], ["amber/100", "#452a00"], ["amber/200", "#603c00"], ["amber/300", "#7d5000"], ["amber/600", "#e39500"], ["amber/800", "#ffd29b"], ["green/50", "#08170e"], ["green/100", "#003c17"], ["green/200", "#005423"], ["green/300", "#006e30"], ["green/600", "#4ec36f"], ["green/800", "#b0ecbc"]] }, "semantic": [{ "name": "bg", "light": "#ffffff", "dark": "#0b0b0b", "alias": { "light": "neutral/0", "dark": "neutral/957" } }, { "name": "bg-subtle", "light": "#f7f7f7", "dark": "#121212", "alias": { "light": "neutral/31", "dark": "neutral/929" } }, { "name": "surface", "light": "#ffffff", "dark": "#161616", "alias": { "light": "neutral/0", "dark": "neutral/914" } }, { "name": "surface-raised", "light": "#ffffff", "dark": "#1e1e1e", "alias": { "light": "neutral/0", "dark": "neutral/882" } }, { "name": "surface-sunken", "light": "#efefef", "dark": "#0b0b0b", "alias": { "light": "neutral/63", "dark": "neutral/957" } }, { "name": "surface-hover", "light": "#efefef", "dark": "#242424", "alias": { "light": "neutral/63", "dark": "neutral/859" } }, { "name": "surface-pressed", "light": "#e2e2e2", "dark": "#2e2e2e", "alias": { "light": "neutral/114", "dark": "neutral/820" } }, { "name": "surface-inverse", "light": "#111111", "dark": "#f5f5f5", "alias": { "light": "neutral/933", "dark": "neutral/39" } }, { "name": "border", "light": "#e2e2e2", "dark": "#2e2e2e", "alias": { "light": "neutral/114", "dark": "neutral/820" } }, { "name": "border-strong", "light": "#737373", "dark": "#8a8a8a", "alias": { "light": "neutral/549", "dark": "neutral/459" } }, { "name": "text", "light": "#111111", "dark": "#f5f5f5", "alias": { "light": "neutral/933", "dark": "neutral/39" } }, { "name": "text-muted", "light": "#5c5c5c", "dark": "#b0b0b0", "alias": { "light": "neutral/639", "dark": "neutral/310" } }, { "name": "text-subtle", "light": "#737373", "dark": "#8f8f8f", "alias": { "light": "neutral/549", "dark": "neutral/439" } }, { "name": "text-inverse", "light": "#ffffff", "dark": "#111111", "alias": { "light": "neutral/0", "dark": "neutral/933" } }, { "name": "action", "light": "#111111", "dark": "#f5f5f5", "alias": { "light": "neutral/933", "dark": "neutral/39" } }, { "name": "action-hover", "light": "#2b2b2b", "dark": "#c9c9c9", "alias": { "light": "neutral/831", "dark": "neutral/212" } }, { "name": "on-action", "light": "#ffffff", "dark": "#111111", "alias": { "light": "neutral/0", "dark": "neutral/933" } }, { "name": "focus-ring", "light": "#111111", "dark": "#f5f5f5", "alias": { "light": "neutral/933", "dark": "neutral/39" } }, { "name": "overlay", "light": "rgba(0, 0, 0, 0.56)", "dark": "rgba(0, 0, 0, 0.72)", "alias": null }, { "name": "segment-active", "light": "#ffffff", "dark": "#333333", "alias": { "light": "neutral/0", "dark": "neutral/800" } }, { "name": "segment-active-border", "light": "transparent", "dark": "#4a4a4a", "alias": { "dark": "neutral/710" } }, { "name": "danger", "light": "#bd3d3b", "dark": "#fc7a73", "alias": null }, { "name": "danger-solid", "light": "#bd3d3b", "dark": "#fc7a73", "alias": null }, { "name": "danger-bg", "light": "#fff4f3", "dark": "#2a1414", "alias": null }, { "name": "warning", "light": "#996300", "dark": "#e39500", "alias": { "light": "amber/600", "dark": "amber/600" } }, { "name": "warning-bg", "light": "#fff5e9", "dark": "#2a1f0a", "alias": { "light": "amber/50" } }, { "name": "warning-border", "light": "#f8b65d", "dark": "#7d5000", "alias": { "light": "amber/300", "dark": "amber/300" } }, { "name": "success", "light": "#006e30", "dark": "#4ec36f", "alias": { "dark": "green/600" } }, { "name": "success-bg", "light": "#eefbf0", "dark": "#0f2416", "alias": { "light": "green/50" } }, { "name": "success-border", "light": "#83dc97", "dark": "#006e30", "alias": { "light": "green/300", "dark": "green/300" } }], "stage": { "Lead": { "hue": "blue", "pill": { "fill": "blue-100", "text": "blue-800", "dot": "blue-600" }, "column": "blue-50", "selected": { "border": "blue-600", "fill": "blue-100", "text": "blue-800", "ring": "blue-50" }, "saved": { "border": "blue-600 dashed", "fill": "blue-50", "text": "blue-800" }, "emptyRing": "blue-300", "dropZone": { "border": "blue-600", "fill": "blue-100", "text": "blue-800" } }, "Prospect": { "hue": "violet", "pill": { "fill": "violet-100", "text": "violet-800", "dot": "violet-600" }, "column": "violet-50", "selected": { "border": "violet-600", "fill": "violet-100", "text": "violet-800", "ring": "violet-50" }, "saved": { "border": "violet-600 dashed", "fill": "violet-50", "text": "violet-800" }, "emptyRing": "violet-300", "dropZone": { "border": "violet-600", "fill": "violet-100", "text": "violet-800" } }, "Qualified": { "hue": "amber", "pill": { "fill": "amber-100", "text": "amber-800", "dot": "amber-600" }, "column": "amber-50", "selected": { "border": "amber-600", "fill": "amber-100", "text": "amber-800", "ring": "amber-50" }, "saved": { "border": "amber-600 dashed", "fill": "amber-50", "text": "amber-800" }, "emptyRing": "amber-300", "dropZone": { "border": "amber-600", "fill": "amber-100", "text": "amber-800" } }, "Customer": { "hue": "green", "pill": { "fill": "green-100", "text": "green-800", "dot": "green-600" }, "column": "green-50", "selected": { "border": "green-600", "fill": "green-100", "text": "green-800", "ring": "green-50" }, "saved": { "border": "green-600 dashed", "fill": "green-50", "text": "green-800" }, "emptyRing": "green-300", "dropZone": { "border": "green-600", "fill": "green-100", "text": "green-800" } } }, "space": [["0", 0], ["2", 2], ["4", 4], ["6", 6], ["8", 8], ["12", 12], ["16", 16], ["20", 20], ["24", 24], ["32", 32], ["48", 48]], "radius": [["none", 0], ["sm", 4], ["md", 8], ["lg", 16], ["full", 9999]], "type": [{ "name": "display", "size": 24, "line": 32, "weight": 700 }, { "name": "title", "size": 20, "line": 28, "weight": 700 }, { "name": "heading", "size": 18, "line": 24, "weight": 700 }, { "name": "card-name", "size": 15, "line": 20, "weight": 700 }, { "name": "body", "size": 16, "line": 24, "weight": 400 }, { "name": "body-sm", "size": 14, "line": 20, "weight": 400 }, { "name": "body-sm-strong", "size": 14, "line": 20, "weight": 600 }, { "name": "caption", "size": 12, "line": 16, "weight": 400 }, { "name": "caption-strong", "size": 12, "line": 16, "weight": 600 }, { "name": "label", "size": 11, "line": 16, "weight": 600 }, { "name": "overline", "size": 12, "line": 16, "weight": 700, "case": "upper", "tracking": "0.08em" }, { "name": "mono", "size": 12, "line": 16, "weight": 400, "family": "mono" }], "shadow": [{ "name": "elevation-1", "light": "0px 1px 2px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.04)", "dark": "0px 1px 2px rgba(0, 0, 0, 0.5)" }, { "name": "elevation-2", "light": "0px 4px 8px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.04)", "dark": "0px 4px 8px rgba(0, 0, 0, 0.6)" }, { "name": "elevation-3", "light": "0px 8px 24px rgba(0, 0, 0, 0.12), 0px 2px 8px rgba(0, 0, 0, 0.06)", "dark": "0px 8px 24px rgba(0, 0, 0, 0.7)" }, { "name": "elevation-4", "light": "0px 16px 48px rgba(0, 0, 0, 0.16), 0px 4px 16px rgba(0, 0, 0, 0.08)", "dark": "0px 16px 48px rgba(0, 0, 0, 0.8)" }], "layout": { "sidebarExpanded": 232, "sidebarRail": 64, "detailsPanel": 440, "tableMinWidth": 1100, "breakpoints": { "md": 768, "lg": 1024, "notes": 1100, "xl": 1280 } }, "motion": { "standard": "cubic-bezier(0.2, 0, 0, 1)", "enter": "cubic-bezier(0, 0, 0, 1)", "exit": "cubic-bezier(0.3, 0, 1, 1)", "panelIn": "320ms", "toastIn": "200ms", "flash": "1600ms" }, "contacts": [{ "id": "c1", "name": "Maya Patel", "company": "Lumen Brew", "role": "Head of Operations", "email": "maya@lumenbrew.co", "owner": "Arjun Rao", "labels": ["Warm", "Referral"], "stage": "Lead", "notes": "Met at the SaaS meetup; wants a demo in November." }, { "id": "c2", "name": "Lena Fischer", "company": "Kiefer & Sohn", "role": "Procurement lead", "email": "", "owner": "Arjun Rao", "labels": [], "stage": "Lead", "notes": "" }, { "id": "c3", "name": "Kenji Watanabe", "company": "Orbital Freight", "role": "VP Logistics", "email": "kenji.w@orbitalfreight.jp", "owner": "", "labels": ["Enterprise"], "stage": "Lead", "notes": "Inbound from the website form." }, { "id": "c4", "name": "Oliver Grant-Whitaker", "company": "Holloway & Grant Advisory", "role": "Senior partner", "email": "oliver@hollowayandgrant.co.uk", "owner": "Priya Shah", "labels": [], "stage": "Lead", "notes": "Introduced by Isabela at the partner dinner." }, { "id": "c5", "name": "Daniel Okafor", "company": "Northwind Labs", "role": "CTO", "email": "daniel.okafor@northwind.io", "owner": "Sara Kim", "labels": ["Enterprise"], "stage": "Prospect", "notes": "Needs a security review before the pilot." }, { "id": "c6", "name": "Sofia Alvarez", "company": "Brightloop", "role": "Marketing director", "email": "sofia@brightloop.com", "owner": "Sara Kim", "labels": ["Referral"], "stage": "Prospect", "notes": "" }, { "id": "c7", "name": "Tom Becker", "company": "Fernhill Studio", "role": "Creative director", "email": "tom@fernhill.studio", "owner": "Arjun Rao", "labels": ["Cold"], "stage": "Prospect", "notes": "Budget decision in Q1." }, { "id": "c8", "name": "Rahul Mehta", "company": "Tidepool", "role": "Founder", "email": "rahul@tidepool.in", "owner": "Priya Shah", "labels": ["Startup", "Warm"], "stage": "Customer", "notes": "Renewal due in March." }, { "id": "c9", "name": "Amara Nwosu", "company": "Quill & Co", "role": "", "email": "amara@quillandco.com", "owner": "Priya Shah", "labels": [], "stage": "Customer", "notes": "Prefers calls after 4 pm." }, { "id": "c10", "name": "Isabela Costa", "company": "Verdant Grid", "role": "Head of partnerships", "email": "isabela.costa@verdantgrid.energy", "owner": "Sara Kim", "labels": ["Enterprise", "Warm", "Referral"], "stage": "Customer", "notes": "Happy to be a reference customer." }], "owners": ["Arjun Rao", "Priya Shah", "Sara Kim"], "me": { "name": "Arjun Rao", "role": "Sales lead" }, "icons": { "people": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M336 256c-20.56 0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52 15.47 16.62 23 39.22 21.26 63.63-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256M467.83 432H204.18a27.71 27.71 0 0 1-22-10.67 30.22 30.22 0 0 1-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05 31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 0 1-5.32 25.78A27.68 27.68 0 0 1 467.83 432M147 260c-35.19 0-66.13-32.72-69-72.93-1.42-20.6 5-39.65 18-53.62 12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52-2.87 40.2-33.8 72.91-68.93 72.91M212.66 291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46 0-58.07 7.68-80.57 21.62-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 0 0 4.79 23.36A25.32 25.32 0 0 0 41.72 400h111a8 8 0 0 0 7.87-6.57c.11-.63.25-1.26.41-1.88 8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 0 0-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89"/></svg>', "people-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304Z" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><path d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/></svg>', "home-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M480 256 266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "chatbubbles-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a34 34 0 0 1 2.1-3.1A162 162 0 0 0 464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 0 0-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.4 26.4 0 0 1 9.3-1.7 26 26 0 0 1 10.1 2l56.7 20.1a13.5 13.5 0 0 0 3.9 1 8 8 0 0 0 8-8 13 13 0 0 0-.5-2.7Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/><path d="M66.46 232a146.23 146.23 0 0 0 6.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 0 0 2.71 7.68A8.17 8.17 0 0 0 72 464a7.3 7.3 0 0 0 2.91-.6l56.21-22a15.7 15.7 0 0 1 12 .2c18.94 7.38 39.88 12 60.83 12A159.2 159.2 0 0 0 284 432.11" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/></svg>', "business-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M176 416v64M80 32h192a32 32 0 0 1 32 32v412a4 4 0 0 1-4 4H48h0V64a32 32 0 0 1 32-32M320 192h112a32 32 0 0 1 32 32v256h0-160 0V208a16 16 0 0 1 16-16" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M98.08 431.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M98.08 351.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M98.08 271.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M98.08 191.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M98.08 111.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M178.08 351.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M178.08 271.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M178.08 191.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M178.08 111.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M258.08 431.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M258.08 351.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M258.08 271.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79"/><ellipse cx="256" cy="176" rx="15.95" ry="16.03" transform="rotate(-45 255.99 175.996)"/><path d="M258.08 111.87a16 16 0 1 1 13.79-13.79 16 16 0 0 1-13.79 13.79M400 400a16 16 0 1 0 16 16 16 16 0 0 0-16-16M400 320a16 16 0 1 0 16 16 16 16 0 0 0-16-16M400 240a16 16 0 1 0 16 16 16 16 0 0 0-16-16M336 400a16 16 0 1 0 16 16 16 16 0 0 0-16-16M336 320a16 16 0 1 0 16 16 16 16 0 0 0-16-16M336 240a16 16 0 1 0 16 16 16 16 0 0 0-16-16"/></svg>', "pulse-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M48 320h64l64-256 64 384 64-224 32 96h64" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><circle cx="432" cy="320" r="32" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "megaphone-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M407.94 52.22S321.3 160 240 160H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h160c81.3 0 167.94 108.23 167.94 108.23 6.06 8 24.06 2.52 24.06-9.83V62c0-12.31-17-18.82-24.06-9.78M64 256s-16-6-16-32 16-32 16-32M448 246s16-4.33 16-22-16-22-16-22M256 160v128M112 160v128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M144 288v168a8 8 0 0 0 8 8h53a16 16 0 0 0 15.29-20.73C211.91 416.39 192 386.08 192 336h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16h-16" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "images-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M432 112V96a48.14 48.14 0 0 0-48-48H64a48.14 48.14 0 0 0-48 48v256a48.14 48.14 0 0 0 48 48h16" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><rect width="400" height="336" x="96" y="128" rx="45.99" ry="45.99" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><ellipse cx="372.92" cy="219.64" rx="30.77" ry="30.55" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><path d="M342.15 372.17 255 285.78a30.93 30.93 0 0 0-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0 1 41.46-1.87L496 402.91" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "library-outline": '<svg fill="#000000" viewBox="0 0 512 512"><rect width="64" height="368" x="32" y="96" rx="16" ry="16" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><path d="M112 224h128M112 400h128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><rect width="128" height="304" x="112" y="160" rx="16" ry="16" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><rect width="96" height="416" x="256" y="48" rx="16" ry="16" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><path d="m422.46 96.11-40.4 4.25c-11.12 1.17-19.18 11.57-17.93 23.1l34.92 321.59c1.26 11.53 11.37 20 22.49 18.84l40.4-4.25c11.12-1.17 19.18-11.57 17.93-23.1L445 115c-1.31-11.58-11.42-20.06-22.54-18.89Z" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/></svg>', "settings-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M262.29 192.31a64 64 0 1 0 57.4 57.4 64.13 64.13 0 0 0-57.4-57.4M416.39 256a154 154 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.5 164.5 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22 155 155 0 0 1-21.46-12.57 16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.5 164.5 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22 155 155 0 0 1 21.46 12.57 16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "search-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><path d="M338.29 338.29 448 448" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/></svg>', "chevron-down": '<svg fill="#000000" viewBox="0 0 512 512"><path d="m112 184 144 144 144-144" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="48px"/></svg>', "chevron-up": '<svg fill="#000000" viewBox="0 0 512 512"><path d="m112 328 144-144 144 144" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="48px"/></svg>', "chevron-forward": '<svg fill="#000000" viewBox="0 0 512 512"><path d="m184 112 144 144-144 144" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="48px"/></svg>', "close": '<svg fill="#000000" viewBox="0 0 512 512"><path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z"/></svg>', "list-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M160 144h288M160 256h288M160 368h288" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><circle cx="80" cy="144" r="16" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><circle cx="80" cy="256" r="16" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><circle cx="80" cy="368" r="16" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "albums-outline": '<svg fill="#000000" viewBox="0 0 512 512"><rect width="384" height="256" x="64" y="176" rx="28.87" ry="28.87" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><path d="M144 80h224M112 128h288" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/></svg>', "person-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304Z" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/></svg>', "flag-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M80 464V68.14a8 8 0 0 1 4-6.9C91.81 56.66 112.92 48 160 48c64 0 145 48 192 48a199.5 199.5 0 0 0 77.23-15.77 2 2 0 0 1 2.77 1.85v219.36a4 4 0 0 1-2.39 3.65C421.37 308.7 392.33 320 352 320c-48 0-128-32-192-32s-80 16-80 16" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/></svg>', "briefcase-outline": '<svg fill="#000000" viewBox="0 0 512 512"><rect width="448" height="320" x="32" y="128" rx="48" ry="48" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><path d="M144 128V96a32 32 0 0 1 32-32h160a32 32 0 0 1 32 32v32M480 240H32M320 240v24a8 8 0 0 1-8 8H200a8 8 0 0 1-8-8v-24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "person-circle-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48m126.42 327.25a4 4 0 0 1-6.14-.32 124.3 124.3 0 0 0-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.2 124.2 0 0 0-32.35 29.58 4 4 0 0 1-6.14.32A175.32 175.32 0 0 1 80 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 0 1-46.68 119.25"/><path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144"/></svg>', "pricetags-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M403.29 32H280.36a14.46 14.46 0 0 0-10.2 4.2L24.4 281.9a28.85 28.85 0 0 0 0 40.7l117 117a28.86 28.86 0 0 0 40.71 0L427.8 194a14.46 14.46 0 0 0 4.2-10.2v-123A28.66 28.66 0 0 0 403.29 32" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M352 144a32 32 0 1 1 32-32 32 32 0 0 1-32 32"/><path d="m230 480 262-262a13.8 13.8 0 0 0 4-10V80" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "mail-outline": '<svg fill="#000000" viewBox="0 0 512 512"><rect width="416" height="320" x="48" y="96" rx="40" ry="40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="m112 160 144 112 144-112" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "document-text-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62Z" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><path d="M256 56v120a32 32 0 0 0 32 32h120M176 288h160M176 368h160" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "copy-outline": '<svg fill="#000000" viewBox="0 0 512 512"><rect width="336" height="336" x="128" y="128" rx="57" ry="57" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/><path d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "checkmark": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M416 128 192 384l-96-96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "checkmark-circle": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48m108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58"/></svg>', "checkmark-circle-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192Z" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><path d="M352 176 217.6 336 160 272" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "keypad-outline": '<svg fill="#000000" viewBox="0 0 512 512"><circle cx="256" cy="448" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><circle cx="256" cy="320" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><path d="M288 192a32 32 0 1 1-32-32 32 32 0 0 1 32 32Z" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><circle cx="256" cy="64" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><circle cx="384" cy="320" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><circle cx="384" cy="192" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><circle cx="384" cy="64" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><circle cx="128" cy="320" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><circle cx="128" cy="192" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><circle cx="128" cy="64" r="32" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/></svg>', "information-circle-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64Z" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><path d="M220 220h32v116" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M208 340h88" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/><path fill="#000000" d="M248 130a26 26 0 1 0 26 26 26 26 0 0 0-26-26"/></svg>', "time-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64Z" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="32px"/><path d="M256 128v144h96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "warning-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M85.57 446.25h340.86a32 32 0 0 0 28.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0 0 28.17 47.17" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="m250.26 195.39 5.74 122 5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 5.95" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path fill="#000000" d="M256 397.25a20 20 0 1 1 20-20 20 20 0 0 1-20 20"/></svg>', "trending-up-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M352 144h112v112" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="m48 368 121.37-121.37a32 32 0 0 1 45.26 0l50.74 50.74a32 32 0 0 0 45.26 0L448 160" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "arrow-down": '<svg fill="#000000" viewBox="0 0 512 512"><path d="m112 268 144 144 144-144M256 392V100" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="48px"/></svg>', "funnel-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="m35.4 87.12 168.65 196.44A16.07 16.07 0 0 1 208 294v119.32a7.93 7.93 0 0 0 5.39 7.59l80.15 26.67A7.94 7.94 0 0 0 304 440V294a16.07 16.07 0 0 1 4-10.44L476.6 87.12A14 14 0 0 0 466 64H46.05A14 14 0 0 0 35.4 87.12" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "move-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="m176 112 80-80 80 80M255.98 32l.02 448M176 400l80 80 80-80M400 176l80 80-80 80M112 176l-80 80 80 80M32 256h448" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "return-down-back-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="m112 352-64-64 64-64" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="M64 288h294c58.76 0 106-49.33 106-108v-20" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "sunny-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/><circle cx="256" cy="256" r="80" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32px"/></svg>', "moon-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/></svg>', "mail-unread-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M320 96H88a40 40 0 0 0-40 40v240a40 40 0 0 0 40 40h334.73a40 40 0 0 0 40-40V239" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><path d="m112 160 144 112 87-65.67" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="32px"/><circle cx="431.95" cy="128.05" r="47.95"/><path d="M432 192a63.95 63.95 0 1 1 63.95-63.95A64 64 0 0 1 432 192m0-95.9a32 32 0 1 0 31.95 32 32 32 0 0 0-31.95-32"/></svg>', "arrow-undo-outline": '<svg fill="#000000" viewBox="0 0 512 512"><path d="M240 424v-96c116.4 0 159.39 33.76 208 96 0-119.23-39.57-240-208-240V88L64 256Z" fill="none" stroke="#000000" stroke-linejoin="round" stroke-width="32px"/></svg>', "sidebar": '<svg viewBox="0 0 16 16" fill="none" stroke="#000000" stroke-width="1.5"><rect x="1.75" y="2.75" width="12.5" height="10.5" rx="2"/><path d="M6 3v10"/></svg>' } };

  // src/lib.ts
  var issues = [];
  var log = (m) => {
    console.log("[Contacts] " + m);
  };
  var warn = (m) => {
    issues.push(m);
    console.warn("[Contacts] " + m);
  };
  function col(s) {
    s = s.trim();
    if (s === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(",").map((x) => parseFloat(x));
      return { r: p[0] / 255, g: p[1] / 255, b: p[2] / 255, a: p.length > 3 ? p[3] : 1 };
    }
    let h = s.replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h.slice(0, 6), 16);
    return { r: (n >> 16 & 255) / 255, g: (n >> 8 & 255) / 255, b: (n & 255) / 255, a: h.length === 8 ? parseInt(h.slice(6), 16) / 255 : 1 };
  }
  var C = {
    /** Semantic colour variables, light and dark. Components bind to the light ones. */
    S: {},
    SD: {},
    /** Primitive variables (light), e.g. "blue/100". */
    P: {},
    PD: {},
    SP: {},
    R: {},
    TS: {},
    ES: {},
    ICON: {},
    FAMILY: "Atkinson Hyperlegible Next",
    MONO: "Atkinson Hyperlegible Mono",
    split: false,
    // true on the free plan: Light and Dark live in separate collections
    stats: { variables: 0, textStyles: 0, effectStyles: 0, icons: 0, components: 0, variants: 0, screens: 0, skipped: [] }
  };
  var FONT_STYLES = { Regular: "Regular", SemiBold: "SemiBold", Bold: "Bold" };
  async function setupFonts() {
    const all = await figma.listAvailableFontsAsync();
    const fam = (n) => all.filter((f) => f.fontName.family === n).map((f) => f.fontName.style);
    const pick = (styles, want) => want.find((s2) => styles.includes(s2)) || styles.find((s2) => /regular/i.test(s2)) || styles[0];
    let s = fam("Atkinson Hyperlegible Next");
    if (!s.length) {
      C.FAMILY = "Inter";
      s = fam("Inter");
      warn("Atkinson Hyperlegible Next is not available in this Figma account, so Inter was used. Install the font and run Rebuild to switch.");
    }
    let m = fam("Atkinson Hyperlegible Mono");
    if (!m.length) {
      C.MONO = fam("Roboto Mono").length ? "Roboto Mono" : C.FAMILY;
      m = fam(C.MONO);
    }
    FONT_STYLES.Regular = pick(s, ["Regular"]);
    FONT_STYLES.SemiBold = pick(s, ["SemiBold", "Semi Bold", "Bold"]);
    FONT_STYLES.Bold = pick(s, ["Bold"]);
    FONT_STYLES.Mono = pick(m, ["Regular"]);
    await Promise.all([
      figma.loadFontAsync({ family: C.FAMILY, style: FONT_STYLES.Regular }),
      figma.loadFontAsync({ family: C.FAMILY, style: FONT_STYLES.SemiBold }),
      figma.loadFontAsync({ family: C.FAMILY, style: FONT_STYLES.Bold }),
      figma.loadFontAsync({ family: C.MONO, style: FONT_STYLES.Mono })
    ]);
  }
  var syntax = (n) => "var(--" + n.replace(/\//g, "-") + ")";
  function scopesFor(n) {
    if (/(^|-)border|^focus-ring|segment-active-border/.test(n)) return ["STROKE_COLOR"];
    if (/^(text|on-)/.test(n)) return ["TEXT_FILL", "SHAPE_FILL"];
    if (/^(danger|warning|success)$/.test(n)) return ["ALL_FILLS", "STROKE_COLOR"];
    return ["FRAME_FILL", "SHAPE_FILL"];
  }
  async function buildVariables() {
    const cols = await figma.variables.getLocalVariableCollectionsAsync();
    const existing = await figma.variables.getLocalVariablesAsync();
    const byName = (n) => cols.find((c) => c.name === n);
    const made = /* @__PURE__ */ new Set();
    const idx = /* @__PURE__ */ new Map();
    for (const v of existing) idx.set(v.variableCollectionId + "|" + v.name, v);
    if (byName("Primitives/Light")) C.split = true;
    else if (byName("Primitives")) C.split = false;
    else {
      const probe = figma.variables.createVariableCollection("__probe");
      try {
        probe.addMode("Dark");
        C.split = false;
      } catch (e) {
        C.split = true;
      }
      probe.remove();
      if (C.split) warn("This Figma plan allows one mode per collection, so Dark values are separate collections: Primitives/Light + Primitives/Dark and Semantic/Light + Semantic/Dark.");
    }
    const coll = (name, modeNames) => {
      let c = byName(name);
      if (!c) {
        c = figma.variables.createVariableCollection(name);
        c.renameMode(c.modes[0].modeId, modeNames[0]);
        for (const mn of modeNames.slice(1)) c.addMode(mn);
        cols.push(c);
      }
      return { c, modes: c.modes.map((m) => m.modeId) };
    };
    const targets = (base) => {
      if (C.split) {
        const l = coll(base + "/Light", ["Value"]), d = coll(base + "/Dark", ["Value"]);
        return [{ coll: l.c, modeId: l.modes[0], mode: "light" }, { coll: d.c, modeId: d.modes[0], mode: "dark" }];
      }
      const x = coll(base, ["Light", "Dark"]);
      return [{ coll: x.c, modeId: x.modes[0], mode: "light" }, { coll: x.c, modeId: x.modes[1] || x.modes[0], mode: "dark" }];
    };
    const ensure = (c, name, type) => {
      const k = c.id + "|" + name;
      let v = idx.get(k);
      if (v) return { v, fresh: made.has(v.id) };
      v = figma.variables.createVariable(name, c, type);
      idx.set(k, v);
      made.add(v.id);
      C.stats.variables++;
      return { v, fresh: true };
    };
    const pt = targets("Primitives");
    for (const t of pt) {
      for (const [name, hexv] of DATA.prim[t.mode]) {
        const { v, fresh } = ensure(t.coll, name, "COLOR");
        if (fresh) {
          v.setValueForMode(t.modeId, col(hexv));
          v.scopes = [];
          v.setVariableCodeSyntax("WEB", syntax(name));
        }
        RESOLVED.set(v.id, col(hexv));
        (t.mode === "light" ? C.P : C.PD)[name] = v;
      }
    }
    const st = targets("Semantic");
    for (const t of st) {
      for (const tok3 of DATA.semantic) {
        const { v, fresh } = ensure(t.coll, tok3.name, "COLOR");
        if (fresh) {
          const aliasName = tok3.alias && tok3.alias[t.mode];
          const target = aliasName && (t.mode === "light" ? C.P : C.PD)[aliasName];
          v.setValueForMode(t.modeId, target ? figma.variables.createVariableAlias(target) : col(tok3[t.mode]));
          v.scopes = scopesFor(tok3.name);
          v.setVariableCodeSyntax("WEB", syntax(tok3.name));
        }
        const aliased = tok3.alias && tok3.alias[t.mode];
        RESOLVED.set(v.id, aliased && RESOLVED.get(((t.mode === "light" ? C.P : C.PD)[aliased] || {}).id) || col(tok3[t.mode]));
        (t.mode === "light" ? C.S : C.SD)[tok3.name] = v;
      }
    }
    const spc = coll("Spacing", ["Value"]);
    for (const [k, val] of DATA.space) {
      const { v, fresh } = ensure(spc.c, "space/" + k, "FLOAT");
      if (fresh) {
        v.setValueForMode(spc.modes[0], val);
        v.scopes = ["GAP", "WIDTH_HEIGHT"];
        v.setVariableCodeSyntax("WEB", "var(--space-" + k + ")");
      }
      C.SP["space/" + k] = v;
    }
    const rad = coll("Radius", ["Value"]);
    for (const [k, val] of DATA.radius) {
      const { v, fresh } = ensure(rad.c, "radius/" + k, "FLOAT");
      if (fresh) {
        v.setValueForMode(rad.modes[0], val);
        v.scopes = ["CORNER_RADIUS"];
        v.setVariableCodeSyntax("WEB", "var(--radius-" + k + ")");
      }
      C.R["radius/" + k] = v;
    }
    log(`Variables: ${C.stats.variables} created`);
  }
  function parseShadow(s) {
    return s.split(/,(?![^(]*\))/).map((part) => {
      const c = part.match(/rgba?\([^)]+\)/);
      const nums = part.replace(c ? c[0] : "", "").trim().split(/\s+/).map((x) => parseFloat(x));
      return { type: "DROP_SHADOW", color: c ? col(c[0]) : { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: nums[0] || 0, y: nums[1] || 0 }, radius: nums[2] || 0, spread: nums[3] || 0, visible: true, blendMode: "NORMAL" };
    });
  }
  async function buildStyles() {
    const ts = await figma.getLocalTextStylesAsync();
    const es = await figma.getLocalEffectStylesAsync();
    for (const t of DATA.type) {
      const name = "Type/" + t.name;
      let s = ts.find((x) => x.name === name);
      if (!s) {
        s = figma.createTextStyle();
        s.name = name;
        const mono = t.family === "mono";
        const style = mono ? FONT_STYLES.Mono : t.weight >= 700 ? FONT_STYLES.Bold : t.weight >= 600 ? FONT_STYLES.SemiBold : FONT_STYLES.Regular;
        s.fontName = { family: mono ? C.MONO : C.FAMILY, style };
        s.fontSize = t.size;
        s.lineHeight = { unit: "PIXELS", value: t.line };
        s.letterSpacing = { unit: "PERCENT", value: t.tracking ? parseFloat(t.tracking) * 100 : 0 };
        if (t.case === "upper") s.textCase = "UPPER";
        C.stats.textStyles++;
      }
      C.TS[t.name] = s;
    }
    for (const sh of DATA.shadow) for (const mode of ["light", "dark"]) {
      const name = `Shadow/${sh.name}/${mode === "light" ? "Light" : "Dark"}`;
      let e = es.find((x) => x.name === name);
      if (!e) {
        e = figma.createEffectStyle();
        e.name = name;
        e.effects = parseShadow(sh[mode]);
        C.stats.effectStyles++;
      }
      C.ES[name] = e;
    }
    log(`Styles: ${C.stats.textStyles} text, ${C.stats.effectStyles} effect created`);
  }
  var RESOLVED = /* @__PURE__ */ new Map();
  function paint(v, fallback = "#ff00ff") {
    const known = v && RESOLVED.get(v.id);
    const c0 = known || col(fallback);
    const base = __spreadValues({ type: "SOLID", color: { r: c0.r, g: c0.g, b: c0.b } }, known && known.a !== void 0 && known.a < 1 ? { opacity: known.a } : {});
    if (!v) {
      warn("missing colour variable");
      return base;
    }
    return figma.variables.setBoundVariableForPaint(base, "color", v);
  }
  function tok(name) {
    const v = name.includes("/") ? C.P[name] : C.S[name];
    if (!v) warn("unknown colour token " + name);
    return v;
  }
  var fillOf = (n, t) => {
    n.fills = t ? [paint(tok(t))] : [];
  };
  function strokeOf(n, t, w = 1, align = "INSIDE", dash) {
    n.strokes = [paint(tok(t))];
    n.strokeWeight = w;
    n.strokeAlign = align;
    if (dash) n.dashPattern = dash;
  }
  function radius(n, k) {
    var _a, _b;
    const v = C.R["radius/" + k];
    for (const f of ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"]) {
      n[f] = parseFloat(String((_b = (_a = DATA.radius.find((r) => r[0] === k)) == null ? void 0 : _a[1]) != null ? _b : 0));
      if (v) n.setBoundVariable(f, v);
    }
  }
  function space(n, field, val) {
    n[field] = val;
    const v = C.SP["space/" + val];
    if (v) n.setBoundVariable(field, v);
  }
  function effectStyle(n, name) {
    const s = C.ES[name];
    if (!s) {
      warn("missing effect style " + name);
      return;
    }
    return n.setEffectStyleIdAsync(s.id);
  }
  function focusRing(n) {
    const ring = (spread, token) => {
      const k = RESOLVED.get(C.S[token] && C.S[token].id) || { r: 0, g: 0, b: 0 };
      const e = { type: "DROP_SHADOW", color: { r: k.r, g: k.g, b: k.b, a: 1 }, offset: { x: 0, y: 0 }, radius: 0, spread, visible: true, blendMode: "NORMAL", showShadowBehindNode: true };
      return figma.variables.setBoundVariableForEffect(e, "color", C.S[token]);
    };
    n.effects = [ring(2, "bg"), ring(4, "focus-ring")];
  }
  function ringOf(n, primitive, spread = 3) {
    const k = RESOLVED.get(C.P[primitive] && C.P[primitive].id) || { r: 0, g: 0, b: 0 };
    const e = { type: "DROP_SHADOW", color: { r: k.r, g: k.g, b: k.b, a: 1 }, offset: { x: 0, y: 0 }, radius: 0, spread, visible: true, blendMode: "NORMAL", showShadowBehindNode: true };
    n.effects = [figma.variables.setBoundVariableForEffect(e, "color", C.P[primitive])];
  }
  function box(name, o = {}) {
    const f = o.comp ? figma.createComponent() : figma.createFrame();
    f.name = name;
    f.fills = [];
    f.clipsContent = !!o.clip;
    f.layoutMode = o.dir || "HORIZONTAL";
    if (f.layoutMode !== "NONE") {
      f.primaryAxisSizingMode = "AUTO";
      f.counterAxisSizingMode = "AUTO";
      f.primaryAxisAlignItems = o.justify || "MIN";
      f.counterAxisAlignItems = o.align || "CENTER";
      const p = o.pad == null ? [0, 0, 0, 0] : typeof o.pad === "number" ? [o.pad, o.pad, o.pad, o.pad] : o.pad.length === 2 ? [o.pad[0], o.pad[1], o.pad[0], o.pad[1]] : o.pad;
      space(f, "paddingTop", p[0]);
      space(f, "paddingRight", p[1]);
      space(f, "paddingBottom", p[2]);
      space(f, "paddingLeft", p[3]);
      space(f, "itemSpacing", o.gap || 0);
      if (o.wrap) f.layoutWrap = "WRAP";
    }
    if (o.fill) fillOf(f, o.fill);
    if (o.stroke) {
      strokeOf(f, o.stroke, o.sw || 1, "INSIDE", o.dash);
      if (o.strokeSides) {
        const s = o.strokeSides;
        f.strokeTopWeight = s.includes("t") ? o.sw || 1 : 0;
        f.strokeBottomWeight = s.includes("b") ? o.sw || 1 : 0;
        f.strokeLeftWeight = s.includes("l") ? o.sw || 1 : 0;
        f.strokeRightWeight = s.includes("r") ? o.sw || 1 : 0;
      }
    }
    if (o.radius) radius(f, o.radius);
    if (o.w != null || o.h != null) size(f, o.w, o.h);
    return f;
  }
  function size(f, w, h) {
    f.resize(Math.max(w != null ? w : f.width, 1), Math.max(h != null ? h : f.height, 1));
    if (f.layoutMode === "NONE") return;
    const horiz = f.layoutMode === "HORIZONTAL";
    const axis = (isW, fixed) => {
      const primary = horiz ? isW : !isW;
      if (primary) f.primaryAxisSizingMode = fixed ? "FIXED" : "AUTO";
      else f.counterAxisSizingMode = fixed ? "FIXED" : "AUTO";
    };
    axis(true, w != null);
    axis(false, h != null);
  }
  function add(parent, child) {
    parent.appendChild(child);
    return child;
  }
  function fillW(n) {
    n.layoutSizingHorizontal = "FILL";
    return n;
  }
  function grow(n) {
    n.layoutGrow = 1;
    return n;
  }
  function spacer() {
    const s = figma.createFrame();
    s.name = "spacer";
    s.fills = [];
    s.resize(1, 1);
    return s;
  }
  function rect(name, w, h, fill, r) {
    const x = figma.createRectangle();
    x.name = name;
    x.resize(w, h);
    fillOf(x, fill);
    if (r) radius(x, r);
    return x;
  }
  function ellipse(name, d, fill) {
    const e = figma.createEllipse();
    e.name = name;
    e.resize(d, d);
    fillOf(e, fill);
    return e;
  }
  async function txt(chars, style, color = "text", name, o = {}) {
    const t = figma.createText();
    const st = C.TS[style];
    if (!st) warn("missing text style " + style);
    t.fontName = st ? st.fontName : { family: C.FAMILY, style: FONT_STYLES.Regular };
    t.characters = chars;
    if (st) await t.setTextStyleIdAsync(st.id);
    if (o.w) {
      t.resize(o.w, t.height);
      t.textAutoResize = "HEIGHT";
    }
    if (o.align) t.textAlignHorizontal = o.align;
    if (o.underline) t.textDecoration = "UNDERLINE";
    fillOf(t, color);
    if (o.opacity != null) t.opacity = o.opacity;
    t.name = name || chars.slice(0, 28);
    return t;
  }
  function iconComp(name) {
    return C.ICON[name] || C.ICON[name + "-outline"];
  }
  function recolor(n, token) {
    const go = (x) => {
      if ("fills" in x && Array.isArray(x.fills) && x.fills.length && x.type !== "TEXT") x.fills = x.fills.map((p) => p.type === "SOLID" ? paint(tok(token)) : p);
      if ("strokes" in x && Array.isArray(x.strokes) && x.strokes.length) x.strokes = x.strokes.map((p) => p.type === "SOLID" ? paint(tok(token)) : p);
      if ("children" in x && x.type !== "INSTANCE") for (const c of x.children) go(c);
      else if (x.type === "INSTANCE") for (const c of x.children) go(c);
    };
    go(n);
  }
  function ico(name, sz = 16, color = "text", label) {
    const c = iconComp(name) || iconComp("information-circle");
    if (!c) throw new Error("icon missing: " + name);
    const i = c.createInstance();
    i.name = label || "Icon";
    i.resize(sz, sz);
    recolor(i, color);
    return i;
  }
  function variantOf(set, props) {
    const want = Object.entries(props).map(([k, v]) => `${k}=${v}`);
    const c = set.children.find((ch) => want.every((w) => ch.name.split(", ").includes(w)));
    if (!c) throw new Error(`variant not found in ${set.name}: ${want.join(", ")}`);
    return c;
  }
  function combine(host, comps, name, cols, description) {
    for (const c of comps) host.appendChild(c);
    const set = figma.combineAsVariants(comps, host);
    set.name = name;
    set.description = description;
    const gap = 24, pad = 24;
    const colW = [], rowH = [];
    set.children.forEach((ch, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      colW[c] = Math.max(colW[c] || 0, ch.width);
      rowH[r] = Math.max(rowH[r] || 0, ch.height);
    });
    set.children.forEach((ch, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      ch.x = pad + colW.slice(0, c).reduce((a, b) => a + b + gap, 0);
      ch.y = pad + rowH.slice(0, r).reduce((a, b) => a + b + gap, 0);
    });
    let mx = 0, my = 0;
    for (const ch of set.children) {
      mx = Math.max(mx, ch.x + ch.width);
      my = Math.max(my, ch.y + ch.height);
    }
    set.resizeWithoutConstraints(mx + pad, my + pad);
    set.strokes = [{ type: "SOLID", color: { r: 0.592, g: 0.278, b: 1 } }];
    set.dashPattern = [6, 4];
    set.strokeWeight = 1;
    C.stats.components++;
    C.stats.variants += comps.length;
    return set;
  }
  function own(root, pred) {
    const out = [];
    const walk = (n) => {
      if (pred(n)) out.push(n);
      if (n.type !== "INSTANCE" && "children" in n) for (const c of n.children) walk(c);
    };
    for (const c of root.children) walk(c);
    return out;
  }
  var variantsOf = (o) => o.type === "COMPONENT_SET" ? o.children : [o];
  function linkText(o, prop, def, nodeName) {
    const key = o.addComponentProperty(prop, "TEXT", def);
    for (const v of variantsOf(o)) for (const t of own(v, (n) => n.type === "TEXT" && n.name === nodeName)) {
      t.componentPropertyReferences = Object.assign({}, t.componentPropertyReferences, { characters: key });
    }
    return key;
  }
  function linkBool(o, prop, def, nodeName) {
    const key = o.addComponentProperty(prop, "BOOLEAN", def);
    for (const v of variantsOf(o)) for (const t of own(v, (n) => n.name === nodeName)) t.componentPropertyReferences = Object.assign({}, t.componentPropertyReferences, { visible: key });
    return key;
  }
  function linkSwap(o, prop, defIcon, nodeName) {
    const def = iconComp(defIcon);
    if (!def) return;
    const key = o.addComponentProperty(prop, "INSTANCE_SWAP", def.id);
    for (const v of variantsOf(o)) for (const t of own(v, (n) => n.type === "INSTANCE" && n.name === nodeName)) t.componentPropertyReferences = Object.assign({}, t.componentPropertyReferences, { mainComponent: key });
    return key;
  }
  function propKey(i, name) {
    return Object.keys(i.componentProperties).find((k) => k === name || k.startsWith(name + "#"));
  }
  function setProp(i, name, value) {
    const k = propKey(i, name);
    if (!k) {
      warn(`property "${name}" not found on ${i.name}`);
      return;
    }
    i.setProperties({ [k]: value });
  }
  function setProps(i, p) {
    for (const [k, v] of Object.entries(p)) setProp(i, k, v);
  }
  function find(n, name) {
    return "findOne" in n ? n.findOne((x) => x.name === name) : null;
  }
  function findAll(n, name) {
    return "findAll" in n ? n.findAll((x) => x.name === name) : [];
  }
  function findInst(n, name) {
    return find(n, name) || null;
  }
  function setByName(page, name) {
    return page.findOne((n) => {
      var _a;
      return n.type === "COMPONENT_SET" && n.name === name || n.type === "COMPONENT" && n.name === name && ((_a = n.parent) == null ? void 0 : _a.type) !== "COMPONENT_SET";
    });
  }
  var tag = (n) => {
    n.setPluginData("generated", "1");
    return n;
  };
  var isTagged = (n) => n.getPluginData("generated") === "1";
  function newSection(page, name) {
    const s = figma.createSection();
    s.name = name;
    page.appendChild(s);
    tag(s);
    return s;
  }
  function nextY(page, gap = 160) {
    let y = 0;
    for (const n of page.children) y = Math.max(y, n.y + n.height + gap);
    return y;
  }
  async function fitSection(sec, page, title, desc, nodes, opts = {}) {
    var _a;
    const pad = 80, gap = (_a = opts.gap) != null ? _a : 64;
    const head2 = box("Header", { dir: "VERTICAL", gap: 8, align: "MIN" });
    add(head2, await txt(title, "display", "text", "Title"));
    add(head2, await txt(desc, "body", "text-muted", "Description", { w: 880 }));
    sec.appendChild(head2);
    head2.x = pad;
    head2.y = pad;
    let x = pad, y = pad + head2.height + 48, w = head2.width, bottom = y;
    for (const n of nodes) {
      sec.appendChild(n);
      if (opts.row) {
        n.x = x;
        n.y = y;
        x += n.width + gap;
        bottom = Math.max(bottom, y + n.height);
        w = Math.max(w, x - gap - pad);
      } else {
        n.x = pad;
        n.y = y;
        y += n.height + gap;
        bottom = y - gap;
        w = Math.max(w, n.width);
      }
    }
    sec.resizeWithoutConstraints(w + pad * 2, bottom + pad);
    sec.x = 0;
    sec.y = nextYExcluding(page, sec);
  }
  function nextYExcluding(page, sec, gap = 160) {
    let y = 0;
    for (const n of page.children) if (n !== sec) y = Math.max(y, n.y + n.height + gap);
    return y;
  }
  function restack(page, gap = 160) {
    const secs = page.children.filter((c) => c.type === "SECTION").sort((a, b) => a.y - b.y);
    let bottom = -Infinity;
    for (const s of secs) {
      if (s.y < bottom + gap) s.y = bottom + gap;
      bottom = s.y + s.height;
    }
  }

  // src/components.ts
  var STAGES = ["Lead", "Prospect", "Qualified", "Customer"];
  var HUE = { Lead: "blue", Prospect: "violet", Qualified: "amber", Customer: "green" };
  var REG = {};
  function mk(name, vp) {
    const o = REG[name];
    if (!o) throw new Error("component not built yet: " + name);
    if (o.type === "COMPONENT_SET") return (vp ? variantOf(o, vp) : o.defaultVariant).createInstance();
    return o.createInstance();
  }
  function swap(i, prop, icon) {
    const c = iconComp(icon);
    if (c) setProp(i, prop, c.id);
  }
  function hueFor(name) {
    let h = 0;
    for (const ch of name) h = h * 31 + ch.charCodeAt(0) >>> 0;
    return ["blue", "violet", "amber", "green"][h % 4];
  }
  var initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  function avatar(name, sz = 24) {
    const a = mk("Avatar", { Size: String(sz), Hue: hueFor(name) });
    setProp(a, "initials", initials(name));
    return a;
  }
  async function buildAvatar(host) {
    const comps = [];
    for (const sz of [24, 32, 48]) for (const hue of ["blue", "violet", "amber", "green", "empty"]) {
      const c = box(`Size=${sz}, Hue=${hue}`, { comp: true, justify: "CENTER", radius: "full", w: sz, h: sz });
      if (hue === "empty") strokeOf(c, "border-strong", 1, "INSIDE", [4, 3]);
      else {
        fillOf(c, `${hue}/100`);
        add(c, await txt("AR", sz === 24 ? "label" : sz === 32 ? "caption-strong" : "card-name", `${hue}/800`, "initials"));
      }
      comps.push(c);
    }
    const set = combine(host, comps, "Avatar", 5, 'Initials on a hue derived from the name (-100 fill, -800 text). "empty" is the dashed circle for a missing owner.');
    linkText(set, "initials", "AR", "initials");
    REG["Avatar"] = set;
    return [set];
  }
  async function buildStagePill(host) {
    const comps = [];
    for (const s of STAGES) {
      const h = HUE[s];
      const c = box(`Stage=${s}`, { comp: true, gap: 6, pad: [0, 10, 0, 8], fill: `${h}/100`, radius: "full", h: 24 });
      add(c, ellipse("dot", 8, `${h}/600`));
      add(c, await txt(s, "caption-strong", `${h}/800`, "stage-label"));
      comps.push(c);
    }
    const set = combine(host, comps, "Stage pill", 4, "Read-only stage badge for table, board header and panel. Colour always comes with the stage name.");
    REG["Stage pill"] = set;
    return [set];
  }
  async function buildLabelTag(host) {
    const c = box("Label tag", { comp: true, pad: [0, 6], stroke: "border-strong", radius: "sm", h: 20 });
    add(c, await txt("Warm", "label", "text", "label-text"));
    host.appendChild(c);
    c.description = "A contact label (outlined, sharp corners).";
    const key = c.addComponentProperty("label", "TEXT", "Warm");
    c.children[0].componentPropertyReferences = { characters: key };
    C.stats.components++;
    REG["Label tag"] = c;
    return [c];
  }
  async function buildBadge(host) {
    const spec = { count: [null, "text-muted"], danger: ["danger-solid", "text-inverse"], info: ["blue/100", "blue/800"] };
    const comps = [];
    for (const [type, [bg, fg]] of Object.entries(spec)) {
      const c = box(`Type=${type}`, { comp: true, justify: "CENTER", pad: type === "count" ? 0 : [0, 6], radius: type === "count" ? void 0 : "sm", h: 20, fill: bg });
      add(c, await txt("3", type === "count" ? "body-sm" : "label", fg, "badge-value"));
      comps.push(c);
    }
    const set = combine(host, comps, "Badge", 3, 'Sidebar counts: plain count, danger (new conversations) and info ("5 new").');
    linkText(set, "value", "3", "badge-value");
    REG["Badge"] = set;
    return [set];
  }
  async function buildKbd(host) {
    const c = box("Kbd", { comp: true, justify: "CENTER", pad: [1, 6], stroke: "border-strong", radius: "sm" });
    add(c, await txt("/", "mono", "text", "key"));
    host.appendChild(c);
    c.description = "Keyboard key hint (.kbd in index.css).";
    const key = c.addComponentProperty("key", "TEXT", "/");
    c.children[0].componentPropertyReferences = { characters: key };
    C.stats.components++;
    REG["Kbd"] = c;
    return [c];
  }
  var BTN = {
    primary: { fill: "action", fg: "on-action", hover: "action-hover", press: "action-hover" },
    secondary: { fill: "surface", fg: "text", stroke: "border-strong", hover: "surface-hover", press: "surface-pressed" },
    ghost: { fill: null, fg: "text", hover: "surface-hover", press: "surface-pressed" },
    danger: { fill: "danger-solid", fg: "text-inverse", hover: "danger-solid", press: "danger-solid" }
  };
  async function buildButton(host) {
    const comps = [];
    for (const type of Object.keys(BTN)) for (const sz of ["sm", "md"]) for (const st of ["default", "hover", "pressed", "focus", "disabled"]) {
      const b = BTN[type];
      const f = st === "hover" ? b.hover : st === "pressed" ? b.press : b.fill;
      const c = box(`Type=${type}, Size=${sz}, State=${st}`, { comp: true, gap: 8, pad: [0, sz === "sm" ? 12 : 16], justify: "CENTER", fill: f, stroke: b.stroke, radius: "sm", h: sz === "sm" ? 32 : 40 });
      if (type === "danger" && (st === "hover" || st === "pressed")) c.fills = c.fills.map((p) => Object.assign({}, p, { opacity: st === "hover" ? 0.9 : 0.8 }));
      add(c, ico("checkmark", 16, b.fg, "icon")).visible = false;
      add(c, await txt("Button", "body-sm-strong", b.fg, "label"));
      if (st === "focus") focusRing(c);
      if (st === "disabled") c.opacity = 0.4;
      comps.push(c);
    }
    const set = combine(host, comps, "Button", 5, "Verb-first, sentence case. Primary at most once per view. Pressed in the app also scales to 97% (not drawn).");
    linkText(set, "label", "Button", "label");
    linkBool(set, "show icon", false, "icon");
    linkSwap(set, "icon", "checkmark", "icon");
    REG["Button"] = set;
    return [set];
  }
  function button(label, type = "secondary", sz = "md", icon) {
    const b = mk("Button", { Type: type, Size: sz, State: "default" });
    setProp(b, "label", label);
    if (icon) {
      setProp(b, "show icon", true);
      swap(b, "icon", icon);
    }
    return b;
  }
  async function buildIconButton(host) {
    const comps = [];
    for (const st of ["default", "hover", "focus", "disabled"]) {
      const c = box(`State=${st}`, { comp: true, justify: "CENTER", fill: st === "hover" ? "surface-hover" : null, radius: "sm", w: 32, h: 32 });
      add(c, ico("close", 16, st === "hover" ? "text" : "text-muted", "icon"));
      if (st === "focus") focusRing(c);
      if (st === "disabled") c.opacity = 0.4;
      comps.push(c);
    }
    const set = combine(host, comps, "Icon button", 4, "32px icon-only button. Always labelled in code (aria-label and tooltip).");
    linkSwap(set, "icon", "close", "icon");
    REG["Icon button"] = set;
    return [set];
  }
  function iconButton(icon) {
    const b = mk("Icon button", { State: "default" });
    swap(b, "icon", icon);
    return b;
  }
  async function buildSegmentedItem(host) {
    const comps = [];
    for (const sel of ["yes", "no"]) for (const st of ["default", "hover", "focus"]) {
      const on = sel === "yes";
      const c = box(`Selected=${sel}, State=${st}`, { comp: true, gap: 6, pad: [0, 12], justify: "CENTER", fill: on ? "segment-active" : null, radius: "sm", h: 28 });
      if (on) {
        strokeOf(c, "segment-active-border", 1, "INSIDE");
      }
      const fg = on || st === "hover" ? "text" : "text-muted";
      add(c, ico(on ? "list" : "list-outline", 16, fg, "icon"));
      add(c, await txt("Table", "body-sm-strong", fg, "label"));
      if (on) await effectStyle(c, "Shadow/elevation-1/Light");
      if (st === "focus") focusRing(c);
      comps.push(c);
    }
    const set = combine(host, comps, "Segmented item", 3, "One option of the Table / Board switch. Selected: raised white segment with a filled icon.");
    linkText(set, "label", "Table", "label");
    linkSwap(set, "icon", "list-outline", "icon");
    REG["Segmented item"] = set;
    return [set];
  }
  async function buildViewSwitch(host) {
    const comps = [];
    for (const v of ["Table", "Board"]) {
      const c = box(`Value=${v}`, { comp: true, pad: 2, fill: "surface-sunken", stroke: "border", radius: "sm" });
      for (const o of ["Table", "Board"]) {
        const i = mk("Segmented item", { Selected: o === v ? "yes" : "no", State: "default" });
        setProp(i, "label", o);
        swap(i, "icon", o === "Table" ? o === v ? "list" : "list-outline" : o === v ? "albums" : "albums-outline");
        i.name = o;
        add(c, i);
      }
      comps.push(c);
    }
    const set = combine(host, comps, "View switch", 2, "Table / Board switch (native radios in code, so arrow keys switch views). Built from Segmented item.");
    REG["View switch"] = set;
    return [set];
  }
  async function buildSearchInput(host) {
    const comps = [];
    for (const st of ["empty", "filled", "focus"]) {
      const filled = st === "filled";
      const c = box(`State=${st}`, { comp: true, gap: 8, pad: [0, 8, 0, 10], fill: "surface", stroke: "border-strong", radius: "sm", w: 280, h: 32 });
      add(c, ico("search", 16, "text-muted", "icon"));
      const v = add(c, await txt(filled ? "Lena" : "Search name, company or email", "body-sm", filled ? "text" : "text-subtle", "value"));
      grow(v);
      const k = add(c, mk("Kbd"));
      k.name = "shortcut";
      setProp(k, "key", "/");
      k.visible = !filled;
      const x = add(c, box("clear", { justify: "CENTER", radius: "sm", w: 24, h: 24 }));
      add(x, ico("close", 16, "text-muted", "icon"));
      x.visible = filled;
      if (st === "focus") focusRing(c);
      comps.push(c);
    }
    const set = combine(host, comps, "Search input", 3, 'Header search. "/" focuses it; Esc clears it. Shows a clear button once it has text.');
    linkText(set, "value", "Search name, company or email", "value");
    linkBool(set, "show shortcut hint", true, "shortcut");
    REG["Search input"] = set;
    return [set];
  }
  async function buildSelect(host) {
    const comps = [];
    for (const st of ["default", "focus"]) {
      const c = box(`State=${st}`, { comp: true, gap: 8, pad: [0, 10], fill: "surface", stroke: "border-strong", radius: "sm", w: 184, h: 32 });
      add(c, ico("person-circle", 16, "text-muted", "icon"));
      grow(add(c, await txt("Everyone", "body-sm", "text", "value")));
      add(c, ico("chevron-down", 16, "text-muted", "chevron"));
      if (st === "focus") focusRing(c);
      comps.push(c);
    }
    const set = combine(host, comps, "Select", 2, "Owner filter (native select styled to match).");
    linkText(set, "value", "Everyone", "value");
    REG["Select"] = set;
    return [set];
  }
  async function buildFilterChip(host) {
    const c = box("Filter chip", { comp: true, gap: 4, pad: [0, 4, 0, 12], fill: "surface", stroke: "border", radius: "full", h: 28 });
    add(c, await txt("Owner is Sara Kim", "body-sm", "text", "label"));
    const x = add(c, box("remove", { justify: "CENTER", radius: "full", w: 20, h: 20 }));
    add(x, ico("close", 16, "text-muted", "icon"));
    host.appendChild(c);
    c.description = "An active filter with a remove button.";
    const key = c.addComponentProperty("label", "TEXT", "Owner is Sara Kim");
    c.children[0].componentPropertyReferences = { characters: key };
    C.stats.components++;
    REG["Filter chip"] = c;
    return [c];
  }
  var COLS = [
    { label: "Name", icon: "person-outline", w: 240 },
    { label: "Stage", icon: "flag-outline", w: 130 },
    { label: "Company", icon: "business-outline", w: 190 },
    { label: "Role", icon: "briefcase-outline", w: 180 },
    { label: "Owner", icon: "person-circle-outline", w: 140 },
    { label: "Labels", icon: "pricetags-outline", w: 200 },
    { label: "Email", icon: "mail-outline", w: 240 },
    { label: "Notes", icon: "document-text-outline", w: 320 }
  ];
  async function buildTableHeaderCell(host) {
    const comps = [];
    for (const type of ["regular", "sticky"]) {
      const c = box(`Type=${type}`, { comp: true, gap: 6, pad: [12, 12], fill: "bg", stroke: "border", strokeSides: type === "sticky" ? "br" : "b", w: type === "sticky" ? 240 : 190, h: 41, align: "CENTER" });
      add(c, ico("person-outline", 16, "text-muted", "icon"));
      add(c, await txt("Company", "caption-strong", "text-muted", "label"));
      comps.push(c);
    }
    const set = combine(host, comps, "Table header cell", 2, "Column header with an icon. The Name column is sticky (frozen) with a right divider.");
    linkText(set, "label", "Company", "label");
    linkSwap(set, "icon", "person-outline", "icon");
    REG["Table header cell"] = set;
    return [set];
  }
  var CELL_CONTENT = ["name", "text", "muted", "stage", "owner", "no-owner", "labels", "missing"];
  async function buildTableCell(host) {
    const comps = [];
    for (const k of CELL_CONTENT) {
      const c = box(`Content=${k}`, { comp: true, gap: k === "name" ? 8 : k === "labels" ? 4 : 6, pad: [0, 12], fill: "bg", stroke: "border", strokeSides: k === "name" ? "br" : "b", w: k === "name" ? 240 : 190, h: 48 });
      if (k === "name") {
        add(c, mk("Avatar", { Size: "24", Hue: "blue" })).name = "Avatar";
        add(c, await txt("Maya Patel", "body-sm-strong", "text", "value"));
      }
      if (k === "text") add(c, await txt("Lumen Brew", "body-sm", "text", "value"));
      if (k === "muted") add(c, await txt("maya@lumenbrew.co", "body-sm", "text-muted", "value"));
      if (k === "stage") add(c, mk("Stage pill", { Stage: "Lead" })).name = "Stage pill";
      if (k === "owner") {
        add(c, mk("Avatar", { Size: "24", Hue: "blue" })).name = "Avatar";
        add(c, await txt("Arjun", "body-sm", "text", "value"));
      }
      if (k === "no-owner") {
        add(c, mk("Avatar", { Size: "24", Hue: "empty" })).name = "Avatar";
        add(c, await txt("No owner", "body-sm", "text-subtle", "value"));
      }
      if (k === "labels") {
        add(c, mk("Label tag")).name = "Label 1";
        add(c, mk("Label tag")).name = "Label 2";
        add(c, await txt("+1", "caption-strong", "text-muted", "more"));
      }
      if (k === "missing") add(c, await txt("\u2014", "body-sm", "text-subtle", "value"));
      comps.push(c);
    }
    const set = combine(host, comps, "Table cell", 4, 'One table cell. "missing" draws an em dash on purpose. Name is the frozen first column (avatar + semibold name).');
    linkText(set, "value", "Value", "value");
    REG["Table cell"] = set;
    return [set];
  }
  async function buildTableRow(host) {
    const comps = [];
    const plan = [["Name", "name"], ["Stage", "stage"], ["Company", "text"], ["Role", "text"], ["Owner", "owner"], ["Labels", "labels"], ["Email", "muted"], ["Notes", "muted"]];
    for (const st of ["default", "hover", "selected", "flash"]) {
      const bg = st === "hover" ? "surface-hover" : st === "selected" ? "blue/50" : st === "flash" ? "amber/100" : "bg";
      const c = box(`State=${st}`, { comp: true, h: 48, align: "MIN" });
      plan.forEach(([nm, kind], i) => {
        const cell = mk("Table cell", { Content: kind });
        cell.name = nm;
        add(c, cell);
        cell.resize(COLS[i].w, 48);
        cell.fills = [paint(tok(bg))];
      });
      comps.push(c);
    }
    const set = combine(host, comps, "Table row", 1, "A contact row made of Table cell instances. selected = blue-50; flash = amber-100 (the 1.6s row flash after a save, shown static).");
    REG["Table row"] = set;
    return [set];
  }

  // src/components2.ts
  function oneLine(t) {
    t.textAutoResize = "HEIGHT";
    t.textTruncation = "ENDING";
    t.maxLines = 1;
    t.layoutSizingHorizontal = "FILL";
    return t;
  }
  function wrapText(t, align) {
    t.textAutoResize = "HEIGHT";
    t.layoutSizingHorizontal = "FILL";
    if (align) t.textAlignHorizontal = align;
    return t;
  }
  async function buildContactCard(host) {
    const comps = [];
    for (const st of ["default", "hover", "selected", "dragging", "flash"]) {
      const c = box(`State=${st}`, { comp: true, dir: "VERTICAL", gap: 12, pad: 12, align: "MIN", fill: "surface", stroke: st === "selected" ? "action" : st === "hover" || st === "dragging" ? "border-strong" : "border", sw: st === "selected" ? 2 : 1, radius: "md", w: 256 });
      const id = add(c, box("Identity", { dir: "VERTICAL", gap: 2, align: "MIN" }));
      fillW(id);
      oneLine(add(id, await txt("Daniel Okafor", "card-name", "text", "name")));
      oneLine(add(id, await txt("CTO \xB7 Northwind Labs", "body-sm", "text-muted", "subtitle")));
      const miss = add(id, await txt("No role or company", "body-sm", "text-subtle", "no role or company"));
      miss.visible = false;
      const labels = add(c, box("Labels", { gap: 4 }));
      add(labels, mk("Label tag")).name = "Label 1";
      add(labels, mk("Label tag")).name = "Label 2";
      add(labels, await txt("+1", "caption-strong", "text-muted", "more"));
      const foot = add(c, box("Footer", { gap: 8 }));
      fillW(foot);
      const owner = add(foot, box("Owner", { gap: 6 }));
      add(owner, mk("Avatar", { Size: "24", Hue: "blue" })).name = "Avatar";
      add(owner, await txt("Sara", "caption", "text-muted", "owner name"));
      grow(add(foot, spacer()));
      add(foot, ico("document-text", 16, "text-muted", "notes icon"));
      if (st === "hover") await effectStyle(c, "Shadow/elevation-1/Light");
      if (st === "dragging") await effectStyle(c, "Shadow/elevation-4/Light");
      if (st === "flash") ringOf(c, "amber/300", 4);
      comps.push(c);
    }
    const set = combine(host, comps, "Contact card", 5, "Board card: only what identifies a person (name, role \xB7 company, up to two labels, owner, a notes hint). Stage is the column, so it is not repeated. dragging is the floating copy (the 2\xB0 tilt is applied on the instance).");
    linkText(set, "name", "Daniel Okafor", "name");
    linkText(set, "subtitle", "CTO \xB7 Northwind Labs", "subtitle");
    linkBool(set, "show labels", true, "Labels");
    linkBool(set, "show owner", true, "Owner");
    linkBool(set, "show notes icon", true, "notes icon");
    linkBool(set, "missing subtitle", false, "no role or company");
    REG["Contact card"] = set;
    return [set];
  }
  async function buildColumnHeader(host) {
    const comps = [];
    for (const s of STAGES) {
      const c = box(`Stage=${s}`, { comp: true, gap: 8, pad: [4, 4, 0, 4], w: 256 });
      add(c, mk("Stage pill", { Stage: s }));
      const n = add(c, box("Count", { justify: "CENTER", pad: [0, 8], fill: "surface", stroke: "border", radius: "full", h: 24 }));
      n.minWidth = 24;
      add(n, await txt("4", "caption-strong", "text-muted", "count"));
      comps.push(c);
    }
    const set = combine(host, comps, "Column header", 4, "Stage pill plus a live count. Counts update as cards move.");
    linkText(set, "count", "4", "count");
    REG["Column header"] = set;
    return [set];
  }
  async function buildEmptyColumn(host) {
    const comps = [];
    for (const type of ["empty", "filtered", "drop-target"]) for (const s of STAGES) {
      const h = HUE[s];
      const c = box(`Type=${type}, Stage=${s}`, {
        comp: true,
        dir: "VERTICAL",
        gap: 8,
        pad: 24,
        justify: "CENTER",
        align: "CENTER",
        radius: "md",
        w: 256,
        h: type === "filtered" ? 200 : 240,
        fill: type === "drop-target" ? `${h}/100` : null,
        stroke: type === "empty" ? `${h}/300` : type === "filtered" ? "border-strong" : `${h}/600`,
        sw: type === "drop-target" ? 2 : type === "empty" ? 1.5 : 1,
        dash: [6, 4]
      });
      const circle = add(c, box("Icon", { justify: "CENTER", radius: "full", w: 40, h: 40, fill: type === "empty" ? `${h}/100` : type === "filtered" ? "surface" : `${h}/600` }));
      if (type === "filtered") strokeOf(circle, "border", 1, "INSIDE");
      add(circle, ico(type === "empty" ? "trending-up" : type === "filtered" ? "funnel" : "arrow-down", 20, type === "empty" ? `${h}/800` : type === "filtered" ? "text-muted" : "text-inverse", "glyph"));
      const title = type === "empty" ? `No ${s.toLowerCase()} contacts yet` : type === "filtered" ? "None match your filters" : `Drop to move to ${s}`;
      const msg = type === "empty" ? `Drag a card here, or open a contact and set its stage to ${s}.` : type === "filtered" ? `2 ${s} contacts are hidden by your filters.` : "Daniel Okafor will leave their current stage. You can undo right after.";
      wrapText(add(c, await txt(title, "body-sm-strong", type === "drop-target" ? `${h}/800` : "text", "title")), "CENTER");
      wrapText(add(c, await txt(msg, "body-sm", type === "drop-target" ? `${h}/800` : "text-muted", "message")), "CENTER");
      if (type === "filtered") {
        const b = add(c, button("Clear filters", "secondary", "sm"));
        b.name = "Clear filters";
      }
      comps.push(c);
    }
    const set = combine(host, comps, "Empty column", 4, "A stage column with no cards: empty for everyone, empty because of the filters (offers Clear filters), or the live drop target while dragging. The count of hidden contacts is part of the message text.");
    linkText(set, "message", "Message", "message");
    REG["Empty column"] = set;
    return [set];
  }
  async function buildStageOption(host) {
    const comps = [];
    for (const s of STAGES) for (const st of ["unselected", "selected", "saved", "hover", "focus"]) {
      const h = HUE[s];
      const sel = st === "selected";
      const c = box(`Stage=${s}, State=${st}`, {
        comp: true,
        gap: 6,
        pad: [0, sel ? 7 : 8],
        radius: "full",
        h: 32,
        fill: sel ? `${h}/100` : st === "saved" ? `${h}/50` : "surface",
        stroke: sel || st === "saved" ? `${h}/600` : st === "hover" ? "border-strong" : "border",
        sw: sel ? 2 : 1,
        dash: st === "saved" ? [4, 3] : void 0
      });
      const fg = sel || st === "saved" ? `${h}/800` : st === "hover" ? "text" : "text-muted";
      add(c, sel ? ico("checkmark-circle", 16, fg, "check") : ellipse("dot", 8, `${h}/600`));
      add(c, await txt(s, "caption-strong", fg, "label"));
      if (sel) ringOf(c, `${h}/50`, 3);
      if (st === "focus") focusRing(c);
      comps.push(c);
    }
    const set = combine(host, comps, "Stage option", 5, "One stop on the stage picker (a real radio underneath). selected = ticked + 2px border; saved = dashed outline while a different stage is chosen.");
    REG["Stage option"] = set;
    return [set];
  }
  async function buildStagePicker(host) {
    const c = box("Stage picker", { comp: true, dir: "VERTICAL", gap: 8, align: "MIN", w: 392 });
    add(c, await txt("Stage", "body-sm-strong", "text", "legend"));
    const row = add(c, box("Options", { gap: 2, wrap: true }));
    fillW(row);
    row.counterAxisSpacing = 8;
    STAGES.forEach((s, i) => {
      if (i > 0) add(row, ico("chevron-forward", 16, "text-subtle", "chevron"));
      const o = add(row, mk("Stage option", { Stage: s, State: s === "Qualified" ? "selected" : s === "Prospect" ? "saved" : "unselected" }));
      o.name = s;
    });
    const hint = add(c, box("Hint", { gap: 6 }));
    add(hint, ico("information-circle", 16, "text-muted", "icon"));
    add(hint, await txt("Saved as Prospect. Saving moves this contact to Qualified.", "caption", "text-muted", "hint text"));
    host.appendChild(c);
    c.description = "The pipeline as four stage pills joined by chevrons. Arrow keys move the choice. The hint shows only while the choice differs from the saved stage.";
    linkBool(c, "show hint", true, "Hint");
    C.stats.components++;
    REG["Stage picker"] = c;
    return [c];
  }
  function setPicker(p, selected, saved, hint) {
    for (const s of STAGES) {
      const o = find(p, s);
      if (!o) continue;
      setProp(o, "State", s === selected ? "selected" : s === saved && s !== selected ? "saved" : "unselected");
    }
    setProp(p, "show hint", !!hint);
    const t = find(p, "hint text");
    if (t && hint) t.characters = hint;
  }
  async function buildNotesField(host) {
    const comps = [];
    for (const st of ["empty", "filled", "focus"]) {
      const c = box(`State=${st}`, { comp: true, dir: "VERTICAL", gap: 8, align: "MIN", w: 392 });
      add(c, await txt("Notes", "body-sm-strong", "text", "label"));
      const ta = add(c, box("Textarea", { dir: "VERTICAL", align: "MIN", pad: [8, 12], fill: "surface", stroke: "border-strong", radius: "sm", h: 136 }));
      fillW(ta);
      wrapText(add(ta, await txt(st === "empty" ? "Add a note about this contact" : "Needs a security review before the pilot.", "body", st === "empty" ? "text-subtle" : "text", "value")));
      if (st === "focus") focusRing(ta);
      const cnt = add(c, await txt(st === "empty" ? "0 / 1000" : "41 / 1000", "caption", "text-muted", "counter"));
      cnt.textAlignHorizontal = "RIGHT";
      cnt.textAutoResize = "HEIGHT";
      cnt.layoutSizingHorizontal = "FILL";
      comps.push(c);
    }
    const set = combine(host, comps, "Notes field", 3, "Multi-line notes with a live character counter (max 1000). Edits stay in a draft until Save changes.");
    linkText(set, "value", "Add a note about this contact", "value");
    linkText(set, "counter", "0 / 1000", "counter");
    REG["Notes field"] = set;
    return [set];
  }
  async function buildDetailRow(host) {
    const comps = [];
    for (const st of ["filled", "missing"]) {
      const c = box(`State=${st}`, { comp: true, gap: 16, align: "MIN", w: 392 });
      await txt("Company", "body-sm", "text-muted", "label", { w: 96 }).then((t) => add(c, t));
      if (st === "filled") grow(add(c, await txt("Northwind Labs", "body-sm", "text", "value")));
      else {
        const v = add(c, box("Missing", { gap: 6 }));
        add(v, ico("mail-unread", 16, "text-subtle", "icon"));
        add(v, await txt("No email yet", "body-sm", "text-subtle", "value"));
      }
      comps.push(c);
    }
    const set = combine(host, comps, "Detail row", 2, 'A label + value row in the details panel. Missing values say what is missing ("No email yet") instead of staying blank.');
    linkText(set, "label", "Company", "label");
    linkText(set, "value", "Northwind Labs", "value");
    linkSwap(set, "icon", "mail-unread", "icon");
    REG["Detail row"] = set;
    return [set];
  }
  async function buildPanelFooter(host) {
    const comps = [];
    for (const st of ["clean", "dirty", "saved"]) {
      const dirty = st === "dirty";
      const c = box(`State=${st}`, { comp: true, gap: 8, pad: [16, 24], fill: dirty ? "warning-bg" : null, stroke: dirty ? "warning-border" : "border", strokeSides: "t", w: 440, h: dirty ? void 0 : 72 });
      if (dirty) {
        const col2 = add(c, box("Summary", { dir: "VERTICAL", align: "MIN" }));
        grow(col2);
        const l1 = add(col2, box("Line", { gap: 4 }));
        add(l1, await txt("2", "body-sm-strong", "text", "change count"));
        add(l1, await txt("unsaved changes", "body-sm-strong", "text", "unsaved label"));
        add(col2, await txt("\u2318\u21B5 save \xB7 Esc cancel", "caption", "text-muted", "shortcuts"));
        add(c, button("Cancel", "secondary", "md")).name = "Cancel";
        add(c, button("Save changes", "primary", "md", "checkmark")).name = "Save changes";
      } else {
        const saved = st === "saved";
        add(c, ico(saved ? "checkmark-circle" : "checkmark-circle-outline", 20, saved ? "success" : "text-muted", "status icon"));
        grow(add(c, await txt(saved ? "All changes saved" : "No changes yet", saved ? "body-sm-strong" : "body-sm", saved ? "success" : "text-muted", "status")));
        add(c, await txt("Esc close", "caption", "text-muted", "hint"));
      }
      comps.push(c);
    }
    const set = combine(host, comps, "Panel footer", 3, 'Save bar: clean ("No changes yet"), dirty (warning colours, Cancel + Save changes) and saved ("All changes saved").');
    linkText(set, "change count", "2", "change count");
    REG["Panel footer"] = set;
    return [set];
  }
  async function buildDetailsPanel(host) {
    const comps = [];
    for (const st of ["clean", "dirty", "saved"]) {
      const dirty = st === "dirty";
      const stage = st === "saved" ? "Qualified" : "Prospect";
      const c = box(`State=${st}`, { comp: true, dir: "VERTICAL", align: "MIN", fill: "surface-raised", stroke: "border", strokeSides: "l", w: 440, h: 900, clip: true });
      await effectStyle(c, "Shadow/elevation-4/Light");
      const top = add(c, box("Top bar", { gap: 4, pad: [8, 12], stroke: "border", strokeSides: "b" }));
      fillW(top);
      add(top, iconButton("chevron-up")).name = "Previous";
      add(top, iconButton("chevron-down")).name = "Next";
      const idx = add(top, box("Index", { pad: [0, 0, 0, 4] }));
      add(idx, await txt("5 of 10", "caption", "text-muted", "index"));
      grow(add(top, spacer()));
      add(top, iconButton("close")).name = "Close";
      const body = add(c, box("Body", { dir: "VERTICAL", gap: 24, pad: 24, align: "MIN", clip: true }));
      fillW(body);
      grow(body);
      const idr = add(body, box("Identity", { gap: 16 }));
      fillW(idr);
      add(idr, avatar("Daniel Okafor", 48)).name = "Avatar";
      const nb = add(idr, box("Name block", { dir: "VERTICAL", gap: 4, align: "MIN" }));
      grow(nb);
      wrapText(add(nb, await txt("Daniel Okafor", "title", "text", "name")));
      wrapText(add(nb, await txt("CTO \xB7 Northwind Labs", "body-sm", "text-muted", "position")));
      if (dirty) {
        const chip2 = add(idr, box("Unsaved", { gap: 6, pad: [0, 10, 0, 8], fill: "warning-bg", radius: "full", h: 24 }));
        add(chip2, ellipse("dot", 8, "warning"));
        add(chip2, await txt("Unsaved", "caption-strong", "warning", "unsaved text"));
      } else add(idr, mk("Stage pill", { Stage: stage })).name = "Stage pill";
      const sp = add(body, mk("Stage picker"));
      sp.name = "Stage picker";
      fillW(sp);
      if (dirty) setPicker(sp, "Qualified", "Prospect", "Saved as Prospect. Saving moves this contact to Qualified.");
      else setPicker(sp, stage, null, null);
      const nf = add(body, mk("Notes field", { State: "filled" }));
      nf.name = "Notes field";
      fillW(nf);
      add(body, rect("Divider", 100, 1, "border")).layoutSizingHorizontal = "FILL";
      const det = add(body, box("Details", { dir: "VERTICAL", gap: 12, align: "MIN" }));
      fillW(det);
      add(det, await txt("Details", "overline", "text-muted", "details heading"));
      const em = add(det, box("Email row", { gap: 16, align: "CENTER" }));
      fillW(em);
      await txt("Email", "body-sm", "text-muted", "label", { w: 96 }).then((t) => add(em, t));
      const ev = add(em, box("Email value", { gap: 4 }));
      grow(ev);
      add(ev, await txt("daniel.okafor@northwind.io", "body-sm", "text", "email"));
      add(ev, iconButton("copy-outline")).name = "Copy email";
      for (const [l, v] of [["Company", "Northwind Labs"], ["Role", "CTO"]]) {
        const r = add(det, mk("Detail row", { State: "filled" }));
        r.name = l + " row";
        fillW(r);
        setProps(r, { label: l, value: v });
      }
      const ow = add(det, box("Owner row", { gap: 16 }));
      fillW(ow);
      await txt("Owner", "body-sm", "text-muted", "label", { w: 96 }).then((t) => add(ow, t));
      const ov = add(ow, box("Owner value", { gap: 8 }));
      add(ov, avatar("Sara Kim", 24)).name = "Avatar";
      add(ov, await txt("Sara Kim", "body-sm", "text", "owner name"));
      const lb = add(det, box("Labels row", { gap: 16, align: "MIN" }));
      fillW(lb);
      await txt("Labels", "body-sm", "text-muted", "label", { w: 96 }).then((t) => add(lb, t));
      const lv = add(lb, box("Labels value", { gap: 4 }));
      for (const n of [1, 2, 3]) {
        const t = add(lv, mk("Label tag"));
        t.name = "Label " + n;
        if (n > 1) t.visible = false;
      }
      const nol = add(lv, await txt("No labels", "body-sm", "text-subtle", "no labels"));
      nol.visible = false;
      const f = add(c, mk("Panel footer", { State: st }));
      f.name = "Panel footer";
      fillW(f);
      comps.push(c);
    }
    const set = combine(host, comps, "Details panel", 3, "The shared side panel, opened from either view. Floats over the page at full height (440px). clean / dirty (Unsaved chip, stage hint, warning footer) / saved.");
    linkText(set, "name", "Daniel Okafor", "name");
    linkText(set, "position", "CTO \xB7 Northwind Labs", "position");
    REG["Details panel"] = set;
    return [set];
  }
  async function buildToast(host) {
    const comps = [];
    for (const type of ["saved-with-undo", "info"]) {
      const undo = type === "saved-with-undo";
      const c = box(`Type=${type}`, { comp: true, gap: 12, pad: 16, align: "MIN", fill: "surface-inverse", radius: "md", w: 420 });
      await effectStyle(c, "Shadow/elevation-3/Light");
      const ic = add(c, ico("checkmark-circle", 20, "green/300", "status icon"));
      const col2 = add(c, box("Text", { dir: "VERTICAL", align: "MIN" }));
      grow(col2);
      wrapText(add(col2, await txt(undo ? "Daniel Okafor moved to Qualified" : "Undone. Daniel Okafor is back in Prospect.", "body-sm-strong", "text-inverse", "message")));
      if (undo) wrapText(add(col2, await txt("Notes were updated too.", "body-sm", "text-inverse", "description", { opacity: 0.8 })));
      if (undo) {
        const u = add(c, box("Undo", { gap: 6, pad: [0, 8], radius: "sm", h: 32, justify: "CENTER" }));
        add(u, ico("arrow-undo", 16, "text-inverse", "icon"));
        add(u, await txt("Undo", "body-sm-strong", "text-inverse", "undo label"));
      }
      const x = add(c, box("Dismiss", { justify: "CENTER", radius: "sm", w: 32, h: 32 }));
      add(x, ico("close", 16, "text-inverse", "icon")).opacity = 0.8;
      comps.push(c);
    }
    const set = combine(host, comps, "Toast", 2, "One toast at a time, announced politely (focus never jumps to it). A toast with Undo stays until replaced or dismissed; a plain confirmation leaves after 4 seconds. Slide-in is 200ms (not drawn).");
    linkText(set, "message", "Daniel Okafor moved to Qualified", "message");
    const key = set.addComponentProperty("show undo", "BOOLEAN", true);
    for (const v of set.children) for (const n of v.findAll((x) => x.name === "Undo" && x.type === "FRAME")) n.componentPropertyReferences = { visible: key };
    REG["Toast"] = set;
    return [set];
  }
  async function buildDialog(host) {
    const comps = [];
    for (const type of ["discard", "shortcuts"]) {
      const d = type === "discard";
      const c = box(`Type=${type}`, { comp: true, dir: "VERTICAL", gap: 16, pad: 32, align: "MIN", fill: "surface-raised", radius: "md", w: 440 });
      await effectStyle(c, "Shadow/elevation-4/Light");
      const head2 = add(c, box("Header", { gap: 16, align: "MIN" }));
      fillW(head2);
      const ic = add(head2, box("Icon", { justify: "CENTER", radius: "full", w: 40, h: 40, fill: d ? "warning-bg" : "surface-sunken" }));
      add(ic, ico(d ? "warning-outline" : "keypad-outline", 20, d ? "warning" : "text-muted", "glyph"));
      const tb = add(head2, box("Text", { dir: "VERTICAL", gap: 8, align: "MIN" }));
      grow(tb);
      wrapText(add(tb, await txt(d ? "Discard your changes?" : "Keyboard shortcuts", "title", "text", "title")));
      if (d) wrapText(add(tb, await txt("Your changes to Daniel Okafor haven't been saved. If you discard them, the record stays as it was.", "body", "text-muted", "description")));
      if (!d) {
        const list = add(c, box("Shortcuts", { dir: "VERTICAL", gap: 8, align: "MIN" }));
        fillW(list);
        const rows = [["/", "Search"], ["[", "Open or close the sidebar"], ["\u2191 \u2193", "Move between rows or cards"], ["\u2190 \u2192", "Move between board columns"], ["Enter", "Open the focused contact"], ["Space", "Pick up a card to move it (board)"], ["J / K", "Next / previous contact in the panel"], ["\u2318 Enter", "Save changes"], ["Esc", "Cancel or close"]];
        for (const [k, w] of rows) {
          const r = add(list, box("Row", { gap: 24, align: "CENTER" }));
          const kc = add(r, box("Key", { w: 88, align: "CENTER" }));
          const kb = add(kc, mk("Kbd"));
          setProp(kb, "key", k);
          add(r, await txt(w, "body-sm", "text-muted", "what"));
        }
      }
      const foot = add(c, box("Actions", { gap: 8, justify: "MAX", pad: [8, 0, 0, 0] }));
      fillW(foot);
      if (d) {
        add(foot, button("Keep editing", "secondary", "md")).name = "Keep editing";
        add(foot, button("Discard changes", "danger", "md")).name = "Discard changes";
      } else add(foot, button("Close", "secondary", "md")).name = "Close";
      comps.push(c);
    }
    const set = combine(host, comps, "Dialog", 2, "Modal: focus moves in, Tab is trapped, Esc dismisses. The first button is the safe one. discard asks before throwing away a draft; shortcuts lists the keys.");
    linkText(set, "title", "Discard your changes?", "title");
    linkText(set, "description", "Your changes to Daniel Okafor haven't been saved. If you discard them, the record stays as it was.", "description");
    REG["Dialog"] = set;
    return [set];
  }
  async function buildSidebarItem(host) {
    const comps = [];
    for (const mode of ["expanded", "rail"]) for (const st of ["default", "hover", "current"]) {
      const ex = mode === "expanded";
      const cur = st === "current";
      const c = box(`State=${st}, Mode=${mode}`, { comp: true, gap: 8, pad: [0, 8], justify: ex ? "MIN" : "CENTER", fill: cur ? "surface-pressed" : st === "hover" ? "surface-hover" : null, radius: "sm", w: ex ? 208 : 64, h: ex ? 32 : 44 });
      add(c, ico(cur ? "people" : "home-outline", 16, "text", "icon"));
      const l = add(c, await txt("Contacts", cur ? "body-sm-strong" : "body-sm", "text", "label"));
      l.visible = ex;
      if (ex) grow(l);
      const n = add(c, await txt("10", "body-sm", "text-muted", "count"));
      n.visible = ex;
      const b = add(c, mk("Badge", { Type: "danger" }));
      b.name = "Badge";
      b.visible = false;
      if (!ex) {
        const dot = add(c, ellipse("Badge dot", 8, "danger-solid"));
        dot.layoutPositioning = "ABSOLUTE";
        dot.x = 46;
        dot.y = 8;
        dot.visible = false;
      }
      comps.push(c);
    }
    const set = combine(host, comps, "Sidebar item", 3, "A nav link. expanded shows label, count and badge; rail shows just the icon (44px target) with a red dot for new items. current = pressed background, semibold label, filled icon.");
    linkText(set, "label", "Contacts", "label");
    linkText(set, "count", "10", "count");
    linkSwap(set, "icon", "home-outline", "icon");
    const key = set.addComponentProperty("show badge", "BOOLEAN", false);
    for (const v of set.children) for (const n of v.findAll((x) => x.name === "Badge" && x.type === "INSTANCE" || x.name === "Badge dot")) n.componentPropertyReferences = { visible: key };
    REG["Sidebar item"] = set;
    return [set];
  }
  var NAV = [
    { items: [{ label: "Home", icon: "home" }, { label: "Conversations", icon: "chatbubbles", badge: ["danger", "3"] }] },
    { title: "Intelligence", items: [{ label: "Contacts", icon: "people", count: "10", current: true }, { label: "Accounts", icon: "business", count: "24" }, { label: "Signals", icon: "pulse", badge: ["info", "5 new"] }] },
    { title: "Outreach", items: [{ label: "Campaigns", icon: "megaphone", count: "4" }, { label: "Assets", icon: "images" }, { label: "Knowledge", icon: "library" }] }
  ];
  var VIEWS = [["My leads", "blue"], ["Ready to qualify", "amber"], ["Enterprise customers", "green"]];
  async function buildSidebar(host) {
    const comps = [];
    for (const mode of ["expanded", "rail"]) {
      const ex = mode === "expanded";
      const c = box(`Mode=${mode}`, { comp: true, dir: "VERTICAL", gap: 16, pad: ex ? [16, 12] : [16, 0], align: ex ? "MIN" : "CENTER", fill: "bg-subtle", stroke: "border", strokeSides: "r", w: ex ? 232 : 64, h: 900, clip: true });
      const head2 = add(c, box("Header", { dir: ex ? "HORIZONTAL" : "VERTICAL", gap: ex ? 8 : 16, pad: ex ? [0, 8] : 0, h: ex ? 40 : void 0 }));
      if (ex) fillW(head2);
      const logo = add(head2, box("Logo", { justify: "CENTER", fill: "action", radius: "sm", w: 28, h: 28 }));
      add(logo, await txt("S", "caption-strong", "on-action", "logo letter"));
      if (ex) grow(add(head2, await txt("Sundial Studio", "body-sm-strong", "text", "workspace")));
      const tg = add(head2, box("Toggle", { justify: "CENTER", radius: "sm", w: 32, h: 32 }));
      add(tg, ico("sidebar", 16, "text-muted", "glyph"));
      if (ex) {
        const s = add(c, box("Search", { gap: 8, pad: [0, 8], fill: "surface", stroke: "border", radius: "sm", h: 32 }));
        fillW(s);
        add(s, ico("search-outline", 16, "text-muted", "icon"));
        grow(add(s, await txt("Search", "body-sm", "text-muted", "label")));
        add(s, await txt("/", "caption", "text-subtle", "hint"));
      }
      const nav = add(c, box("Pages", { dir: "VERTICAL", gap: 16, align: ex ? "MIN" : "CENTER" }));
      if (ex) fillW(nav);
      for (const sec of NAV) {
        const g = add(nav, box(sec.title || "Main", { dir: "VERTICAL", gap: 2, align: ex ? "MIN" : "CENTER" }));
        if (ex) fillW(g);
        if (sec.title && ex) add(g, box("Title", { pad: [0, 8, 4, 8] })).appendChild(await txt(sec.title, "overline", "text-muted", "section title"));
        for (const it of sec.items) {
          const i = add(g, mk("Sidebar item", { State: it.current ? "current" : "default", Mode: mode }));
          i.name = it.label;
          if (ex) fillW(i);
          setProps(i, { label: it.label, count: it.count || "" });
          swap(i, "icon", it.icon);
          if (it.badge) {
            setProp(i, "show badge", true);
            const b = findInst(i, "Badge");
            if (b) {
              setProp(b, "Type", it.badge[0]);
              setProp(b, "value", it.badge[1]);
            }
            const n = find(i, "count");
            if (n) n.visible = false;
          } else if (!it.count) {
            const n = find(i, "count");
            if (n) n.visible = false;
          }
        }
      }
      if (ex) {
        const sv = add(nav, box("Saved views", { dir: "VERTICAL", gap: 2, align: "MIN" }));
        fillW(sv);
        add(add(sv, box("Title", { pad: [0, 8, 4, 8] })), await txt("Saved views", "overline", "text-muted", "section title"));
        for (const [l, h] of VIEWS) {
          const r = add(sv, box(l, { gap: 8, pad: [0, 8], h: 32 }));
          fillW(r);
          const dotBox = add(r, box("Dot", { justify: "CENTER", w: 16, h: 16 }));
          add(dotBox, rect("dot", 8, 8, `${h}/600`)).cornerRadius = 2;
          add(r, await txt(l, "body-sm", "text", "label"));
        }
      }
      grow(add(c, spacer()));
      const foot = add(c, box("Footer", { dir: "VERTICAL", gap: 4, pad: [12, 0, 0, 0], align: ex ? "MIN" : "CENTER", stroke: "border", strokeSides: "t" }));
      if (ex) fillW(foot);
      const th = add(foot, box("Theme toggle", { gap: 8, pad: [0, 8], justify: ex ? "MIN" : "CENTER", radius: "sm", h: ex ? 32 : 44, w: ex ? void 0 : 64 }));
      if (ex) fillW(th);
      add(th, ico("moon-outline", 16, "text", "icon"));
      if (ex) add(th, await txt("Dark theme", "body-sm", "text", "label"));
      const u = add(foot, box("User", { gap: 8, pad: ex ? [4, 8] : [4, 4] }));
      add(u, avatar(DATA_ME, 32)).name = "Avatar";
      if (ex) {
        const t = add(u, box("Name", { dir: "VERTICAL", align: "MIN" }));
        add(t, await txt(DATA_ME, "body-sm-strong", "text", "user name"));
        add(t, await txt("Sales lead", "caption", "text-muted", "user role"));
      }
      comps.push(c);
    }
    const set = combine(host, comps, "Sidebar", 2, "Workspace sidebar. expanded = 232px with labels (pinned from 1280px); rail = 64px icon rail below that. Built from Sidebar item.");
    REG["Sidebar"] = set;
    return [set];
  }
  var DATA_ME = DATA.me.name;

  // src/screens.ts
  var CONTACTS = DATA.contacts;
  var cid = (id) => CONTACTS.find((c) => c.id === id);
  function populateCard(card2, c) {
    const sub = [c.role, c.company].filter(Boolean).join(" \xB7 ");
    setProp(card2, "name", c.name);
    if (sub) setProp(card2, "subtitle", sub);
    else {
      setProp(card2, "missing subtitle", true);
      const s = find(card2, "subtitle");
      if (s) s.visible = false;
    }
    setProp(card2, "show labels", c.labels.length > 0);
    if (c.labels.length) {
      const l1 = findInst(card2, "Label 1"), l2 = findInst(card2, "Label 2"), more = find(card2, "more");
      if (l1) setProp(l1, "label", c.labels[0]);
      if (l2) {
        if (c.labels[1]) setProp(l2, "label", c.labels[1]);
        else l2.visible = false;
      }
      if (more) {
        if (c.labels.length > 2) more.characters = "+" + (c.labels.length - 2);
        else more.visible = false;
      }
    }
    const av = findInst(card2, "Avatar"), on = find(card2, "owner name");
    if (c.owner) {
      if (av) {
        setProp(av, "Hue", hueFor(c.owner));
        setProp(av, "initials", initials(c.owner));
      }
      if (on) on.characters = c.owner.split(" ")[0];
    } else {
      if (av) setProp(av, "Hue", "empty");
      if (on) {
        on.characters = "No owner";
        on.fills = [paint(tok("text-subtle"))];
      }
    }
    setProp(card2, "show notes icon", !!c.notes);
  }
  function populateRow(row, c) {
    const cell = (n) => findInst(row, n);
    const name = cell("Name");
    setProp(name, "value", c.name);
    const av = findInst(name, "Avatar");
    if (av) {
      setProp(av, "Hue", hueFor(c.name));
      setProp(av, "initials", initials(c.name));
    }
    const st = findInst(cell("Stage"), "Stage pill");
    if (st) setProp(st, "Stage", c.stage);
    for (const [col2, v] of [["Company", c.company], ["Role", c.role]]) {
      const x = cell(col2);
      if (v) setProp(x, "value", v);
      else setProp(x, "Content", "missing");
    }
    const ow = cell("Owner");
    if (c.owner) {
      setProp(ow, "value", c.owner.split(" ")[0]);
      const a = findInst(ow, "Avatar");
      if (a) {
        setProp(a, "Hue", hueFor(c.owner));
        setProp(a, "initials", initials(c.owner));
      }
    } else setProp(ow, "Content", "no-owner");
    const lb = cell("Labels");
    if (!c.labels.length) setProp(lb, "Content", "missing");
    else {
      const l1 = findInst(lb, "Label 1"), l2 = findInst(lb, "Label 2"), more = find(lb, "more");
      if (l1) setProp(l1, "label", c.labels[0]);
      if (l2) {
        if (c.labels[1]) setProp(l2, "label", c.labels[1]);
        else l2.visible = false;
      }
      if (more) {
        if (c.labels.length > 2) more.characters = "+" + (c.labels.length - 2);
        else more.visible = false;
      }
    }
    for (const [col2, v] of [["Email", c.email], ["Notes", c.notes]]) {
      const x = cell(col2);
      if (v) setProp(x, "value", v);
      else setProp(x, "Content", "missing");
    }
  }
  function populatePanel(p, o) {
    var _a, _b, _c;
    const c = o.contact;
    const sub = [c.role, c.company].filter(Boolean).join(" \xB7 ") || "No role or company yet";
    setProps(p, { name: c.name, position: sub });
    const avs = findAll(p, "Avatar");
    if (avs[0]) {
      setProp(avs[0], "Hue", hueFor(c.name));
      setProp(avs[0], "initials", initials(c.name));
    }
    const pill = findInst(p, "Stage pill");
    if (pill) setProp(pill, "Stage", c.stage);
    const picker = findInst(p, "Stage picker");
    if (o.state === "dirty") setPicker(picker, o.draftStage, c.stage, `Saved as ${c.stage}. Saving moves this contact to ${o.draftStage}.`);
    else setPicker(picker, c.stage, null, null);
    const notes = (_a = o.notes) != null ? _a : c.notes;
    const nf = findInst(p, "Notes field");
    if (notes) {
      setProp(nf, "State", o.state === "dirty" ? "focus" : "filled");
      setProps(nf, { value: notes, counter: `${notes.length} / 1000` });
    } else {
      setProp(nf, "State", "empty");
      setProp(nf, "counter", "0 / 1000");
    }
    const email = find(p, "email");
    if (email) {
      if (c.email) email.characters = c.email;
      else {
        email.characters = "No email yet";
        email.fills = [paint(tok("text-subtle"))];
        const cp = find(p, "Copy email");
        if (cp) cp.visible = false;
      }
    }
    for (const [n, v, none] of [["Company row", c.company, "No company yet"], ["Role row", c.role, "No role yet"]]) {
      const r = findInst(p, n);
      if (!r) continue;
      if (v) setProp(r, "value", v);
      else {
        setProp(r, "State", "missing");
        setProp(r, "value", none);
        swap(r, "icon", "information-circle");
      }
    }
    const oav = avs[1], on = find(p, "owner name");
    if (c.owner) {
      if (oav) {
        setProp(oav, "Hue", hueFor(c.owner));
        setProp(oav, "initials", initials(c.owner));
      }
      if (on) on.characters = c.owner;
    } else {
      if (oav) setProp(oav, "Hue", "empty");
      if (on) {
        on.characters = "No owner yet";
        on.fills = [paint(tok("text-subtle"))];
      }
    }
    const tags = ["Label 1", "Label 2", "Label 3"].map((n) => findInst(p, n));
    tags.forEach((t, i) => {
      if (!t) return;
      if (c.labels[i]) {
        setProp(t, "label", c.labels[i]);
        t.visible = true;
      } else t.visible = false;
    });
    const nol = find(p, "no labels");
    if (nol) nol.visible = c.labels.length === 0;
    const idx = find(p, "index");
    if (idx) idx.characters = `${((_b = o.index) != null ? _b : 0) + 1} of ${CONTACTS.length}`;
    const f = findInst(p, "Panel footer");
    if (f && o.state === "dirty") setProp(f, "change count", String((_c = o.changes) != null ? _c : 2));
  }
  async function buildScreen(spec) {
    const W = spec.w || 1440, H = spec.h || 900, sb = spec.rail ? 64 : 232, colW = W - sb;
    const moved = spec.moved || {};
    const all = CONTACTS.map((c) => moved[c.id] ? Object.assign({}, c, { stage: moved[c.id] }) : c);
    const q = (spec.search || "").trim().toLowerCase();
    const visible = all.filter((c) => (spec.owner && spec.owner !== "all" ? spec.owner === "none" ? !c.owner : c.owner === spec.owner : true) && (!q || [c.name, c.company, c.role, c.email].join(" ").toLowerCase().includes(q)));
    const filtered = !!q || !!spec.owner && spec.owner !== "all";
    const f = box(spec.name, { dir: "NONE", fill: "bg", clip: true });
    f.resize(W, H);
    tag(f);
    const side = add(f, mk("Sidebar", { Mode: spec.rail ? "rail" : "expanded" }));
    side.name = "Sidebar";
    side.resize(sb, H);
    side.x = 0;
    side.y = 0;
    const main2 = add(f, box("Main", { dir: "VERTICAL", align: "MIN", fill: "bg", clip: true, w: colW, h: H }));
    main2.x = sb;
    main2.y = 0;
    const head2 = add(main2, box("Header", { dir: "VERTICAL", gap: 16, pad: [24, 32, 16, 32], align: "MIN", stroke: "border", strokeSides: "b" }));
    fillW(head2);
    const tr = add(head2, box("Title row", { gap: 12 }));
    add(tr, await txt("Contacts", "display", "text", "title"));
    const cnt = add(tr, box("Count", { pad: [0, 8], justify: "CENTER", fill: "surface-sunken", radius: "sm", h: 24 }));
    add(cnt, await txt(filtered ? `${visible.length} of ${CONTACTS.length} people` : `${CONTACTS.length} people`, "caption-strong", "text-muted", "count"));
    const tb = add(head2, box("Toolbar", { gap: 12 }));
    fillW(tb);
    add(tb, mk("View switch", { Value: spec.view === "table" ? "Table" : "Board" })).name = "View switch";
    grow(add(tb, spacer()));
    const si = add(tb, mk("Search input", { State: q ? "filled" : "empty" }));
    si.name = "Search input";
    if (q) setProp(si, "value", spec.search);
    const sel = add(tb, mk("Select", { State: "default" }));
    sel.name = "Owner filter";
    if (spec.owner && spec.owner !== "all") setProp(sel, "value", spec.owner === "none" ? "No owner" : spec.owner);
    if (filtered) {
      const fr = add(head2, box("Active filters", { gap: 8 }));
      add(fr, await txt(`Showing ${visible.length} of ${CONTACTS.length} contacts`, "body-sm", "text-muted", "status"));
      if (q) {
        const ch = add(fr, mk("Filter chip"));
        setProp(ch, "label", `Search: \u201C${spec.search.trim()}\u201D`);
      }
      if (spec.owner && spec.owner !== "all") {
        const ch = add(fr, mk("Filter chip"));
        setProp(ch, "label", `Owner is ${spec.owner === "none" ? "No owner" : spec.owner}`);
      }
      add(fr, button("Clear filters", "ghost", "sm"));
    }
    const body = add(main2, box("Body", { dir: "VERTICAL", align: "MIN", clip: true }));
    fillW(body);
    grow(body);
    if (spec.view === "table") {
      const tbl = add(body, box("Table", { dir: "VERTICAL", pad: [0, 0, 0, 32], align: "MIN" }));
      const hr = add(tbl, box("Header row", { align: "MIN" }));
      COLS.forEach((c, i) => {
        const h = add(hr, mk("Table header cell", { Type: i === 0 ? "sticky" : "regular" }));
        h.name = c.label;
        setProp(h, "label", c.label);
        swap(h, "icon", c.icon);
        h.resize(c.w, 41);
      });
      for (const c of visible) {
        const st = c.id === spec.flashId ? "flash" : c.id === spec.selectedId ? "selected" : "default";
        const r = add(tbl, mk("Table row", { State: st }));
        r.name = c.name;
        populateRow(r, c);
      }
      if (!visible.length) {
        const e = add(body, box("Empty state", { dir: "VERTICAL", gap: 12, pad: [96, 24], align: "CENTER", justify: "MIN" }));
        fillW(e);
        const ic = add(e, box("Icon", { justify: "CENTER", radius: "full", fill: "surface-sunken", w: 56, h: 56 }));
        add(ic, ico("search-outline", 24, "text-muted", "glyph"));
        add(e, await txt(`No contacts match \u201C${spec.search}\u201D`, "heading", "text", "title"));
        const p = add(e, await txt("Search looks at names, companies, roles and emails. Check the spelling, or clear the filters to see everyone.", "body", "text-muted", "description", { w: 420 }));
        p.textAlignHorizontal = "CENTER";
        add(e, button("Clear filters", "primary", "md", "close"));
      }
    } else {
      const board2 = add(body, box("Board", { gap: 16, pad: [24, 32], align: "MIN" }));
      for (const stg of STAGES) {
        const h = HUE[stg];
        const col2 = add(board2, box(`${stg} column`, { dir: "VERTICAL", gap: 12, pad: 12, align: "MIN", fill: `${h}/50`, radius: "md", w: 280, h: 560 }));
        const ch = add(col2, mk("Column header", { Stage: stg }));
        fillW(ch);
        setProp(ch, "count", String(visible.filter((c) => c.stage === stg).length));
        const cards = visible.filter((c) => c.stage === stg);
        const dragging = spec.drag && spec.drag.over === stg;
        for (const c of cards) {
          if (spec.drag && spec.drag.id === c.id) {
            const gap = add(col2, box("Drag origin", { dir: "VERTICAL", radius: "md", stroke: `${h}/300`, dash: [6, 4], w: 256, h: 112 }));
            gap.opacity = 0.6;
            fillW(gap);
            continue;
          }
          const st = c.id === spec.flashId ? "flash" : c.id === spec.selectedId ? "selected" : "default";
          const card2 = add(col2, mk("Contact card", { State: st }));
          card2.name = c.name;
          fillW(card2);
          populateCard(card2, c);
          if (c.id === spec.focusId) focusRing(card2);
        }
        if (dragging) {
          const e = add(col2, mk("Empty column", { Type: "drop-target", Stage: stg }));
          fillW(e);
          const m = find(e, "message");
          if (m) m.characters = `${cid(spec.drag.id).name} will leave their current stage. You can undo right after.`;
        } else if (!cards.length) {
          const e = add(col2, mk("Empty column", { Type: filtered ? "filtered" : "empty", Stage: stg }));
          fillW(e);
          if (filtered) {
            const hidden = CONTACTS.filter((c) => (moved[c.id] || c.stage) === stg).length;
            const m = find(e, "message"), b = find(e, "Clear filters");
            if (hidden > 0) {
              if (m) m.characters = `${hidden} ${stg} ${hidden === 1 ? "contact is" : "contacts are"} hidden by your filters.`;
            } else {
              if (m) m.characters = `No ${stg} contacts yet, for anyone.`;
              if (b) b.visible = false;
            }
          }
        }
      }
    }
    const foot = add(main2, box("Footer", { gap: 16, pad: [12, 32], stroke: "border", strokeSides: "t" }));
    fillW(foot);
    add(foot, await txt(spec.view === "table" ? `${visible.length} ${visible.length === 1 ? "contact" : "contacts"}` : "Drag a card to change its stage", "caption", "text-muted", "summary"));
    grow(add(foot, spacer()));
    if (W >= 1100) add(foot, await txt(spec.view === "table" ? "Select a name or press Enter to open \xB7 \u2191 \u2193 move between rows \xB7 ? shortcuts" : "\u2190 \u2192 columns \xB7 \u2191 \u2193 cards \xB7 Enter open \xB7 Space move \xB7 ? shortcuts", "caption", "text-muted", "keys"));
    if (spec.drag) {
      const dc = cid(spec.drag.id);
      const card2 = add(f, mk("Contact card", { State: "dragging" }));
      card2.name = "Dragged card";
      populateCard(card2, dc);
      card2.rotation = 2;
      const stageIdx = STAGES.indexOf(spec.drag.over);
      card2.x = sb + 32 + stageIdx * 296 + 12 + 40;
      card2.y = 190;
    }
    if (spec.panel) {
      const o = spec.panel;
      const p = add(f, mk("Details panel", { State: o.state }));
      p.name = "Details panel";
      p.resize(440, H);
      p.x = W - 440;
      p.y = 0;
      populatePanel(p, Object.assign({}, o, { contact: all.find((c) => c.id === o.contactId), index: CONTACTS.findIndex((c) => c.id === o.contactId) }));
    }
    if (spec.toast) {
      const t = add(f, mk("Toast", { Type: spec.toast.type }));
      t.name = "Toast";
      setProp(t, "message", spec.toast.message);
      const d = find(t, "description");
      if (d) {
        if (spec.toast.description) d.characters = spec.toast.description;
        else d.visible = false;
      }
      t.x = sb + 32;
      t.y = H - 64 - t.height;
    }
    if (spec.dialog) {
      const scrim = add(f, rect("Scrim", W, H, "overlay"));
      scrim.x = 0;
      scrim.y = 0;
      const d = add(f, mk("Dialog", { Type: "discard" }));
      d.name = "Dialog";
      setProp(d, "description", `Your changes to ${cid(spec.panel.contactId).name} haven't been saved. If you discard them, the record stays as it was.`);
      d.x = Math.round((W - d.width) / 2);
      d.y = Math.round((H - d.height) / 2);
    }
    C.stats.screens++;
    return f;
  }
  var DRAFT_NOTES = "Needs a security review before the pilot. Security questionnaire sent; follow up Friday.";
  var SCREENS = [
    { key: "A", x: 0, y: 0, spec: { name: "A \xB7 Table view", view: "table" } },
    { key: "B", x: 1520, y: 0, spec: { name: "B \xB7 Board view (Qualified empty)", view: "board" } },
    { key: "C", x: 3040, y: 0, spec: { name: "C \xB7 Editing a draft from the board", view: "board", selectedId: "c5", panel: { contactId: "c5", state: "dirty", contact: cid("c5"), draftStage: "Qualified", notes: DRAFT_NOTES, changes: 2 } } },
    { key: "C2", x: 4560, y: 0, spec: { name: "C2 \xB7 Editing the same draft from the table", view: "table", selectedId: "c5", panel: { contactId: "c5", state: "dirty", contact: cid("c5"), draftStage: "Qualified", notes: DRAFT_NOTES, changes: 2 } } },
    { key: "D", x: 0, y: 1020, spec: { name: "D \xB7 Saved: card moved, Undo toast", view: "board", moved: { c5: "Qualified" }, flashId: "c5", panel: { contactId: "c5", state: "saved", contact: cid("c5"), notes: DRAFT_NOTES }, toast: { type: "saved-with-undo", message: "Daniel Okafor moved to Qualified", description: "Notes were updated too." } } },
    { key: "E", x: 1520, y: 1020, spec: { name: "E \xB7 From the table: missing data + discard guard", view: "table", selectedId: "c2", panel: { contactId: "c2", state: "dirty", contact: cid("c2"), draftStage: "Prospect", changes: 1 }, dialog: "discard" } },
    { key: "F", x: 3040, y: 1020, spec: { name: "F \xB7 Narrow desktop, 1024px", w: 1024, h: 768, rail: true, view: "board", selectedId: "c5", panel: { contactId: "c5", state: "dirty", contact: cid("c5"), draftStage: "Qualified", notes: DRAFT_NOTES, changes: 2 } } },
    { key: "G", x: 0, y: 2040, spec: { name: "G \xB7 Same save, seen in the table (views in sync)", view: "table", moved: { c5: "Qualified" }, flashId: "c5", panel: { contactId: "c5", state: "saved", contact: cid("c5"), notes: DRAFT_NOTES }, toast: { type: "saved-with-undo", message: "Daniel Okafor moved to Qualified", description: "Notes were updated too." } } },
    { key: "H", x: 1520, y: 2040, spec: { name: "H \xB7 Keyboard focus returns to the moved card", view: "board", moved: { c5: "Qualified" }, focusId: "c5", toast: { type: "saved-with-undo", message: "Daniel Okafor moved to Qualified", description: "Notes were updated too." } } },
    { key: "I", x: 3040, y: 2040, spec: { name: "I \xB7 Drag a card to an empty column", view: "board", drag: { id: "c5", over: "Qualified" } } },
    { key: "J", x: 4560, y: 2040, spec: { name: "J \xB7 Owner filter: empty because filtered vs truly empty", view: "board", owner: "Sara Kim" } },
    { key: "K", x: 6080, y: 2040, spec: { name: "K \xB7 Search with no results", view: "table", search: "zzz" } }
  ];

  // src/boards.ts
  var BW = 1440;
  async function board(name, w = BW) {
    const f = box(name, { dir: "VERTICAL", gap: 32, pad: 64, align: "MIN", fill: "bg", w });
    tag(f);
    return f;
  }
  async function head(f, eyebrow, title, lede) {
    const h = add(f, box("Header", { dir: "VERTICAL", gap: 8, align: "MIN" }));
    add(h, await txt(eyebrow, "overline", "text-muted", "eyebrow"));
    add(h, await txt(title, "display", "text", "title"));
    add(h, await txt(lede, "body", "text-muted", "lede", { w: 880 }));
    return h;
  }
  async function card(name, w, heading, lines, opts = {}) {
    var _a;
    const c = box(name, { dir: "VERTICAL", gap: 12, pad: 24, align: "MIN", fill: (_a = opts.fill) != null ? _a : "surface", stroke: "border", radius: "md", w });
    if (opts.badge) {
      const r = add(c, box("Title row", { gap: 12 }));
      const b = add(r, box("Badge", { justify: "CENTER", radius: "full", fill: "action", w: 28, h: 28 }));
      add(b, await txt(opts.badge, "caption-strong", "on-action", "letter"));
      add(r, await txt(heading, "heading", "text", "heading"));
    } else add(c, await txt(heading, "heading", "text", "heading"));
    if (opts.sub) add(c, await txt(opts.sub, "caption", "text-muted", "subtitle"));
    for (const l of lines) {
      const m = l.match(/^\*\*(.+?)\*\* ?(.*)$/);
      if (m) {
        const r = add(c, box("Line", { gap: 6, align: "MIN" }));
        fillW(r);
        add(r, await txt(m[1], "body-sm-strong", "text", "lead"));
        wrapText(add(r, await txt(m[2], "body-sm", "text-muted", "text")));
      } else wrapText(add(c, await txt(l, "body-sm", "text-muted", "text"))).layoutSizingHorizontal = "FILL";
    }
    return c;
  }
  async function chip(label, fill = "surface-sunken", fg = "text") {
    const c = box(label, { gap: 6, pad: [0, 12], justify: "CENTER", fill, radius: "full", h: 28 });
    c.appendChild(await txt(label, "body-sm-strong", fg, "label"));
    return c;
  }
  async function buildMain() {
    const f = await board("01 \xB7 The problem");
    await head(
      f,
      "STEP 1 OF 4 \xB7 UNDERSTAND",
      "Contacts: one dataset, two ways to look at it",
      "A small team keeps business contacts in a Notion-style database. They need a table to scan fields and a board to see the pipeline \u2014 and they need to fix a contact's stage or notes from either view without losing their place."
    );
    const pills = add(f, box("Stages", { gap: 8 }));
    for (const s of STAGES) add(pills, mk("Stage pill", { Stage: s }));
    const cols = add(f, box("Columns", { gap: 24, align: "MIN" }));
    add(cols, await card("The job to be done", 432, "The job to be done", [
      "Three teammates (Arjun, Priya, Sara) own about ten contacts. Three moments matter:",
      "**Scan.** \u201CWhen I review my list, I want to see every field at a glance so I can spot gaps \u2014 missing emails, no owner.\u201D",
      "**Move.** \u201CWhen a deal moves forward, I want to change its stage from wherever I am so the pipeline stays true.\u201D",
      "**Return.** \u201CWhen I'm done editing, I want to land exactly where I was \u2014 same view, same scroll, same row.\u201D"
    ], { badge: "A" }));
    add(cols, await card("What must work", 432, "What must work", [
      "\u2713 One shared dataset of 8\u201312 fictional contacts",
      "\u2713 A Table / Board switch over that same data",
      "\u2713 Board groups: Lead, Prospect, Qualified, Customer",
      "\u2713 Edit Stage and Notes from either view, with a clear Save and Cancel",
      "\u2713 A saved stage moves the card and updates the table row",
      "\u2713 No duplicate or stale records after any number of switches",
      "\u2713 An empty board group and missing optional fields",
      "\u2713 Closing the panel keeps your view; keyboard focus makes sense; works on a narrow desktop"
    ], { badge: "B" }));
    add(cols, await card("Where it can break", 432, "Where it can break", [
      "**Draft leaks.** Typing in Notes must not change the table or board until you press Save.",
      "**Cancel lies.** Cancel must restore the saved values exactly \u2014 even after five edits in a row.",
      "**Focus gets lost.** After a stage save, the card has moved to another column. Focus has to follow it, not vanish.",
      "**The empty column.** Qualified starts empty. It still needs a header, a count of 0 and a reason to exist.",
      "**Narrow screens.** At 1024px, eight columns plus a side panel don't fit side by side."
    ], { badge: "!" }));
    const row = add(f, box("Rules", { gap: 24, align: "MIN" }));
    add(row, await card("Assumptions", 432, "Assumptions", ["Name and Stage are required; every other field can be empty. Stage is one choice of four. Only Stage and Notes are editable in this exercise."]));
    add(row, await card("Out of scope, on purpose", 432, "Out of scope, on purpose", ["Backend, login, adding or deleting contacts, editing other fields. Search, filters and drag-and-drop are stretch goals, after the core flow is solid."]));
    const j = add(row, await card("How it will be judged", 432, "How it will be judged", []));
    const chips = add(j, box("Criteria", { gap: 8, wrap: true }));
    fillW(chips);
    for (const c of ["Visual design", "Interaction", "Implementation", "Robustness", "Reasoning"]) add(chips, await chip(c));
    return f;
  }
  async function buildReferences() {
    const f = await board("02 \xB7 Learn from real products");
    await head(f, "STEP 1 \xB7 REAL-WORLD PATTERNS", "Borrow what people already know", "Familiar patterns cost users nothing to learn. For each product: the pattern, what we take, and where we deliberately differ.");
    const refs = [
      ["Notion databases", "View tabs over one data source \xB7 side peek", "Table and Board as tabs on the same data. Opening a record in a side peek, so the list stays visible behind it.", "Notion autosaves. The brief asks for a clear Save and Cancel, so edits are a draft until you commit."],
      ["Linear", "Keyboard-first \xB7 calm density", "Every action has a key. J and K walk records with the panel open; \u2318\u21B5 saves; Esc backs out one level at a time.", "We show shortcuts in tooltips and button labels, so nobody has to memorise them first."],
      ["Attio", "Modern CRM \xB7 monochrome chrome", "Owners as avatar plus name, quiet black-and-white chrome, and colour only where it means something. That is Aa NAD's rule too.", "Missing data is drawn on purpose \u2014 a dashed \u201CNo owner\u201D \u2014 not left as a blank cell."],
      ["Pipedrive and HubSpot deal boards", "Stages left to right \xB7 counts per column", "Stages read left to right in the order a deal moves. Each column header shows a live count.", "An empty column keeps its full height with a hint, so it is still a visible target."],
      ["Airtable", "Frozen primary column \xB7 expanded record", "The Name column stays frozen while the rest scrolls sideways. That is our answer to the narrow desktop.", "Fewer columns by default. Notes collapse into a one-line preview."],
      ["Gmail", "\u201CArchived \xB7 Undo\u201D toast", "After a save, a toast says what changed in plain words, with Undo. Saving feels safe because it is reversible.", "Focus never jumps to the toast. It is announced politely to screen readers."]
    ];
    const grid = add(f, box("Products", { gap: 24, wrap: true, align: "MIN" }));
    size(grid, BW - 128);
    grid.counterAxisSpacing = 24;
    for (let i = 0; i < refs.length; i++) {
      const [t, sub, take, differ] = refs[i];
      const c = await card(t, 420, t, [`**Take:** ${take}`, `**Differ:** ${differ}`], { sub });
      const spec = add(c, box("Specimen", { gap: 8 }));
      if (i === 0) add(spec, mk("View switch", { Value: "Table" }));
      if (i === 1) for (const k of ["J", "K", "\u2318 \u21B5", "Esc"]) {
        const x = add(spec, mk("Kbd"));
        setProp(x, "key", k);
      }
      if (i === 2) {
        add(spec, avatar("Arjun Rao", 24));
        add(spec, avatar("Priya Shah", 24));
        add(spec, mk("Avatar", { Size: "24", Hue: "empty" }));
      }
      if (i === 3) for (const s of STAGES) {
        const h = add(spec, mk("Column header", { Stage: s }));
        h.resize(150, h.height);
      }
      if (i === 5) {
        const t2 = add(spec, mk("Toast", { Type: "saved-with-undo" }));
        t2.resize(380, t2.height);
      }
      if (i === 4) spec.remove();
      add(grid, c);
    }
    return f;
  }
  var FIELDS = [
    ["Name", true, "Text", ["Frozen first column, with avatar", "S"], ["Card title", "S"], ["Panel heading", "S"], "The anchor you look for in every view."],
    ["Stage", true, "Select, 1 of 4", ["Coloured pill; click opens the panel at Stage", "S"], ["The column is the stage", "C"], ["Editable select", "E"], "Repeating the stage on a card inside its own column is noise."],
    ["Company", false, "Text", ["Column", "S"], ["Subtitle: Role \xB7 Company", "C"], ["Read-only field", "S"], "The second thing you look for after the name."],
    ["Role", false, "Text", ["Column", "S"], ["Merged into the subtitle", "C"], ["Read-only field", "S"], "One line on the card instead of two; if either is missing, the other stands alone."],
    ["Owner", false, "Person", ["Avatar and first name", "S"], ["Avatar only, with tooltip", "C"], ["Read-only field", "S"], "Who to ask. On a small card a face is enough."],
    ["Labels", false, "Multi-select", ["First 2 tags, then \u201C+1\u201D", "C"], ["First 2 tags", "C"], ["All tags", "S"], "Context at a glance without wrapping rows or growing cards."],
    ["Email", false, "Email", ["Column, truncated", "S"], ["Hidden", "H"], ["Field with copy button", "S"], "Long and rarely scanned on a board. You need it when you act, so it lives in the panel."],
    ["Notes", false, "Long text", ["One-line preview; hidden under 1100px", "C"], ["Note icon when present", "C"], ["Editable text area", "E"], "A hint that something is written, without turning cards into paragraphs."]
  ];
  var CODE = { S: ["surface", void 0], C: ["amber/50", void 0], H: [null, "border-strong"], E: ["blue/50", void 0] };
  async function buildFieldMap() {
    const f = await board("03 \xB7 Fields & data");
    await head(f, "STEP 1 \xB7 INFORMATION ARCHITECTURE", "Which field lives where", "The table is for comparing, so it shows almost everything. Cards are for recognising a person in a column, so they show only what identifies them. The panel shows everything and is the only place you edit.");
    const lg = add(f, box("Legend", { gap: 12 }));
    for (const [l, k] of [["Shown", "S"], ["Condensed", "C"], ["Hidden", "H"], ["Editable", "E"]]) {
      const c = add(lg, box(l, { gap: 8, pad: [0, 12], radius: "sm", h: 28, fill: CODE[k][0], stroke: CODE[k][1] || "border", dash: k === "H" ? [4, 3] : void 0 }));
      add(c, await txt(l, "body-sm-strong", "text", "label"));
    }
    const widths = [150, 150, 250, 220, 180, 330];
    const tbl = add(f, box("Fields", { dir: "VERTICAL", align: "MIN", stroke: "border", radius: "md", clip: true }));
    const heads = ["Field", "Type", "Table", "Board card", "Details panel", "Why"];
    const hr = add(tbl, box("Header", { fill: "bg-subtle", align: "MIN" }));
    for (let i = 0; i < 6; i++) {
      const c = add(hr, box(heads[i], { pad: 12, w: widths[i], align: "MIN" }));
      add(c, await txt(heads[i], "caption-strong", "text-muted", "label"));
    }
    for (const [name, req, type, t, b, p, why] of FIELDS) {
      const r = add(tbl, box(name, { align: "MIN", stroke: "border", strokeSides: "t" }));
      const cells = [[name + (req ? "  \xB7 required" : ""), null, "body-sm-strong"], [type, null, "body-sm"], [t[0], t[1], "body-sm"], [b[0], b[1], "body-sm"], [p[0], p[1], "body-sm"], [why, null, "body-sm"]];
      for (let i = 0; i < 6; i++) {
        const [s, code, style] = cells[i];
        const c = add(r, box(heads[i], { dir: "VERTICAL", pad: 12, w: widths[i], align: "MIN", fill: code ? CODE[code][0] : null, stroke: code && CODE[code][1] ? CODE[code][1] : void 0, dash: code === "H" ? [4, 3] : void 0 }));
        wrapText(add(c, await txt(s, style, i >= 5 ? "text-muted" : "text", "value")));
      }
    }
    add(f, await txt(`Sample dataset \xB7 ${DATA.contacts.length} fictional contacts`, "heading", "text", "dataset title"));
    const cols = ["Name", "Company", "Role", "Email", "Owner", "Labels", "Stage", "Notes"], w2 = [170, 190, 160, 230, 80, 170, 80, 260];
    const dt = add(f, box("Dataset", { dir: "VERTICAL", align: "MIN", stroke: "border", radius: "md", clip: true }));
    const dh = add(dt, box("Header", { fill: "bg-subtle", align: "MIN" }));
    for (let i = 0; i < 8; i++) {
      const c = add(dh, box(cols[i], { pad: [8, 12], w: w2[i], align: "MIN" }));
      add(c, await txt(cols[i], "caption-strong", "text-muted", "label"));
    }
    for (const c of DATA.contacts) {
      const vals = [c.name, c.company || "missing", c.role || "missing", c.email || "missing", c.owner ? c.owner.split(" ")[0] : "none", c.labels.length ? c.labels.join(", ") : "none", c.stage, c.notes || "empty"];
      const r = add(dt, box(c.name, { align: "MIN", stroke: "border", strokeSides: "t" }));
      for (let i = 0; i < 8; i++) {
        const cell = add(r, box(cols[i], { dir: "VERTICAL", pad: [8, 12], w: w2[i], align: "MIN" }));
        const miss = ["missing", "none", "empty"].includes(vals[i]);
        wrapText(add(cell, await txt(vals[i], i === 0 ? "body-sm-strong" : "body-sm", miss ? "text-subtle" : "text", "value")));
      }
    }
    return f;
  }
  async function buildFlow() {
    const f = await board("04 \xB7 Edit flow & state", 1600);
    await head(f, "STEP 1 \xB7 INTERACTION MODEL", "One edit path, from either view", "Table and board open the same panel. Edits stay in a draft until Save, so the views never show half-finished changes \u2014 and Cancel always has something true to go back to.");
    const node = async (title, sub, accent = false) => {
      const n = box(title, { dir: "VERTICAL", gap: 4, pad: 16, align: "MIN", fill: accent ? "action" : "surface", stroke: "border-strong", radius: "md", w: 220 });
      add(n, await txt(title, "body-sm-strong", accent ? "on-action" : "text", "title"));
      if (sub) wrapText(add(n, await txt(sub, "caption", accent ? "on-action" : "text-muted", "text")));
      return n;
    };
    const arrow = () => ico("chevron-forward", 20, "text-subtle", "then");
    const lane = async (name, items) => {
      const r = add(f, box(name, { gap: 12, align: "MIN" }));
      for (let i = 0; i < items.length; i++) {
        if (i) add(r, arrow());
        add(r, await node(items[i][0], items[i][1], items[i][2]));
      }
      return r;
    };
    add(f, await txt("Open and edit", "heading", "text", "lane title"));
    await lane("Open and edit", [["Table", "Click a row or press Enter"], ["Board", "Click a card or press Enter"], ["Open side panel", "Focus moves to its heading"], ["Edit a draft", "Stage or Notes; an Unsaved dot appears"], ["Save or cancel?", "", true]]);
    add(f, await txt("Save", "heading", "text", "lane title"));
    await lane("Save", [["Save", "\u2318\u21B5 or the Save changes button", true], ["Commit once", "One update to the store"], ["Both views re-render", "Card changes column, row pill updates, toast with Undo"]]);
    add(f, await txt("Cancel or leave", "heading", "text", "lane title"));
    await lane("Cancel or leave", [["Cancel \xB7 Esc", "Drop the draft", true], ["Close or J/K while dirty", "Unsaved changes?"], ["Keep editing or Discard", "Discard drops the draft"], ["Drop the draft", "Saved values untouched"], ["Back to context", "Same view and scroll; focus on that record"]]);
    const row = add(f, box("Rules", { gap: 24, align: "MIN" }));
    add(row, await card("Panel rules", 480, "Panel rules", [
      "\u2022 Side peek on the right: pushes the list at 1280px and up, overlays it below.",
      "\u2022 Tab order inside: Stage \u2192 Notes \u2192 Cancel \u2192 Save changes.",
      "\u2022 J / K walk to the previous or next record; a dirty draft asks first.",
      "\u2022 After Save the panel stays open on the saved record.",
      "\u2022 Esc or close returns focus to the row or card, even if the card moved column."
    ]));
    const st = add(row, box("State", { dir: "VERTICAL", gap: 16, align: "MIN" }));
    add(st, await card("Source of truth", 480, "1 \xB7 Source of truth", ["contacts: one list, keyed by id, changed only by a reducer action updateContact(id, patch)."]));
    add(st, await card("Derived, never copied", 480, "2 \xB7 Derived, never copied", ["Table rows and board groups are computed from contacts on every render. No second copy means no duplicate or stale card."]));
    add(st, await card("UI state, kept per view", 480, "3 \xB7 UI state, kept per view", ["view, selectedId, draft, scroll position per view and the element that opened the panel \u2014 so closing puts you back."]));
    return f;
  }
  var HEUR = [
    ["01", "Visibility of system status", "Unsaved dot on the panel. Save enables only when something changed. Column counts update live; the moved card flashes once in its new column."],
    ["02", "Match the real world", "Stages run left to right, Lead to Customer, like a sales pipeline. Plain words: \u201CSave changes\u201D, not \u201CSubmit\u201D."],
    ["03", "User control and freedom", "Cancel and Esc drop the draft. Every save shows a toast with Undo. Closing the panel never moves you somewhere new."],
    ["04", "Consistency and standards", "One stage pill, one avatar, one panel \u2014 the same in both views. Aa NAD components and tokens throughout."],
    ["05", "Error prevention", "Stage is a fixed list, so it can't be blank or misspelled. Leaving a dirty draft asks Keep editing or Discard."],
    ["06", "Recognition over recall", "The stage picker shows all four options with their colours. View switch shows both names with icons. Shortcuts sit in tooltips."],
    ["07", "Flexibility and efficiency", "Mouse for beginners; \u2318\u21B5, Esc, J/K and arrow keys for experts. Drag-and-drop between columns as a stretch shortcut."],
    ["08", "Aesthetic, minimal design", "Cards carry 4 things: name, role \xB7 company, labels, owner. Ink and paper; colour is used only for stages."],
    ["09", "Recover from errors", "Moved the wrong person? Undo in the toast puts the stage and notes back exactly as they were."],
    ["10", "Help and documentation", "The empty Qualified column explains how to fill it. Missing fields say \u201CAdd email\u201D instead of staying blank. Press ? for shortcuts."]
  ];
  async function buildHeuristics() {
    const f = await board("05 \xB7 Nielsen's 10, applied");
    await head(f, "STEP 1 \xB7 DESIGN PRINCIPLES", "Nielsen's 10 heuristics, as decisions", "Each heuristic becomes something you can point at in the interface \u2014 and check in the prototype.");
    const grid = add(f, box("Heuristics", { gap: 16, wrap: true, align: "MIN" }));
    size(grid, BW - 128);
    grid.counterAxisSpacing = 16;
    for (const [n, t, d] of HEUR) add(grid, await card(t, 648, `${n}  ${t}`, [d]));
    add(f, await card("Lively, within the system", BW - 128, "Lively, within the system", ["Calm motion only where it explains a change: card lifts 2px on hover, panel slides in over 320ms, the moved card fades into its new column, the toast slides up. All of it turns off under reduced motion."], { fill: "surface-sunken" }));
    return f;
  }
  var BOARDS = [
    { key: "Main", x: 0, y: 0, build: buildMain },
    { key: "References", x: 1520, y: 0, build: buildReferences },
    { key: "FieldMap", x: 0, y: 1200, build: buildFieldMap },
    { key: "Flow", x: 1520, y: 1200, build: buildFlow },
    { key: "Heuristics", x: 0, y: 2440, build: buildHeuristics }
  ];

  // src/code.ts
  var PAGES = ["Cover & Foundations", "Components", "Screens"];
  async function ensurePages() {
    const out = {};
    const first = figma.root.children[0];
    if (!figma.root.children.some((p) => p.name === PAGES[0]) && figma.root.children.length === 1 && first.children.length === 0) first.name = PAGES[0];
    for (const n of PAGES) {
      let p = figma.root.children.find((x) => x.name === n);
      if (!p) {
        try {
          p = figma.createPage();
          p.name = n;
        } catch (e) {
          warn(`Could not create the page "${n}" (${e.message}). Its content goes on the first page instead.`);
          p = figma.root.children[0];
        }
      }
      out[n] = p;
    }
    for (const p of Object.values(out)) p.backgrounds = [{ type: "SOLID", color: { r: 0.957, g: 0.957, b: 0.957 } }];
    return out;
  }
  async function removeGenerated(pages) {
    let n = 0;
    for (const p of Object.values(pages)) {
      for (const c of [...p.children]) {
        if (isTagged(c)) {
          c.remove();
          n++;
        } else if (c.type === "FRAME" && c.name === "Icons") {
          for (const k of [...c.children]) if (isTagged(k)) {
            k.remove();
            n++;
          }
        }
      }
    }
    log(`Rebuild: removed ${n} generated nodes`);
  }
  function collectRegistry(page) {
    for (const s of page.findAllWithCriteria({ types: ["COMPONENT_SET"] })) REG[s.name] = s;
    for (const c of page.findAllWithCriteria({ types: ["COMPONENT"] })) {
      if (c.name.startsWith("Icon/")) C.ICON[c.name.slice(5)] = c;
      else if (c.parent && c.parent.type !== "COMPONENT_SET") REG[c.name] = c;
    }
  }
  async function buildIcons(page) {
    const missing = Object.keys(DATA.icons).filter((n) => !C.ICON[n]);
    if (!missing.length) return;
    let grid = page.children.find((n) => n.type === "FRAME" && n.name === "Icons");
    if (!grid) {
      grid = box("Icons", { gap: 24, pad: 32, align: "MIN", wrap: true });
      tag(grid);
      page.appendChild(grid);
      size(grid, 8 * 20 + 7 * 24 + 64);
      grid.counterAxisSpacing = 24;
      grid.x = 0;
      grid.y = nextY(page);
    }
    for (const name of missing) {
      const svg = figma.createNodeFromSvg(DATA.icons[name]);
      const vb = svg.width || 512;
      svg.rescale(20 / vb);
      const c = figma.createComponent();
      c.name = "Icon/" + name;
      c.resize(20, 20);
      c.fills = [];
      c.clipsContent = true;
      c.appendChild(svg);
      svg.x = 0;
      svg.y = 0;
      svg.name = "glyph";
      svg.fills = [];
      svg.constraints = { horizontal: "SCALE", vertical: "SCALE" };
      for (const d of svg.findAll(() => true)) if ("constraints" in d) d.constraints = { horizontal: "SCALE", vertical: "SCALE" };
      recolor(c, "text");
      c.description = `Ionicons ${name} (MIT).`;
      grid.appendChild(c);
      tag(c);
      C.ICON[name] = c;
      C.stats.icons++;
    }
    log(`Icons: ${C.stats.icons} created`);
  }
  var LIST = [
    ["Avatar", buildAvatar],
    ["Stage pill", buildStagePill],
    ["Label tag", buildLabelTag],
    ["Badge", buildBadge],
    ["Kbd", buildKbd],
    ["Button", buildButton],
    ["Icon button", buildIconButton],
    ["Segmented item", buildSegmentedItem],
    ["View switch", buildViewSwitch],
    ["Search input", buildSearchInput],
    ["Select", buildSelect],
    ["Filter chip", buildFilterChip],
    ["Table header cell", buildTableHeaderCell],
    ["Table cell", buildTableCell],
    ["Table row", buildTableRow],
    ["Contact card", buildContactCard],
    ["Column header", buildColumnHeader],
    ["Empty column", buildEmptyColumn],
    ["Stage option", buildStageOption],
    ["Stage picker", buildStagePicker],
    ["Notes field", buildNotesField],
    ["Detail row", buildDetailRow],
    ["Panel footer", buildPanelFooter],
    ["Details panel", buildDetailsPanel],
    ["Toast", buildToast],
    ["Dialog", buildDialog],
    ["Sidebar item", buildSidebarItem],
    ["Sidebar", buildSidebar]
  ];
  async function buildComponents(page) {
    for (const [name, fn] of LIST) {
      const exists = page.children.some((n) => n.type === "SECTION" && n.name === name) || !!setByName(page, name);
      if (exists) {
        C.stats.skipped.push(name);
        continue;
      }
      const sec = newSection(page, name);
      try {
        const nodes = await fn(sec);
        await fitSection(sec, page, name, nodes[0].description || "", nodes);
      } catch (e) {
        warn(`${name}: ${e.message}`);
        sec.remove();
        if (REG[name] && !REG[name].parent) delete REG[name];
      }
    }
  }
  async function buildScreens(page) {
    const place = async (secName, items) => {
      let sec = page.children.find((n) => n.type === "SECTION" && n.name === secName);
      if (!sec) {
        sec = newSection(page, secName);
        sec.x = 0;
        sec.y = nextY(page);
        sec.resizeWithoutConstraints(200, 200);
      }
      for (const it of items) {
        if (sec.findOne((n) => n.name === it.name)) {
          C.stats.skipped.push(it.name);
          continue;
        }
        try {
          const f = await it.make();
          sec.appendChild(f);
          f.x = 80 + it.x;
          f.y = 80 + it.y;
        } catch (e) {
          warn(`${it.name}: ${e.message}`);
        }
      }
      let w = 0, h = 0;
      for (const k of sec.children) {
        w = Math.max(w, k.x + k.width);
        h = Math.max(h, k.y + k.height);
      }
      sec.resizeWithoutConstraints(Math.max(w + 80, 200), Math.max(h + 80, 200));
    };
    const nm = (b) => b.name;
    await place("Step 1 \xB7 Understand the problem", BOARDS.map((b) => ({ name: { Main: "01 \xB7 The problem", References: "02 \xB7 Learn from real products", FieldMap: "03 \xB7 Fields & data", Flow: "04 \xB7 Edit flow & state", Heuristics: "05 \xB7 Nielsen's 10, applied" }[b.key], x: b.x, y: b.y, make: b.build })));
    await place("Step 2 \xB7 Interface design", SCREENS.map((s) => ({ name: s.spec.name, x: s.x, y: s.y, make: () => buildScreen(s.spec) })));
  }
  async function buildFoundations(page) {
    const have = (n) => page.children.some((c) => c.type === "SECTION" && c.name === n);
    if (!have("Foundations \xB7 Colour")) {
      const sec = newSection(page, "Foundations \xB7 Colour");
      const root = box("Colour", { dir: "VERTICAL", gap: 48, align: "MIN" });
      const modes = add(root, box("Semantic", { gap: 48, align: "MIN" }));
      for (const [label, bag, base] of [["Light", C.S, "bg"], ["Dark", C.SD, "bg"]]) {
        const col2 = add(modes, box(label, { dir: "VERTICAL", gap: 8, pad: 24, align: "MIN", radius: "md", stroke: "border" }));
        col2.fills = [paint(bag[base])];
        const t = await txt(`Semantic colour \xB7 ${label}`, "heading", "text", "title");
        if (bag !== C.S) t.fills = [paint(bag["text"])];
        add(col2, t);
        for (const tkn of DATA.semantic) {
          const row = add(col2, box(tkn.name, { gap: 12 }));
          const r = add(row, rect(tkn.name, 40, 24, null, "sm"));
          r.fills = [paint(bag[tkn.name])];
          r.strokes = [paint(bag["border-strong"])];
          r.strokeWeight = 1;
          const lbl = add(row, await txt(tkn.name + "   " + tkn[label.toLowerCase()], "mono", "text", "name"));
          if (bag !== C.S) lbl.fills = [paint(bag["text"])];
        }
      }
      add(root, await txt("Stage hues and neutrals", "heading", "text", "palette title"));
      for (const hue of ["blue", "violet", "amber", "green", "neutral"]) {
        const row = add(root, box(hue, { gap: 4, align: "MIN" }));
        const names = DATA.prim.light.filter(([n]) => n.startsWith(hue + "/")).map(([n]) => n);
        for (const [mode, bag] of [["Light", C.P], ["Dark", C.PD]]) {
          const g = add(row, box(`${hue} ${mode}`, { gap: 2, pad: 8, radius: "sm", stroke: "border" }));
          for (const n of names) {
            const r = add(g, rect(n, hue === "neutral" ? 20 : 48, 40, null, "sm"));
            r.fills = [paint(bag[n])];
          }
        }
      }
      await fitSection(sec, page, "Foundations \xB7 Colour", "Semantic colours in Light and Dark (each swatch is bound to that mode's variable), then the stage hues and neutral ramp.", [root]);
      tag(sec);
    }
    if (!have("Foundations \xB7 Type, space, radius, elevation")) {
      const sec = newSection(page, "Foundations \xB7 Type, space, radius, elevation");
      const root = box("Type and layout", { dir: "VERTICAL", gap: 48, align: "MIN" });
      add(root, await txt("Typography", "heading", "text", "type title"));
      const samples = { display: "Contacts", title: "Discard your changes?", heading: "No contacts match \u201Czzz\u201D", "card-name": "Maya Patel", body: "Search looks at names, companies, roles and emails.", "body-sm": "Head of Operations \xB7 Lumen Brew", "body-sm-strong": "Save changes", caption: "10 contacts", "caption-strong": "Lead", label: "Warm", overline: "Intelligence", mono: "maya@lumenbrew.co" };
      for (const t of DATA.type) {
        const r = add(root, box(t.name, { gap: 24 }));
        await txt(`${t.name}
${t.size}/${t.line} \xB7 ${t.weight}`, "mono", "text-muted", "spec", { w: 180 }).then((x) => add(r, x));
        add(r, await txt(samples[t.name] || t.name, t.name, "text", "sample"));
      }
      add(root, await txt("Spacing", "heading", "text", "space title"));
      for (const [k, v] of DATA.space) {
        const r = add(root, box("space-" + k, { gap: 16 }));
        await txt("space/" + k + "  " + v + "px", "mono", "text-muted", "name", { w: 160 }).then((x) => add(r, x));
        const bar = add(r, rect("bar", Math.max(v, 1), 16, "action"));
        const sp = C.SP["space/" + k];
        if (sp && v > 0) {
          try {
            bar.setBoundVariable("width", sp);
          } catch (e) {
          }
        }
      }
      add(root, await txt("Radius", "heading", "text", "radius title"));
      const rr = add(root, box("Radii", { gap: 16, align: "MIN" }));
      for (const [k, v] of DATA.radius) {
        const b = add(rr, box("radius-" + k, { dir: "VERTICAL", justify: "MAX", pad: 8, fill: "surface", stroke: "border-strong", sw: 2, radius: k, w: 96, h: 96, align: "MIN" }));
        add(b, await txt(`${k}
${v}px`, "mono", "text-muted", "name"));
      }
      add(root, await txt("Elevation", "heading", "text", "elevation title"));
      const er = add(root, box("Shadows", { gap: 48, pad: 24, align: "MIN" }));
      for (const mode of ["Light", "Dark"]) {
        const bg = add(er, box(mode, { gap: 24, pad: 32, radius: "md", w: void 0 }));
        const bag = mode === "Light" ? C.S : C.SD;
        bg.fills = [paint(bag["bg"])];
        for (const s of DATA.shadow) {
          const b = add(bg, box(s.name, { justify: "CENTER", radius: "md", w: 120, h: 80 }));
          b.fills = [paint(bag["surface-raised"])];
          await effectStyle(b, `Shadow/${s.name}/${mode}`);
          const l = add(b, await txt(s.name.replace("elevation-", "Elevation "), "caption-strong", "text", "name"));
          if (bag !== C.S) l.fills = [paint(bag["text"])];
        }
      }
      await fitSection(sec, page, "Foundations \xB7 Type, space, radius, elevation", "12 text styles, the spacing scale, radius tokens and 4 elevation levels (light and dark styles).", [root]);
      tag(sec);
    }
  }
  function countComponents(comp) {
    const sets = comp.findAllWithCriteria({ types: ["COMPONENT_SET"] });
    const loose = comp.findAllWithCriteria({ types: ["COMPONENT"] }).filter((c) => !c.name.startsWith("Icon/") && c.parent && c.parent.type !== "COMPONENT_SET");
    const variants = sets.reduce((a, s) => a + s.children.length, 0) + loose.length;
    return { components: sets.length + loose.length, variants };
  }
  async function buildCover(page, comp, vars) {
    if (page.children.some((c) => c.type === "SECTION" && c.name === "Cover")) return;
    const sec = newSection(page, "Cover");
    sec.x = 0;
    sec.y = -1;
    const f = box("Cover", { dir: "VERTICAL", gap: 24, pad: 64, align: "MIN", fill: "bg", stroke: "border", radius: "md", w: 1200 });
    add(f, await txt("FIGMA LIBRARY", "overline", "text-muted", "eyebrow"));
    add(f, await txt("Contacts \u2014 Table & Board", "display", "text", "title"));
    add(f, await txt("A real, editable rebuild of the design: variables, text and shadow styles, icon components, 28 components with variants and properties, plus 42 icon components, eleven product screens and five context boards. Generated from design/tokens.json and the React components, so the file and the code agree.", "body", "text-muted", "lede", { w: 880 }));
    const n = countComponents(comp);
    const stats = add(f, box("Counts", { gap: 16, align: "MIN", wrap: true }));
    const items = [[String(vars), "variables"], [String(Object.keys(C.TS).length), "text styles"], [String(Object.keys(C.ES).length), "shadow styles"], [String(Object.keys(C.ICON).length), "icons"], [String(n.components), "components"], [String(n.variants), "variants"], [String(SCREENS.length), "screens"], [String(BOARDS.length), "context boards"]];
    for (const [v, l] of items) {
      const c = add(stats, box(l, { dir: "VERTICAL", gap: 4, pad: 16, align: "MIN", fill: "surface-sunken", radius: "md", w: 132 }));
      add(c, await txt(v, "display", "text", "value"));
      add(c, await txt(l, "caption", "text-muted", "label"));
    }
    add(f, await txt("Pages: Cover & Foundations \xB7 Components (one section per component) \xB7 Screens (Step 1 context boards, Step 2 product screens A\u2013K).\nDark mode: every colour variable has a Dark value; on the free plan Light and Dark are separate collections.", "body-sm", "text-muted", "pages", { w: 880 }));
    await fitSection(sec, page, "Contacts \u2014 Table & Board", "Design system and screens for the contacts table and board.", [f]);
    tag(sec);
    sec.y = -1;
    restack(page);
    sec.y = 0;
  }
  async function main() {
    await figma.loadAllPagesAsync();
    const rebuild = figma.command === "rebuild";
    const pages = await ensurePages();
    if (rebuild) await removeGenerated(pages);
    figma.notify("Contacts Table & Board: building\u2026 this can take a few minutes.", { timeout: 12e4 });
    await setupFonts();
    await buildVariables();
    await buildStyles();
    const comp = pages["Components"];
    await figma.setCurrentPageAsync(comp);
    collectRegistry(comp);
    await buildIcons(comp);
    await buildComponents(comp);
    collectRegistry(comp);
    const scr = pages["Screens"];
    await figma.setCurrentPageAsync(scr);
    await buildScreens(scr);
    const cover = pages["Cover & Foundations"];
    await figma.setCurrentPageAsync(cover);
    await buildFoundations(cover);
    const allVars = (await figma.variables.getLocalVariablesAsync()).length;
    await buildCover(cover, comp, allVars);
    const n = countComponents(comp);
    const s = C.stats;
    const msg = `Built ${allVars} variables, ${Object.keys(C.TS).length} text styles, ${Object.keys(C.ES).length} shadow styles, ${Object.keys(C.ICON).length} icons, ${n.components} components (${n.variants} variants), ${s.screens} screens/boards.` + (s.skipped.length ? ` Skipped ${s.skipped.length} that already existed.` : "") + (issues.length ? ` ${issues.length} note(s) in the console (Plugins \u2192 Development \u2192 Open console).` : "");
    figma.closePlugin(msg);
  }
  main().catch((e) => {
    console.error(e);
    figma.closePlugin("Contacts Table & Board failed: " + (e && e.message ? e.message : e));
  });
})();

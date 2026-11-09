#!/usr/bin/env python3
"""Baixa as fontes do modo texto (Google Fonts, subset latin) para public/fonts/.

Uso: python3 scripts/fetch-fonts.py
Regenera src/fonts.css. As famílias são licenciadas em OFL-1.1.
"""
import os
import re
import urllib.request

UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0 Safari/537.36"
)

FAMILIES = {
    "Instrument+Serif:ital@0;1": "instrument-serif",
    "Instrument+Sans:wght@400;600": "instrument-sans",
    "JetBrains+Mono:wght@400;700": "jetbrains-mono",
    "Caveat:wght@400": "caveat",
}

os.makedirs("public/fonts", exist_ok=True)
out = ["/* Fontes self-hosted (Google Fonts, OFL). Só carregam no modo texto. */\n"]

for family_spec, slug in FAMILIES.items():
    url = f"https://fonts.googleapis.com/css2?family={family_spec}&display=swap"
    css = urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA})
    ).read().decode()

    for subset, body in re.findall(r"/\* ([\w-]+) \*/\s*@font-face \{(.*?)\}", css, re.S):
        if subset != "latin":
            continue
        family = re.search(r"font-family: '([^']+)'", body).group(1)
        style = re.search(r"font-style: (\w+)", body).group(1)
        weight = re.search(r"font-weight: (\d+)", body).group(1)
        src = re.search(r"url\((https://[^)]+)\)", body).group(1)
        ext = "woff2" if src.endswith("woff2") else "woff"
        name = f"{slug}-{weight}-{style}.{ext}"

        data = urllib.request.urlopen(
            urllib.request.Request(src, headers={"User-Agent": UA})
        ).read()
        with open(f"public/fonts/{name}", "wb") as fh:
            fh.write(data)

        out.append(
            f"@font-face {{\n  font-family: '{family}';\n  font-style: {style};\n"
            f"  font-weight: {weight};\n  font-display: swap;\n"
            f"  src: url('/fonts/{name}') format('{ext}');\n}}\n"
        )
        print(f"{name:38s} {len(data) / 1024:6.1f} KB")

with open("src/fonts.css", "w") as fh:
    fh.write("\n".join(out))
print("src/fonts.css escrito")

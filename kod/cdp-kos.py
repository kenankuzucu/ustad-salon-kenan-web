# -*- coding: utf-8 -*-
"""CDP test sürücüsü (WebGL açık): JS ifadesini gerçek Chrome'da çalıştırır, sonucu + ekran görüntüsü verir."""
import os, sys, json, time, subprocess, shutil, tempfile, urllib.request, asyncio, socket, base64

CHROME = [r"C:\Program Files\Google\Chrome\Application\chrome.exe",
          r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
          os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe")]


def bos_port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p


def calistir(url, js_ifade, bekle=25, png=None, tam=False, pencere="1500,1100"):
    import websockets
    chrome = next((c for c in CHROME if os.path.exists(c)), None)
    if not chrome:
        return "Chrome bulunamadı"
    port = bos_port()
    kalici = os.environ.get("CDP_PROFIL")
    if kalici:
        profil = kalici
        os.makedirs(profil, exist_ok=True)
    else:
        profil = os.path.join(os.environ.get("TEMP", tempfile.gettempdir()), "cdpw_" + str(int(time.time() * 1000)))
        shutil.rmtree(profil, ignore_errors=True)
    try:
        _g = int(pencere.split(",")[0])
    except Exception:
        _g = 1500
    mod = "--headless" if _g < 1000 else "--headless=new"
    surec = subprocess.Popen([chrome, mod, "--disable-gpu", "--no-sandbox", "--no-first-run",
                              "--enable-unsafe-swiftshader", "--window-size=" + pencere,
                              "--remote-debugging-port=" + str(port),
                              "--user-data-dir=" + profil, url],
                             stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    hedef = None
    for _ in range(60):
        time.sleep(0.5)
        try:
            with urllib.request.urlopen("http://127.0.0.1:%d/json" % port, timeout=3) as c:
                for h in json.loads(c.read().decode("utf-8")):
                    if h.get("type") == "page" and h.get("webSocketDebuggerUrl"):
                        hedef = h
        except Exception:
            continue
        if hedef:
            break
    if not hedef:
        surec.kill()
        return "Chrome hedefi açılamadı"

    async def gorev():
        async with websockets.connect(hedef["webSocketDebuggerUrl"], max_size=64 * 1024 * 1024) as ws:
            no = [0]

            async def gonder(method, params=None):
                no[0] += 1
                await ws.send(json.dumps({"id": no[0], "method": method, "params": params or {}}))
                while True:
                    y = json.loads(await asyncio.wait_for(ws.recv(), timeout=bekle + 120))
                    if y.get("id") == no[0]:
                        return y

            await gonder("Runtime.enable")
            await gonder("Page.enable")
            try:
                w, h = [int(x) for x in pencere.split(",")]
                if w < 1000:
                    await gonder("Emulation.setDeviceMetricsOverride",
                                 {"width": w, "height": h, "deviceScaleFactor": 1, "mobile": True})
            except Exception:
                pass
            time.sleep(3.5)
            y = await gonder("Runtime.evaluate", {"expression": js_ifade, "awaitPromise": True,
                                                 "returnByValue": True, "userGesture": True})
            sonuc = ""
            try:
                sonuc = y["result"]["result"]["value"]
                if sonuc is None:
                    sonuc = json.dumps(y["result"], ensure_ascii=False)[:1500]
            except Exception:
                sonuc = json.dumps(y, ensure_ascii=False)[:2000]
            if sonuc in ("", "{}"):
                sonuc = "RAW: " + json.dumps(y, ensure_ascii=False)[:1200]
            if png:
                time.sleep(1.2)
                s = await gonder("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": bool(tam)})
                veri = s.get("result", {}).get("data")
                if veri:
                    open(png, "wb").write(base64.b64decode(veri))
                    sonuc = str(sonuc) + "\n\n[EKRAN] " + png
            return sonuc

    try:
        return asyncio.run(gorev())
    finally:
        try:
            surec.kill()
        except Exception:
            pass
        time.sleep(0.4)
        if not kalici:
            shutil.rmtree(profil, ignore_errors=True)


if __name__ == "__main__":
    url = sys.argv[1]
    js = open(sys.argv[2], encoding="utf-8").read() if os.path.exists(sys.argv[2]) else sys.argv[2]
    png = sys.argv[3] if len(sys.argv) > 3 else None
    bekle = int(sys.argv[4]) if len(sys.argv) > 4 else 25
    pencere = sys.argv[5] if len(sys.argv) > 5 and sys.argv[5] else "1500,1100"
    print(calistir(url, js, bekle, png, False, pencere))

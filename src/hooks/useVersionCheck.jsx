import { useEffect } from "react";

// optional: pass in persistor if you use redux-persist
export function useVersionCheck({ storageKey = "app_version", persistor } = {}) {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json?_=" + Date.now()); // bust cache
        if (!res.ok) return;

        const { version } = await res.json();
        const current = localStorage.getItem(storageKey);

        if (current && current !== version) {
          console.log(`[VersionCheck] New version detected: ${version} (was ${current})`);
          // clear storage
          localStorage.clear();
          sessionStorage.clear();

          // clear redux-persist if provided
          if (persistor) {
            //alert('purging')
            await persistor.purge();
          }
          // force reload new build
          window.location.reload(true);
        }

        // save new version
        localStorage.setItem(storageKey, version);
      } catch (err) {
        console.warn("[VersionCheck] Failed to check version:", err);
      }
    };

    checkVersion();
  }, [storageKey, persistor]);
}

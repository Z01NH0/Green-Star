/* Green Star v3.41 — ZOINHO Storage v2.
 * One complete checkpoint wins. Never merge inventories, flags or area graphs
 * from different runs, and never rank by area: New Game intentionally restarts.
 */
(() => {
  'use strict';
  const SAVE_KEY = 'green-star-checkpoint-v1';
  function inspect(storage) {
    const raw = storage?.[SAVE_KEY];
    if (typeof raw !== 'string') return null;
    return window.GreenStarSave?.inspect(raw) || null;
  }
  window.ZOINHO_STORAGE_CONFIG = Object.freeze({
    gameId: 'green-star',
    displayName: 'Green Star',
    bridgeVersion: 2,
    // Production launch uses the origin/nonce supplied by the portal, as in
    // Heroes Battle. Do not place service keys or account tokens in this file.
    portalOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    saveKeys: [SAVE_KEY],
    runtimeReady: () => window.GreenStarSave?.ready === true,
    validateStorage(storage) {
      return !Object.prototype.hasOwnProperty.call(storage, SAVE_KEY) || inspect(storage) !== null;
    },
    compareProgress(local, remote) {
      const a = inspect(local), b = inspect(remote);
      if (!a || !b) return a ? 1 : b ? -1 : 0;
      return a.savedAt === b.savedAt ? 0 : a.savedAt > b.savedAt ? 1 : -1;
    }
  });
})();

// Unsplash helper disabled
//
// For security and reproducibility we no longer perform runtime calls to the
// Unsplash API from this repository. If you need to refresh or re-generate the
// pinned images, use the project script `scripts/fetch-unsplash.mjs` outside of
// source control with a local UNSPLASH access key (the key must never be
// committed). The script can produce a new `src/mock/pinnedImages.ts` file.

export async function searchUnsplash(): Promise<string[]> {
  throw new Error('Unsplash fetching is disabled in the codebase. Use scripts/fetch-unsplash.mjs externally to regenerate pinnedImages.')
}

export async function enrichProductsWithUnsplash(): Promise<number> {
  throw new Error('Unsplash enrichment disabled. Use scripts/fetch-unsplash.mjs externally to regenerate pinnedImages.')
}

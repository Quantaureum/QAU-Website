/**
 * Stub for optional peer packages resolved lazily by @coinbase/cdp-sdk's
 * x402 payment flow (features we do not enable). Exports are sourced from
 * `new Proxy` so any named import resolves to a throwing placeholder.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const proxy: any = new Proxy(
  {},
  {
    get() {
      return () => {
        throw new Error(
          "optional @x402/* package is stubbed in this build"
        )
      }
    },
  }
)

export default proxy
export const toClientEvmSigner = proxy

import '@picocss/pico'
import '@/styles/globals.css'
import { trpc } from '@/util/trpc'
import type { AppProps, AppType } from 'next/app'

const App: AppType = ({ Component, pageProps }: AppProps) => (
 <Component {...pageProps} />
)

export default trpc.withTRPC(App);
// pages/_app.js
import 'antd/dist/reset.css'; // antd 5.x 부터 reset.css 권장
import '../styles/globals.css';  // 기존 글로벌 스타일 있으면

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

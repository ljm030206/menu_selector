// pages/index.js
import { Button, Typography, Space } from 'antd';
import { useRouter } from 'next/router';

const { Title } = Typography;

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    localStorage.removeItem('answers');
    localStorage.removeItem('excludedNations');
    router.push('/quiz/1');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <Title level={1} style={{ textAlign: 'center' }}>
        메뉴 추천 테스트
      </Title>
      <Button type="primary" size="large" style={{ padding: '16px 48px' }} onClick={handleStart}>
        시작하기
      </Button>
    </div>
  );
}

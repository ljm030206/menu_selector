import { Button, Typography } from "antd";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    localStorage.removeItem("answers");
    localStorage.removeItem("excludedNations");
    router.push("/quiz/1");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        padding: "0 20px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        메뉴 추천 테스트
      </Typography.Title>
      <Button type="primary" size="large" onClick={handleStart} style={{ marginTop: "24px" }}>
        시작하기
      </Button>
    </div>
  );
}

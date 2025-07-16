import { Card, Typography } from "antd";

const { Text } = Typography;

export default function ResultCard({ menu }) {
  return (
    <Card
      title={menu.name}
      hoverable
      style={{ maxWidth: 600, margin: "0 auto", marginBottom: 16, cursor: "pointer" }}
      onClick={() => window.open(`https://map.naver.com/p/search/${encodeURIComponent(menu.name)}`, "_blank")}
    >
      <Typography.Text type="secondary" style={{ marginLeft: 16 }}>
        종류: {menu.nation}
      </Typography.Text>
    </Card>
  );
}

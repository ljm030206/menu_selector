import { Card, Radio, Space } from "antd";

export default function QuestionsCard({ question, onAnswer }) {
  return (
    <Card
      title={question.question}
      style={{ maxWidth: 600, margin: "0 auto" }}
      headStyle={{ fontWeight: "bold", fontSize: 20 }}
      bodyStyle={{ padding: 24 }}
    >
      <Radio.Group
        onChange={(e) => onAnswer(e.target.value)}
        style={{ width: "100%" }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {question.options.map((opt) => (
            <Radio key={opt.value} value={opt.value} style={{ fontSize: 16 }}>
              {opt.text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Card>
  );
}

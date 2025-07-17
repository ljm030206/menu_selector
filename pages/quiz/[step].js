// pages/quiz/[step].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Space, Typography } from "antd";
import questions from "../../data/questions.json";

const { Title } = Typography;

export default function QuizStep() {
  const router = useRouter();
  const { step } = router.query;
  const currentStep = parseInt(step, 10);

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // 질문이 바뀔 때마다 선택 초기화
    setSelectedOptions([]);
  }, [step]);

  if (!step || isNaN(currentStep)) return null;

  const question = questions[currentStep - 1];
  if (!question) return <p>질문을 찾을 수 없습니다.</p>;

  const isMultiSelect = question.multiSelect || false;

  // 선택 토글 (복수선택용)
  const toggleOption = (value) => {
  if (value === "none") {
    setSelectedOptions(["none"]);
  } else {
    if (selectedOptions.includes("none")) {
      setSelectedOptions([value]);
    } else {
      if (selectedOptions.includes(value)) {
        setSelectedOptions(selectedOptions.filter((v) => v !== value));
      } else {
        setSelectedOptions([...selectedOptions, value]);
      }
    }
  }
};

  // 복수선택 확인 후 저장 및 다음 이동
  const handleConfirm = () => {
    const prev = JSON.parse(localStorage.getItem("answers") || "[]");
    const newAnswers = [...prev];
    newAnswers[currentStep - 1] = selectedOptions;
    localStorage.setItem("excludedNations", JSON.stringify(selectedOptions));

    if (currentStep < questions.length) {
      router.push(`/quiz/${currentStep + 1}`);
    } else {
      router.push("/result");
    }
  };

  // 단일선택 즉시 저장 후 이동
  const handleClick = (value) => {
    const prev = JSON.parse(localStorage.getItem("answers") || "[]");
    const newAnswers = [...prev];
    newAnswers[currentStep - 1] = value;
    localStorage.setItem("answers", JSON.stringify(newAnswers));

    if (currentStep < questions.length) {
      router.push(`/quiz/${currentStep + 1}`);
    } else {
      router.push("/result");
    }
  };

  // 복수선택 문제 렌더링 (버튼 토글 스타일)
  if (isMultiSelect) {
    return (
      <div
        style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        boxSizing: "border-box",
        backgroundColor: "#f0f2f5",
      }}
      >
        <div style={{ 
          width: "100%", 
          maxWidth: 600, 
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%"
        }}>
          <Title level={2} style={{ marginBottom: 32, margin: "0 0 32px 0" }}>
            {question.question}
          </Title>
          <Space
            wrap
            size="middle"
            style={{ marginBottom: 24, justifyContent: "center" }}
          >
            {question.options.map((opt) => {
              const isSelected = selectedOptions.includes(opt.value);
              return (
                <Button
                  key={opt.value}
                  type={isSelected ? "primary" : "default"}
                  onClick={() => toggleOption(opt.value)}
                  style={{
                    minWidth: 140,
                    fontSize: 18,
                    padding: "14px 24px",
                    userSelect: "none",
                    borderRadius: 8,
                  }}
                >
                  {opt.text}
                </Button>
              );
            })}
          </Space>
          <Button
            type="primary"
            size="large"
            disabled={selectedOptions.length === 0}
            onClick={handleConfirm}
            style={{ width: "100%", fontSize: 20, padding: "18px 0" }}
          >
            다음
          </Button>
        </div>
      </div>
    );
  }

  // 단일 선택 문제 렌더링
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        boxSizing: "border-box",
        backgroundColor: "#f0f2f5",
        padding: "0 20px"
      }}
    >
      <div style={{ 
        width: "100%", 
        maxWidth: 600, 
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "0 20px"
      }}>
        <Title level={2} style={{ marginBottom: 32, margin: "0 0 32px 0" }}>
          {question.question}
        </Title>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {question.options.map((opt) => (
            <Button
              key={opt.value}
              type="primary"
              size="large"
              style={{ width: "100%", fontSize: 20, padding: "18px 0" }}
              onClick={() => handleClick(opt.value)}
            >
              {opt.text}
            </Button>
          ))}
        </Space>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import menuData from "../data/menuData.json";
import { Typography, Spin, Empty, Pagination, Button, Space } from "antd";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    try {
      const rawAnswers = localStorage.getItem("answers");
      const rawExcluded = localStorage.getItem("excludedNations");

      const userAnswers = rawAnswers ? JSON.parse(rawAnswers) : [];
      const excludedNations = rawExcluded ? JSON.parse(rawExcluded) : [];
      
      const normalizedUserAnswers = userAnswers.flatMap((ans) =>
        Array.isArray(ans) ? ans.map((a) => a.trim().toLowerCase()) : [ans.trim().toLowerCase()]
      );
      const normalizedExcluded = excludedNations.map((n) => n.trim().toLowerCase());

      // 카테고리 분류
      const mainTags = ["bread", "rice", "noodle", "soup", "meat"];
      const tempTags = ["hot", "cold"];
      const moodTags = ["fresh", "normal", "tired", "lover", "friend", "family", "alone", "light", "heavy"];

      const mustHaveMain = normalizedUserAnswers.filter((tag) => mainTags.includes(tag));
      const mustHaveTemp = normalizedUserAnswers.filter((tag) => tempTags.includes(tag));
      const optionalTags = normalizedUserAnswers.filter((tag) => moodTags.includes(tag));

      const results = menuData.filter((menu) => {
        const menuNation = menu.nation.trim().toLowerCase();
        const menuTags = menu.tags.map((t) => t.trim().toLowerCase());

        if (normalizedExcluded.includes(menuNation)) return false;

        // 주요 재료 조건
        const hasMain = mustHaveMain.length === 0 || mustHaveMain.some((tag) => menuTags.includes(tag));
        // 온도 조건
        const hasTemp = mustHaveTemp.length === 0 || mustHaveTemp.some((tag) => menuTags.includes(tag));
        // 기분/누구랑 조건
        const hasOptional = optionalTags.length === 0 || optionalTags.some((tag) => menuTags.includes(tag));

        return hasMain && hasTemp && hasOptional;
      });

      setFilteredMenus(results);
    } catch (error) {
      console.error("localStorage parsing error:", error);
      setFilteredMenus([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const startIdx = (page - 1) * pageSize;
  const pagedMenus = filteredMenus.slice(startIdx, startIdx + pageSize);

  if (loading)
    return (
      <Spin tip="추천 메뉴를 불러오는 중입니다..." style={{ display: "block", margin: "40px auto" }} />
    );
  if (!filteredMenus.length)
    return <Empty description="조건에 맞는 메뉴가 없습니다." style={{ marginTop: 60 }} />;

  return (
    <div style={{ 
      width: "100%", 
      maxWidth: "800px", 
      margin: "40px auto",
      padding: "0 20px", // 좌우 패딩 추가
      overflowY: "auto", // 세로 스크롤바 표시
      height: "100vh" // 전체 높이 설정
    }}>
      <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        추천 메뉴 목록
      </Typography.Title>

      <div style={{ marginBottom: 24 }}>
        {pagedMenus.map((menu, idx) => (
          <div key={idx} style={{ marginBottom: 16 }}>
            <ResultCard menu={menu} />
          </div>
        ))}
      </div>

      <Space style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filteredMenus.length}
          onChange={(p) => setPage(p)}
        />
      </Space>

      <Space style={{ display: "flex", justifyContent: "center", marginTop: 32, marginBottom: 40 }}>
        <Button type="default" size="large" onClick={() => (window.location.href = "/")}>
          처음으로
        </Button>
      </Space>
    </div>
  );
}
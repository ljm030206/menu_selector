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
      
      if (!userAnswers.length) {
        setFilteredMenus([]);
        setLoading(false);
        return;
      }

      const normalizedUserAnswers = userAnswers.flatMap((ans) =>
        Array.isArray(ans) ? ans.map((a) => a.trim().toLowerCase()) : [ans.trim().toLowerCase()]
      );
      const normalizedExcluded = excludedNations.map((n) => n.trim().toLowerCase());

      const results = menuData.filter((menu) => {
        const menuNation = menu.nation.trim().toLowerCase();
        const menuTags = menu.tags.map((t) => t.trim().toLowerCase());

        if (normalizedExcluded.includes(menuNation)) return false;

        const matchCount = normalizedUserAnswers.filter((ans) => menuTags.includes(ans)).length;
        return matchCount >= 3;
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
    <div style={{ width: "100%", maxWidth: "none", margin: "40px auto" }}>
      <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        추천 메뉴 목록
      </Typography.Title>

      {pagedMenus.map((menu, idx) => (
        <ResultCard key={idx} menu={menu} />
      ))}
      <Space style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filteredMenus.length}
          onChange={(p) => setPage(p)}
          style={{ textAlign: "center", marginTop: 24 }}
        />
      </Space>
      

      <Space style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Button type="default" size="large" onClick={() => (window.location.href = "/")}>
          처음으로
        </Button>
      </Space>
    </div>
  );
}

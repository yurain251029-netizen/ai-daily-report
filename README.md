# AI × 经济日报 · 站点

> AI 科技 × 经济金融 · 每日 3 报 · 中英双语

## 目录结构

```
site/
├── index.html              # 站点主页（外网用户访问入口）
├── reports/
│   └── index.html          # 最新一期报告
├── history.html            # 历史报告索引
├── archive/                # 历史归档（YYYY-MM-DD-{morning|noon|evening}.html）
├── template-optimized.html # 报告主模板
└── assets/
    ├── css/site.css        # 主页样式
    └── js/site.js          # 主页交互
```

## 设计理念

- **美观大气**：纸面纹理 + 暖棕主色 + 衬线字体
- **实用可读**：3 屏式结构（Hero / 今日 3 报 / 关于）
- **和谐统一**：严格继承 v3 视觉规范（与 index.html 完全一致）

## 部署方式

### CloudStudio 部署（推荐，公网访问）

将 `site/` 目录部署到 CloudStudio 静态站点。

### 本地预览

```bash
cd site
python -m http.server 8000
# 访问 http://localhost:8000
```

## 更新流程

每日 3 个 automation 任务（08:00 / 12:00 / 20:00）生成报告后：

1. 复制 `D:\整理\AI × 经济 报告\index.html` → `D:\整理\AI × 经济 报告\site\reports\index.html`
2. 复制 `D:\整理\AI × 经济 报告\history.html` → `D:\整理\AI × 经济 报告\site\history.html`
3. 复制 `D:\整理\AI × 经济 报告\archive\*.html` → `D:\整理\AI × 经济 报告\site\archive\*.html`
4. 重新部署 site/ 目录

> 💡 建议：后续可改造 automation 任务，让其自动同步到 site/ 目录

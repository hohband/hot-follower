---
name: douyin
description: 抖音热搜榜监控与分析。实时获取抖音热搜数据，分析趋势变化。
version: 2.0.0
emoji: 🎵
author: 招财
homepage: https://www.tianapi.com/apiview/155

metadata:
  clawdbot:
    emoji: "🎵"
    requires:
      bins: ["curl", "jq", "node"]
      env: ["TIANAPI_KEY"]
    primaryEnv: "TIANAPI_KEY"

provides:
  - capability: douyin-hot
    methods: [getHotList, analyzeHot, searchHot, monitorHot, compareHot]
---

# Douyin 🎵

抖音热搜榜监控与分析技能。

## 数据源

**天行数据 (TianAPI)**
- API 文档：https://www.tianapi.com/apiview/155
- 接口：抖音热搜榜
- 功能：实时获取 50 条热点视频话题及热度排名

## 配置

### 环境变量

```bash
export TIANAPI_KEY="your_api_key"
```

### 获取 API Key

1. 访问天行数据：https://www.tianapi.com
2. 注册/登录账号
3. 进入控制台
4. 创建应用获取 API Key
5. 申请抖音热搜榜接口：https://www.tianapi.com/apiview/155

### 会员额度

| 会员等级 | 每日调用量 | 价格 |
|---------|----------|------|
| 普通会员 | 100次 | 免费 |
| 高级会员 | 1万次 | 169元/年 |
| 黄金会员 | 50万次 | 529元/年 |
| 钻石会员 | 不限 | 1699元/年 |

## 功能

### 热搜监控
- 实时获取抖音热搜榜（50 条）
- 保存历史数据用于对比
- 检测热搜变化（新增/跌出）

### 热搜分析
- 热度统计（平均/最高/最低）
- 标签分布（新/荐/热）
- 热度等级分类
- 话题分类（体育/娱乐/科技/财经等）
- 排名变化追踪

### 热搜对比
- 对比不同日期的热搜
- 显示新增/跌出话题
- 排名上升/下降分析
- Top 10 对比

## 使用示例

```bash
cd /root/clawd/skills/douyin

# 获取热搜榜摘要
./scripts/hot_summary_tianapi.js

# 获取完整热搜榜
./scripts/get_hot_tianapi.js

# 分析热搜榜
./scripts/analyze_hot_tianapi.js

# 搜索特定话题
./scripts/search_hot_tianapi.js "立春"

# 保存热搜数据（用于历史对比）
./scripts/monitor_hot_tianapi.js

# 对比不同日期的热搜
./scripts/compare_hot_tianapi.js 2026-02-02 2026-02-03
```

## 数据存储

热搜数据保存在 `data/hot/` 目录：
```
data/hot/
├── hot_2026-02-01.json
├── hot_2026-02-02.json
└── hot_2026-02-03.json
```

## 依赖

- `node` - Node.js 运行环境
- `axios` - HTTP 请求库（已安装）

## 限制

⚠️ 注意：
- 普通会员每日 100 次调用限制
- 热搜数据每分钟更新一次
- 数据来源于天行数据 API

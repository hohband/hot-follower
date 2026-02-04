# Douyin Hot Search Monitor 🎵

抖音热榜监控系统 - 自动监控、分析、报告

## 功能特性

- 🔍 **每小时监控** - 自动获取抖音热榜数据
- 📊 **数据分析** - 每天汇总分析热榜变化
- 📧 **邮件报告** - HTML 格式精美报告
- 📈 **趋势追踪** - 持续上榜、热度上升/下降

## 快速开始

### 1. 安装依赖

```bash
cd skills/douyin
./install.sh
```

### 2. 配置环境变量

```bash
cp .env.example .env
nano .env
```

配置以下内容：
- `TIANAPI_KEY` - 天行数据 API Key
- `EMAIL_*` - 邮件发送配置

### 3. 手动测试

```bash
# 测试获取热榜
node scripts/hot_summary_tianapi.js

# 测试邮件发送
node scripts/test_email.js
```

### 4. 设置定时任务

```bash
# 添加 cron 任务
crontab crontab.conf
```

## 目录结构

```
skills/douyin/
├── scripts/           # 脚本文件
│   ├── monitor_hot_hourly.js   # 每小时监控
│   ├── analyze_daily_hot.js    # 每日分析
│   ├── email_report.js         # 邮件报告
│   └── scheduler.js           # 任务调度器
├── lib/               # 库文件
│   └── tianapi.js     # 天行数据 API 封装
├── data/              # 数据存储
│   └── hot/           # 热榜数据
├── .env.example       # 环境变量示例
├── .env              # 环境变量（不提交）
└── crontab.conf      # 定时任务配置
```

## 使用说明

### 获取热搜摘要

```bash
node scripts/hot_summary_tianapi.js [数量]
```

### 分析热搜榜

```bash
node scripts/analyze_hot_tianapi.js
```

### 搜索特定话题

```bash
node scripts/search_hot_tianapi.js "关键词"
```

### 保存热搜数据

```bash
node scripts/monitor_hot_tianapi.js
```

### 对比历史热搜

```bash
node scripts/compare_hot_tianapi.js 2026-02-02 2026-02-03
```

## 定时任务

```bash
# 每小时执行监控
0 * * * * cd /root/clawd/skills/douyin && node scripts/monitor_hot_hourly.js

# 每天12点执行分析和发送邮件
0 12 * * * cd /root/clawd/skills/douyin && node scripts/scheduler.js
```

## 邮件报告内容

1. 📊 数据概览 - 当天的数据点数和热搜词数
2. 🏆 当前热搜 Top 10
3. 📈 持续上榜 Top 10
4. 🔥 热度上升 Top 10
5. 📉 热度下降 Top 10

## 数据来源

- **天行数据 (TianAPI)** - 抖音热搜榜接口
- API 文档：https://www.tianapi.com/apiview/155

## 许可证

MIT License

---

**开发者**: 招财 💰

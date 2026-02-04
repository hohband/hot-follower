# 抖音热榜监控系统

自动监控抖音热榜，每天中午12点汇总分析并发送邮件报告。

---

## 📋 功能

1. **每小时监控** - 自动获取并保存抖音热榜数据
2. **变化检测** - 检测新上榜和跌出榜的热搜
3. **每日分析** - 每天中午12点汇总分析热榜
4. **邮件发送** - 自动发送 HTML 格式的分析报告

---

## 📦 安装

```bash
cd /root/clawd/skills/douyin
./install.sh
```

---

## ⚙️ 配置

### 1. 编辑环境变量

```bash
cd /root/clawd/skills/douyin
nano .env
```

### 2. 配置邮件信息

```bash
# QQ邮箱示例
EMAIL_HOST=smtp.qq.com
EMAIL_PORT=587
EMAIL_USER=your_email@qq.com
EMAIL_PASS=your_authorization_code  # 不是密码！
EMAIL_FROM=your_email@qq.com
EMAIL_TO=receiver_email@qq.com
```

**获取QQ邮箱授权码：**
1. 登录 QQ邮箱网页版
2. 设置 → 账户 → POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务
3. 生成授权码（不是邮箱密码！）

---

## 🚀 使用

### 手动测试

```bash
# 测试监控
node scripts/monitor_hot_hourly.js

# 测试分析
node scripts/analyze_daily_hot.js

# 测试调度器（包含分析+邮件）
node scripts/scheduler.js
```

### 自动运行

已配置 cron 定时任务：

- **每小时的第0分钟** - 执行监控
- **每天12:00** - 执行分析和发送邮件

### 查看 cron 任务

```bash
crontab -l
```

### 查看日志

```bash
# 监控日志
tail -f /var/log/douyin-monitor.log

# 调度器日志
tail -f /var/log/douyin-scheduler.log
```

---

## 📂 文件结构

```
douyin/
├── scripts/
│   ├── monitor_hot_hourly.js     # 每小时监控
│   ├── analyze_daily_hot.js      # 每日分析
│   ├── email_report.js           # 邮件发送
│   └── scheduler.js              # 任务调度器
├── data/
│   └── hot/                    # 热榜数据存储
│       ├── hot_2026-02-03_00.json
│       ├── hot_2026-02-03_01.json
│       ├── changes_2026-02-03.json
│       └── report_2026-02-03.json
├── .env                       # 环境变量配置
├── .env.example               # 配置示例
├── install.sh                 # 安装脚本
└── README_MONITOR.md           # 本文档
```

---

## 📊 邮件报告内容

1. **数据概览** - 当天的数据点数和热搜词数
2. **当前热搜 Top 10** - 最新热榜前10
3. **持续上榜 Top 10** - 全天持续上榜的热搜
4. **热度上升 Top 10** - 热度增长最快的热搜
5. **热度下降 Top 10** - 热度下降最快的热搜

---

## 🔧 故障排查

### 问题1: 邮件发送失败

检查 .env 配置是否正确，特别是 EMAIL_PASS（应该是授权码，不是密码）

### 问题2: cron 没有执行

```bash
# 查看 cron 服务状态
systemctl status cron

# 重启 cron
systemctl restart cron
```

### 问题3: 脚本执行出错

查看日志文件：
```bash
cat /var/log/douyin-monitor.log
cat /var/log/douyin-scheduler.log
```

---

## 📝 卸载

```bash
# 移除 cron 任务
crontab -l | grep -v douyin | crontab -

# 移除文件
rm -rf /root/clawd/skills/douyin/data
```

---

*创建时间：2026-02-03*

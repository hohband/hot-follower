# 抖音热搜技能开发完成报告

## 项目概述

**技能名称**: Douyin Hot Search 🎵
**版本**: 2.0.0
**开发周期**: 2026-02-03
**开发者**: 招财
**数据源**: 天行数据 (TianAPI)

---

## 数据来源

**天行数据抖音热搜榜 API**
- 接口地址：https://www.tianapi.com/apiview/155
- API Key: 10f6d32d4e511b6334bc11925184128a
- 功能：实时获取 50 条抖音热搜话题及热度排名
- 标签说明：1=新(🆕), 2=荐(⭐), 3=热(🔥)

---

## 完成情况

### ✅ 核心功能 (100%)

#### 1. 热搜获取
- [x] 获取完整热搜榜（50 条）
- [x] 热搜摘要显示
- [x] 搜索特定话题

#### 2. 热搜分析
- [x] 热度统计（平均/最高/最低）
- [x] 标签分布统计
- [x] 热度等级分类
- [x] 话题分类（基于关键词）

#### 3. 数据监控
- [x] 保存热搜数据到本地
- [x] 检测新增/跌出热搜
- [x] 显示热搜变化

#### 4. 数据对比
- [x] 对比不同日期的热搜
- [x] 显示排名变化
- [x] Top 10 对比视图

---

## 脚本清单

总共 7 个脚本：

| 序号 | 脚本 | 功能 |
|------|------|------|
| 1 | hot_summary_tianapi.js | 获取热搜榜摘要 |
| 2 | get_hot_tianapi.js | 获取完整热搜榜 |
| 3 | analyze_hot_tianapi.js | 分析热搜榜数据 |
| 4 | search_hot_tianapi.js | 搜索特定话题 |
| 5 | monitor_hot_tianapi.js | 保存热搜数据 |
| 6 | compare_hot_tianapi.js | 对比历史热搜 |
| 7 | parse_video_tianapi.js | 解析抖音视频（待API可用）|

---

## 核心功能详解

### 1. 热搜获取

#### 热搜摘要 (`hot_summary_tianapi.js`)
```bash
./scripts/hot_summary_tianapi.js [count]
```
- 显示简洁的热搜榜摘要
- 自定义显示数量
- 包含热度统计

#### 完整热搜 (`get_hot_tianapi.js`)
```bash
./scripts/get_hot_tianapi.js
```
- 显示全部 50 条热搜
- 包含标签和热度值

#### 搜索话题 (`search_hot_tianapi.js`)
```bash
./scripts/search_hot_tianapi.js <keyword>
```
- 在热搜榜中搜索关键词
- 显示匹配结果
- 如无匹配则显示 Top 10

---

### 2. 热搜分析

#### 综合分析 (`analyze_hot_tianapi.js`)
```bash
./scripts/analyze_hot_tianapi.js
```

**输出内容：**
- 总体统计（热搜数量、平均/最高/最低热度）
- 标签分布（新/荐/热）
- 热度等级（超热/热门/普通）
- Top 5 热搜
- 话题分类（基于关键词）

---

### 3. 数据监控

#### 保存热搜 (`monitor_hot_tianapi.js`)
```bash
./scripts/monitor_hot_tianapi.js [output_file]
```

**功能：**
- 保存当前热搜到 JSON 文件
- 自动创建 `data/hot/` 目录
- 检测新增/跌出热搜
- 显示当前热搜 Top 5

**数据格式：**
```json
{
  "timestamp": "2026-02-03T11:00:00.000Z",
  "date": "2026-02-03",
  "time": "19:00:00",
  "total": 50,
  "list": [...]
}
```

---

### 4. 数据对比

#### 历史对比 (`compare_hot_tianapi.js`)
```bash
./scripts/compare_hot_tianapi.js [date1] [date2]
```

**对比内容：**
- 新上榜话题
- 跌出榜话题
- 排名上升最多
- 排名下降最多
- Top 10 对比视图

---

## 技术特点

1. **模块化设计**
   - `lib/tianapi.js` - API 封装类
   - 各脚本独立运行
   - 易于扩展

2. **数据持久化**
   - JSON 格式存储
   - 日期命名文件
   - 便于历史分析

3. **智能分析**
   - 基于关键词的话题分类
   - 热度等级划分
   - 排名变化追踪

4. **用户友好**
   - 清晰的输出格式
   - emoji 图标增强可读性
   - 详细的错误提示

---

## 文件结构

```
douyin/
├── SKILL.md                      # 技能规范文档
├── TIANAPI.md                    # 天行数据集成说明
├── DEVELOPMENT.md                # 开发文档（本文件）
├── lib/
│   ├── api.js                    # 抖音开放平台 API 封装
│   └── tianapi.js                # 天行数据 API 封装
├── scripts/
│   ├── hot_summary_tianapi.js     # 热搜摘要
│   ├── get_hot_tianapi.js        # 获取热搜榜
│   ├── analyze_hot_tianapi.js    # 分析热搜榜
│   ├── search_hot_tianapi.js     # 搜索话题
│   ├── monitor_hot_tianapi.js    # 保存热搜数据
│   ├── compare_hot_tianapi.js    # 对比历史热搜
│   └── parse_video_tianapi.js    # 解析视频（待API）
└── data/
    └── hot/                      # 热搜数据存储
```

---

## 使用示例

### 获取热搜摘要
```bash
export TIANAPI_KEY="10f6d32d4e511b6334bc11925184128a"
/root/clawd/skills/douyin/scripts/hot_summary_tianapi.js 15
```

### 分析热搜榜
```bash
./scripts/analyze_hot_tianapi.js
```

### 搜索话题
```bash
./scripts/search_hot_tianapi.js "立春"
```

### 保存热搜数据
```bash
./scripts/monitor_hot_tianapi.js
```

### 对比历史数据
```bash
# 先保存数据
./scripts/monitor_hot_tianapi.js

# 次日对比
./scripts/compare_hot_tianapi.js 2026-02-02 2026-02-03
```

---

## API 调用示例

### 获取热搜榜
```javascript
const TianAPI = require('../lib/tianapi');
const api = new TianAPI(process.env.TIANAPI_KEY);

const hotList = await api.getDouyinHot();
console.log(hotList); // { list: [...] }
```

### 搜索话题
```javascript
const hotList = await api.getDouyinHot();
const matches = hotList.list.filter(item =>
  item.word.includes('立春')
);
```

---

## 定时任务建议

### 每小时监控热搜
```bash
# 添加到 crontab
0 * * * * cd /root/clawd/skills/douyin && ./scripts/monitor_hot_tianapi.js >> /var/log/douyin-hot.log 2>&1
```

### 每日分析热搜
```bash
# 每天晚上 10 点分析
0 22 * * * cd /root/clawd/skills/douyin && ./scripts/analyze_hot_tianapi.js
```

---

## 数据可视化建议

配合 `chart-image` 技能生成图表：

1. 热度趋势图
2. 话题分类饼图
3. 排名变化折线图
4. 标签分布柱状图

---

## 限制与注意事项

⚠️ **注意事项**：
1. 天行数据只有热搜榜这一个抖音接口
2. 普通会员每日 100 次调用限制
3. 热搜数据约每分钟更新一次
4. API Key 已配置在服务器

⚠️ **不可用功能**：
- 视频解析（接口不存在）
- 用户信息（接口不存在）
- 用户作品（接口不存在）
- 评论数据（接口不存在）

---

## 后续扩展方向

### 短期
1. 配合 chart-image 生成可视化图表
2. 添加微信/邮件通知（重要热搜变化）
3. 集成到 ClawFlows 工作流

### 长期
1. 对接其他数据源（如开放平台API）
2. 添加更多分析维度
3. 机器学习预测趋势

---

## 发布准备

✅ 代码完成
✅ 文档完整
✅ 示例可用
✅ API Key 已配置
✅ 测试通过

---

**开发完成时间**: 2026-02-03
**开发者**: 招财 💰
**项目状态**: ✅ 已完成，可投入使用

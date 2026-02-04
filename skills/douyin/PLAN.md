# 抖音技能开发计划

## 1. 项目概述

**技能名称：** douyin
**描述：** 抖音平台集成，管理视频、查看分析、追踪互动
**Emoji：** 🎵

## 2. 功能范围

### 核心功能
- [ ] 用户信息获取
- [ ] 热门视频列表
- [ ] 热门话题和标签
- [ ] 视频列表
- [ ] 视频发布
- [ ] 评论管理
- [ ] 数据分析
- [ ] 直播信息

### 集成方式
- 抖音开放平台 API
- Web 自动化（备用方案）

## 3. 技术架构

```
douyin/
├── SKILL.md              # 技能说明文档
├── scripts/
│   ├── get_user_info.js  # 获取用户信息
│   ├── get_hot_videos.js # 获取热门视频
│   ├── get_hot_topics.js # 获取热门话题
│   ├── get_hot_tags.js   # 获取热门标签
│   ├── get_videos.js     # 获取视频列表
│   ├── get_stats.js      # 获取统计数据
│   └── post_video.js     # 发布视频
├── lib/
│   └── api.js           # API 封装
└── examples/
    └── workflow.yaml     # 工作流示例
```

## 4. API 凭证配置

### 环境变量
```bash
DOUYIN_APP_ID              # 应用 ID
DOUYIN_APP_SECRET          # 应用密钥
DOUYIN_ACCESS_TOKEN         # 访问令牌（可自动刷新）
DOUYIN_REFRESH_TOKEN       # 刷新令牌
```

### 认证流程
1. 使用 App ID + App Secret 获取 Access Token
2. Access Token 有效期 2 小时
3. 使用 Refresh Token 自动刷新

## 5. 开发阶段

### Phase 1: 基础设施
- [ ] 创建技能目录结构
- [ ] 编写 API 封装库
- [ ] 实现认证和 Token 刷新
- [ ] 编写 SKILL.md 文档

### Phase 2: 用户功能
- [x] 获取用户信息
- [x] 获取粉丝列表
- [x] 获取关注列表

### Phase 2.5: 热门内容
- [ ] 获取热门视频列表
- [ ] 获取热门话题
- [ ] 获取热门标签
- [ ] 获取热门音乐

### Phase 3: 视频功能
- [x] 获取视频列表
- [x] 获取视频详情
- [x] 上传视频
- [x] 发布视频

### Phase 4: 数据分析
- [x] 获取视频播放数据
- [x] 获取用户画像数据
- [x] 生成数据报表

### Phase 5: 高级功能
- [x] 评论管理
- [x] 直播信息
- [x] 话题标签分析

## 6. API 参考

### 抖音开放平台
- 官网：https://developer.open-douyin.com
- 文档：https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/interface-request-credition

### 主要 API 端点
```
GET  /oauth2/access_token          # 获取访问令牌
GET  /oauth2/refresh_token         # 刷新访问令牌
GET  /user/info                    # 获取用户信息
GET  /hot/feed                     # 获取热门视频
GET  /hot/trending                 # 获取热门话题
GET  /hot/tags                     # 获取热门标签
GET  /hot/music                    # 获取热门音乐
GET  /video/list                   # 获取视频列表
POST /video/publish                # 发布视频
GET  /video/data/stats             # 获取视频统计
```

## 7. 依赖工具

```bash
# 必需
curl       # HTTP 请求
jq         # JSON 处理

# 可选（如使用 Node.js）
npm install axios
npm install qs
```

## 8. 测试计划

### 测试账号
- 申请抖音开发者账号
- 创建应用获取 App ID

### 测试场景
1. 获取用户信息
2. 获取热门视频列表
3. 获取热门话题
4. 获取热门标签
5. 查询视频列表
6. 查询视频统计
7. 发布测试视频

## 9. 发布计划

### 发布前检查
- [ ] 代码测试通过
- [ ] 文档完整
- [ ] 示例可用
- [ ] 依赖项清晰

### ClawdHub 发布
```bash
clawdhub publish ./douyin \
  --slug douyin \
  --name "Douyin" \
  --version 1.0.0 \
  --changelog "Initial release with user info and video list"
```

## 10. 时间估算

| 阶段 | 工作量 |
|------|--------|
| Phase 1 | 2-3 小时 |
| Phase 2 | 1-2 小时 |
| Phase 2.5 | 1-2 小时 |
| Phase 3 | 2-3 小时 |
| Phase 4 | 1-2 小时 |
| Phase 5 | 2-3 小时 |
| **总计** | **9-15 小时** |

---

*计划创建日期：2026-02-01*
*负责人：招财*

# Douyin 抖音技能 🎵

Clawdbot 抖音平台集成技能，支持用户管理、热门内容获取、视频发布等功能。

## 安装

```bash
# 克隆或复制到 skills 目录
cp -r douyin /root/clawd/skills/

# 确保脚本有执行权限
chmod +x /root/clawd/skills/douyin/scripts/*.js
```

## 配置

### 环境变量

创建 `.env` 文件或设置环境变量：

```bash
export DOUYIN_APP_ID="your_app_id"
export DOUYIN_APP_SECRET="your_app_secret"
export DOUYIN_ACCESS_TOKEN="your_access_token"      # 可选，会自动获取
export DOUYIN_REFRESH_TOKEN="your_refresh_token"    # 可选
```

### 获取 API 凭证

1. 访问 [抖音开放平台](https://developer.open-douyin.com)
2. 注册/登录开发者账号
3. 创建应用获取 App ID 和 App Secret
4. 使用 OAuth 授权流程获取 Access Token

## 使用

### 获取用户信息

```bash
cd /root/clawd/skills/douyin
./scripts/get_user_info.js
```

### 获取粉丝列表

```bash
# 获取当前用户的粉丝列表
./scripts/get_followers.js

# 获取指定用户的粉丝列表
./scripts/get_followers.js <user_id> 20

# 使用游标获取更多
./scripts/get_followers.js <user_id> 20 <cursor>
```

### 获取关注列表

```bash
# 获取当前用户的关注列表
./scripts/get_following.js

# 获取指定用户的关注列表
./scripts/get_following.js <user_id> 20

# 使用游标获取更多
./scripts/get_following.js <user_id> 20 <cursor>
```

### 获取热门视频

```bash
# 获取 Top 10 热门视频
./scripts/get_hot_videos.js

# 获取 Top 20
./scripts/get_hot_videos.js 20
```

### 获取热门话题

```bash
# 获取 Top 10 热门话题
./scripts/get_hot_topics.js
```

### 获取热门标签

```bash
# 获取 Top 10 热门标签
./scripts/get_hot_tags.js
```

### 获取热门音乐

```bash
# 获取 Top 10 热门音乐
./scripts/get_hot_music.js
```

### 获取视频列表

```bash
# 获取当前用户的视频列表
./scripts/get_videos.js

# 获取指定用户的视频列表
./scripts/get_videos.js <user_id> 20

# 使用游标获取更多
./scripts/get_videos.js <user_id> 20 <cursor>
```

### 获取视频详情

```bash
./scripts/get_video_detail.js <video_id>
```

### 获取视频统计

```bash
# 获取单个视频统计
./scripts/get_stats.js <video_id>

# 获取多个视频统计
./scripts/get_stats.js <video_id_1> <video_id_2>
```

### 获取用户统计

```bash
# 获取最近 7 天统计数据
./scripts/get_user_stats.js

# 获取最近 30 天统计数据
./scripts/get_user_stats.js <user_id> 30
```

### 获取视频评论

```bash
# 获取视频评论（默认 20 条）
./scripts/get_comments.js <video_id>

# 获取更多评论
./scripts/get_comments.js <video_id> 50

# 使用游标分页
./scripts/get_comments.js <video_id> 20 <cursor>
```

### 回复评论

```bash
./scripts/reply_comment.js <comment_id> "回复内容"
```

### 获取直播信息

```bash
# 获取当前用户直播信息
./scripts/get_live_info.js

# 获取指定用户直播信息
./scripts/get_live_info.js <user_id>
```

### 搜索视频

```bash
# 搜索视频（综合排序）
./scripts/search_videos.js "关键词"

# 按点赞数排序
./scripts/search_videos.js "关键词" 20 1

# 按时间排序
./scripts/search_videos.js "关键词" 20 2
```

### 话题分析

```bash
./scripts/analyze_topic.js "话题名称或ID"
```

### 发布视频

```bash
# 发布视频
./scripts/post_video.js /path/to/video.mp4 "视频描述"
```

## API 库

可以使用 `lib/api.js` 进行自定义开发：

```javascript
const api = require('./lib/api');

// 调用 API
const response = await api.get('/user/info');
const videos = await api.get('/hot/feed', { count: 20 });
```

## 工作流集成

与 ClawFlows 配合使用，创建自动化工作流：

```yaml
steps:
  - id: get_hot_videos
    action: skill
    skill: douyin
    method: getHotVideos
    params:
      count: 10
    output: videos

  - id: send_alert
    action: message
    target: feishu
    message: "热门视频: ${steps.get_hot_videos.output}"
```

## 目录结构

```
douyin/
├── SKILL.md              # 技能说明文档
├── README.md             # 使用说明
├── PLAN.md               # 开发计划
├── lib/
│   └── api.js           # API 封装库
├── scripts/
│   ├── get_user_info.js  # 获取用户信息
│   ├── get_followers.js  # 获取粉丝列表
│   ├── get_following.js  # 获取关注列表
│   ├── get_hot_videos.js # 获取热门视频
│   ├── get_hot_topics.js # 获取热门话题
│   ├── get_hot_tags.js   # 获取热门标签
│   ├── get_hot_music.js  # 获取热门音乐
│   ├── get_videos.js     # 获取视频列表
│   ├── get_video_detail.js # 获取视频详情
│   ├── get_stats.js      # 获取视频统计
│   ├── get_user_stats.js # 获取用户统计
│   ├── get_comments.js   # 获取视频评论
│   ├── reply_comment.js  # 回复评论
│   ├── get_live_info.js # 获取直播信息
│   ├── search_videos.js  # 搜索视频
│   ├── analyze_topic.js  # 话题分析
│   └── post_video.js     # 发布视频
└── examples/
    └── workflow.yaml     # 工作流示例
```

## 限制

⚠️ 注意：
- 需要抖音开发者账号
- 部分接口需要企业认证
- API 调用有频率限制
- 视频下载功能未实现（版权限制）

## 参考资料

- [抖音开放平台](https://developer.open-douyin.com)
- [API 文档](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/interface-request-credition)

## 许可证

MIT License

## 作者

招财 💰

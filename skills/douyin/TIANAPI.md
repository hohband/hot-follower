# 天行数据 (TianAPI) 快速开始

## 已完成集成

✅ 创建 `lib/tianapi.js` - API 封装类
✅ 创建 `scripts/get_hot_tianapi.js` - 获取抖音热搜榜
✅ 创建 `scripts/parse_video_tianapi.js` - 解析抖音视频

---

## 快速使用

### 1. 获取 API Key

1. 访问 https://www.tianapi.com
2. 注册/登录账号
3. 进入控制台
4. 创建应用获取 API Key
5. 申请抖音热搜榜接口: https://www.tianapi.com/apiview/155

### 2. 设置环境变量

```bash
export TIANAPI_KEY="your_api_key_here"
```

### 3. 获取抖音热搜榜

```bash
cd /root/clawd/skills/douyin
./scripts/get_hot_tianapi.js
```

**输出示例：**
```
🔥 正在获取抖音热搜榜...

✅ 成功获取 50 条热搜

01 🔥 赵丽颖张慧雯斗舞
    热度: 9,023,742

02 🆕 春节档票房破亿
    热度: 8,543,210

03 ⭐ 科技新突破
    热度: 7,654,321
...
```

### 4. 解析抖音视频

```bash
./scripts/parse_video_tianapi.js https://v.douyin.com/xxxxx
```

---

## API 返回格式

### 抖音热搜榜
```json
{
  "code": 200,
  "msg": "success",
  "result": {
    "list": [
      {
        "word": "热搜话题",
        "label": 3,
        "hotindex": 9023742
      }
    ]
  }
}
```

**标签说明：**
- `1` = 新 (🆕)
- `2` = 荐 (⭐)
- `3` = 热 (🔥)

---

## 集成到现有脚本

### 在其他脚本中使用 TianAPI

```javascript
const TianAPI = require('../lib/tianapi');

const api = new TianAPI(process.env.TIANAPI_KEY);

// 获取热搜榜
const hotList = await api.getDouyinHot();

// 解析视频
const videoInfo = await api.parseDouyinVideo(url);

// 获取用户信息
const userInfo = await api.getDouyinUser(userId);

// 获取用户作品
const works = await api.getDouyinWork(userId, 20, 1);

// 获取评论
const comments = await api.getDouyinComment(itemId, 20);
```

---

## 配置持久化

### 添加到 ~/.bashrc
```bash
echo 'export TIANAPI_KEY="your_api_key"' >> ~/.bashrc
source ~/.bashrc
```

### 添加到 Gateway 配置
通过 `clawdbot gateway config.get` 查看配置，然后使用 `config.patch` 添加环境变量。

---

## 会员额度

| 会员等级 | 免费接口数 | 每日调用量 | 价格 |
|---------|----------|----------|------|
| 普通会员 | 10个 | 100次 | 免费 |
| 高级会员 | 不限 | 1万次 | 169元/年 |
| 黄金会员 | 不限 | 50万次 | 529元/年 |
| 钻石会员 | 不限 | 不限 | 1699元/年 |

---

## 后续扩展

### 可添加的脚本
- `get_user_tianapi.js` - 获取用户信息
- `get_works_tianapi.js` - 获取用户作品
- `get_comments_tianapi.js` - 获取视频评论

### 集成到 MCP
TianAPI 支持 MCP 配置，可以作为 MCP 服务器使用。

---

*创建时间: 2026-02-03*

#!/usr/bin/env node
/**
 * 获取直播信息
 */

const api = require('../lib/api');

async function main() {
  try {
    const userId = process.argv[2] || process.env.DOUYIN_USER_ID;

    console.log(`🎵 获取直播信息...\n`);

    const params = {};
    if (userId) params.user_id = userId;

    const response = await api.get('/live/info', params);

    if (response.data) {
      const liveInfo = response.data;
      console.log('✅ 直播信息：');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (liveInfo.status === 'live') {
        console.log(`状态: 🔴 直播中`);
        console.log(`主播: ${liveInfo.anchor?.nickname || 'N/A'}`);
        console.log(`标题: ${liveInfo.title || 'N/A'}`);
        console.log(`观看人数: ${liveInfo.viewer_count || 0}`);
        console.log(`点赞数: ${liveInfo.like_count || 0}`);
        console.log(`开始时间: ${liveInfo.start_time || 'N/A'}`);
        console.log(`直播封面: ${liveInfo.cover_url || 'N/A'}`);
      } else if (liveInfo.status === 'offline') {
        console.log(`状态: ⚫ 未直播`);
        console.log(`主播: ${liveInfo.anchor?.nickname || 'N/A'}`);
        if (liveInfo.last_live_time) {
          console.log(`上次直播: ${liveInfo.last_live_time}`);
        }
      } else {
        console.log(`状态: ${liveInfo.status || 'N/A'}`);
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(liveInfo, null, 2));
    } else {
      console.log('❌ 获取直播信息失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();

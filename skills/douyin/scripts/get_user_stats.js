#!/usr/bin/env node
/**
 * 获取用户统计数据
 */

const api = require('../lib/api');

async function main() {
  try {
    const userId = process.argv[2] || process.env.DOUYIN_USER_ID;
    const days = parseInt(process.argv[3]) || 7;

    console.log(`🎵 获取用户统计数据 (最近 ${days} 天)...\n`);

    const params = {
      days: days,
    };
    if (userId) params.user_id = userId;

    const response = await api.get('/user/data/stats', params);

    if (response.data) {
      const stats = response.data;
      console.log('✅ 用户统计数据：');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (stats.total_stats) {
        console.log(`\n总数据：`);
        console.log(`  累计播放: ${stats.total_stats.play_count || 0}`);
        console.log(`  累计点赞: ${stats.total_stats.digg_count || 0}`);
        console.log(`  累计评论: ${stats.total_stats.comment_count || 0}`);
        console.log(`  累计分享: ${stats.total_stats.share_count || 0}`);
      }
      
      if (stats.daily_stats && stats.daily_stats.length > 0) {
        console.log(`\n每日数据：`);
        stats.daily_stats.forEach((day, index) => {
          console.log(`\n  Day ${index + 1}:`);
          console.log(`    日期: ${day.date || 'N/A'}`);
          console.log(`    播放: ${day.play_count || 0}`);
          console.log(`    点赞: ${day.digg_count || 0}`);
          console.log(`    评论: ${day.comment_count || 0}`);
          console.log(`    分享: ${day.share_count || 0}`);
        });
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(stats, null, 2));
    } else {
      console.log('❌ 获取用户统计失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();

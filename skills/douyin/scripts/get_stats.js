#!/usr/bin/env node
/**
 * 获取视频统计
 */

const api = require('../lib/api');

async function main() {
  try {
    const videoIds = process.argv.slice(2);

    if (videoIds.length === 0) {
      console.log('用法: node get_stats.js <video_id_1> [video_id_2] ...\n');
      process.exit(1);
    }

    console.log(`🎵 获取视频统计 (${videoIds.length} 个视频)...\n`);

    const params = {
      item_ids: videoIds.join(','),
    };

    const response = await api.get('/video/data/stats', params);

    if (response.data && response.data.stats_list) {
      const stats = response.data.stats_list;
      console.log(`✅ 获取到 ${stats.length} 个视频的统计数据\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      stats.forEach((stat, index) => {
        console.log(`\n#${index + 1} - 视频: ${stat.item_id}`);
        console.log(`播放量: ${stat.play_count || 0}`);
        console.log(`点赞数: ${stat.digg_count || 0}`);
        console.log(`评论数: ${stat.comment_count || 0}`);
        console.log(`分享数: ${stat.share_count || 0}`);
        console.log(`收藏数: ${stat.collect_count || 0}`);
      });

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(stats, null, 2));
    } else {
      console.log('❌ 获取视频统计失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();

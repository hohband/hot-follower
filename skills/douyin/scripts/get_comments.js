#!/usr/bin/env node
/**
 * 获取视频评论
 */

const api = require('../lib/api');

async function main() {
  try {
    const videoId = process.argv[2];
    const count = parseInt(process.argv[3]) || 20;
    const cursor = process.argv[4];

    if (!videoId) {
      console.log('用法: node get_comments.js <video_id> [count] [cursor]\n');
      process.exit(1);
    }

    console.log(`🎵 获取视频评论 (Video: ${videoId}, Top ${count})...\n`);

    const params = {
      item_id: videoId,
      count: count,
    };
    if (cursor) params.cursor = cursor;

    const response = await api.get('/video/comments', params);

    if (response.data && response.data.comments) {
      const comments = response.data.comments;
      console.log(`✅ 找到 ${comments.length} 条评论\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      comments.forEach((comment, index) => {
        console.log(`\n#${index + 1}`);
        console.log(`评论ID: ${comment.cid}`);
        console.log(`用户: ${comment.user?.nickname || 'N/A'}`);
        console.log(`内容: ${comment.text || 'N/A'}`);
        console.log(`点赞: ${comment.digg_count || 0}`);
        console.log(`回复: ${comment.reply_comment_total || 0}`);
        console.log(`时间: ${comment.create_time || 'N/A'}`);
      });

      if (response.data.has_more) {
        console.log(`\n还有更多评论，游标: ${response.data.cursor}`);
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(comments, null, 2));
    } else {
      console.log('❌ 获取评论失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();

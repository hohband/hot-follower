#!/usr/bin/env node
/**
 * 回复评论
 */

const api = require('../lib/api');

async function main() {
  try {
    const commentId = process.argv[2];
    const replyText = process.argv[3];

    if (!commentId || !replyText) {
      console.log('用法: node reply_comment.js <comment_id> <reply_text>\n');
      process.exit(1);
    }

    console.log(`🎵 回复评论: ${commentId}\n`);
    console.log(`回复内容: ${replyText}\n`);

    const response = await api.post('/video/comment/reply', {
      comment_id: commentId,
      text: replyText,
    });

    if (response.data && response.data.comment) {
      const comment = response.data.comment;
      console.log('✅ 回复成功！');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`评论ID: ${comment.cid}`);
      console.log(`内容: ${comment.text}`);
      console.log(`点赞: ${comment.digg_count || 0}`);
      console.log(`时间: ${comment.create_time}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      console.log('❌ 回复失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();

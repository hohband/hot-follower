#!/usr/bin/env node
/**
 * 获取关注列表
 */

const api = require('../lib/api');

async function main() {
  try {
    const userId = process.argv[2] || process.env.DOUYIN_USER_ID;
    const count = parseInt(process.argv[3]) || 20;
    const cursor = process.argv[4];

    console.log(`🎵 获取关注列表...\n`);

    const params = {
      count: count,
    };
    if (userId) params.user_id = userId;
    if (cursor) params.cursor = cursor;

    const response = await api.get('/user/following', params);

    if (response.data && response.data.user_list) {
      const following = response.data.user_list;
      console.log(`✅ 找到 ${following.length} 个关注\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      following.forEach((user, index) => {
        console.log(`\n#${index + 1}`);
        console.log(`用户ID: ${user.uid || user.open_id}`);
        console.log(`昵称: ${user.nickname || 'N/A'}`);
        console.log(`头像: ${user.avatar_url || 'N/A'}`);
        console.log(`简介: ${user.signature || 'N/A'}`);
        if (user.extra_info) {
          console.log(`粉丝数: ${user.extra_info.followers_count || 0}`);
          console.log(`关注数: ${user.extra_info.following_count || 0}`);
          console.log(`获赞数: ${user.extra_info.aweme_count || 0}`);
        }
      });

      if (response.data.has_more) {
        console.log(`\n还有更多关注，游标: ${response.data.cursor}`);
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(following, null, 2));
    } else {
      console.log('❌ 获取关注列表失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();

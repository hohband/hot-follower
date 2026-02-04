#!/usr/bin/env node
/**
 * 获取用户信息
 */

const api = require('../lib/api');

async function main() {
  try {
    console.log('🎵 获取用户信息...\n');

    const response = await api.get('/user/info');

    if (response.data) {
      const user = response.data;
      console.log('✅ 用户信息：');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`用户ID: ${user.uid || user.open_id}`);
      console.log(`昵称: ${user.nickname || 'N/A'}`);
      console.log(`头像: ${user.avatar_url || 'N/A'}`);
      console.log(`粉丝数: ${user.followers_count || 0}`);
      console.log(`关注数: ${user.following_count || 0}`);
      console.log(`获赞数: ${user.aweme_count || 0}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log(JSON.stringify(user, null, 2));
    } else {
      console.log('❌ 获取用户信息失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();

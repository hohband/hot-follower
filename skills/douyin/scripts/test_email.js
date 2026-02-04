#!/usr/bin/env node

/**
 * 测试邮件发送
 */

require('dotenv').config({ path: '/root/clawd/skills/douyin/.env' });
const { sendReport } = require('./email_report');

const now = new Date();
const testReport = {
  date: now.toISOString().slice(0, 10),
  summary: {
    data_points: 24,
    total_unique_words: 150
  },
  top_persistent: [],
  hot_rising: [],
  hot_falling: [],
  current_top10: [
    { rank: 1, word: '测试热搜1', hotindex: '10,000,000', label: 3 },
    { rank: 2, word: '测试热搜2', hotindex: '9,000,000', label: 1 },
    { rank: 3, word: '测试热搜3', hotindex: '8,000,000', label: 0 },
  ]
};

console.log(`[${now.toISOString()}] 📧 测试邮件发送...\n`);
console.log('请确认以下配置正确：');
console.log(`   发件人: ${process.env.EMAIL_FROM}`);
console.log(`   收件人: ${process.env.EMAIL_TO}`);
console.log(`   SMTP: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}\n`);

sendReport(testReport);

#!/usr/bin/env node

/**
 * 邮件发送工具
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const nodemailer = require('nodemailer');

// 邮件配置
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.qq.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  user: process.env.EMAIL_USER || '',
  pass: process.env.EMAIL_PASS || '',
  from: process.env.EMAIL_FROM || process.env.EMAIL_USER || ''
};

const toEmail = process.env.EMAIL_TO || '';

// 创建邮件客户端
const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
});

async function sendReport(reportData) {
  try {
    const html = generateHtmlReport(reportData);

    const mailOptions = {
      from: emailConfig.from,
      to: toEmail,
      subject: `📊 抖音热榜日报 - ${reportData.date}`,
      html: html
    };

    console.log(`[${new Date().toISOString()}] 📧 正在发送邮件...`);

    const info = await transporter.sendMail(mailOptions);

    console.log(`[${new Date().toISOString()}] ✅ 邮件发送成功!`);
    console.log(`[${new Date().toISOString()}   Message ID: ${info.messageId}\n`);

  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ 邮件发送失败:`, error.message);
    process.exit(1);
  }
}

function generateHtmlReport(reportData) {
  const { date, top_persistent, hot_rising, hot_falling, current_top10, summary } = reportData;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 28px; }
    .header p { margin: 10px 0 0 0; opacity: 0.9; }
    .section { background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px; }
    .section h2 { color: #667eea; margin-top: 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
    .summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .summary-item { background: white; padding: 15px; border-radius: 8px; text-align: center; }
    .summary-number { font-size: 32px; font-weight: bold; color: #667eea; }
    .summary-label { color: #666; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #dee2e6; }
    th { background: #667eea; color: white; font-weight: bold; }
    tr:nth-child(even) { background: #f8f9fa; }
    .hot-rise { color: #28a745; font-weight: bold; }
    .hot-fall { color: #dc3545; font-weight: bold; }
    .label { padding: 2px 8px; border-radius: 4px; font-size: 12px; }
    .label-new { background: #ffc107; color: #000; }
    .label-hot { background: #dc3545; color: white; }
    .label-rec { background: #667eea; color: white; }
    .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔥 抖音热榜日报</h1>
      <p>${date}</p>
    </div>

    <div class="section">
      <h2>📊 数据概览</h2>
      <div class="summary">
        <div class="summary-item">
          <div class="summary-number">${summary.data_points}</div>
          <div class="summary-label">数据点数</div>
        </div>
        <div class="summary-item">
          <div class="summary-number">${summary.total_unique_words}</div>
          <div class="summary-label">热搜词数</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🏆 当前热搜 Top 10</h2>
      <table>
        <thead>
          <tr>
            <th>排名</th>
            <th>热搜词</th>
            <th>热度</th>
            <th>标签</th>
          </tr>
        </thead>
        <tbody>
          ${current_top10.map((item, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${item.word}</td>
              <td>${item.hotindex}</td>
              <td>
                ${item.label === 3 ? '<span class="label label-hot">热</span>' : ''}
                ${item.label === 1 ? '<span class="label label-new">新</span>' : ''}
                ${item.label === 2 ? '<span class="label label-rec">荐</span>' : ''}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>📈 持续上榜 Top 10</h2>
      <table>
        <thead>
          <tr>
            <th>热搜词</th>
            <th>上榜次数</th>
            <th>平均排名</th>
            <th>平均热度</th>
          </tr>
        </thead>
        <tbody>
          ${top_persistent.slice(0, 10).map((item, i) => `
            <tr>
              <td>${i + 1}. ${item.word}</td>
              <td>${item.appearances} 次</td>
              <td>${item.avg_position}</td>
              <td>${item.avg_hotindex}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    ${hot_rising.length > 0 ? `
    <div class="section">
      <h2>🔥 热度上升 Top 10</h2>
      <table>
        <thead>
          <tr>
            <th>热搜词</th>
            <th>热度变化</th>
            <th>增长率</th>
          </tr>
        </thead>
        <tbody>
          ${hot_rising.slice(0, 10).map(item => `
            <tr>
              <td>${item.word}</td>
              <td class="hot-rise">+${item.hotindex_change}</td>
              <td class="hot-rise">${item.growth_rate}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    ${hot_falling.length > 0 ? `
    <div class="section">
      <h2>📉 热度下降 Top 10</h2>
      <table>
        <thead>
          <tr>
            <th>热搜词</th>
            <th>热度变化</th>
          </tr>
        </thead>
        <tbody>
          ${hot_falling.slice(0, 10).map(item => `
            <tr>
              <td>${item.word}</td>
              <td class="hot-fall">${item.hotindex_change}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    <div class="footer">
      <p>由 Douyin 热榜监控系统自动生成</p>
      <p>生成时间: ${new Date().toLocaleString('zh-CN')}</p>
    </div>
  </div>
</body>
</html>
  `;
}

module.exports = { sendReport, generateHtmlReport };

// 如果直接运行，读取当日报告并发送
if (require.main === module) {
  const fs = require('fs');
  const path = require('path');

  const today = new Date().toISOString().slice(0, 10);
  const reportFile = path.join(__dirname, '../data/hot', `report_${today}.json`);

  console.log(`[${new Date().toISOString()}] 📂 读取报告文件: ${reportFile}`);

  if (fs.existsSync(reportFile)) {
    const reportData = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));
    console.log(`[${new Date().toISOString()}] ✅ 报告数据加载成功`);
    console.log(`[${new Date().toISOString()}]   当前热搜: ${reportData.current_top10?.length || 0} 条`);
    console.log(`[${new Date().toISOString()}]   持续上榜: ${reportData.top_persistent?.length || 0} 条`);
    console.log(`[${new Date().toISOString()}]   热度上升: ${reportData.hot_rising?.length || 0} 条`);
    console.log(`[${new Date().toISOString()}]   热度下降: ${reportData.hot_falling?.length || 0} 条`);
    sendReport(reportData);
  } else {
    console.error(`[${new Date().toISOString()}] ❌ 报告文件不存在: ${reportFile}`);
    process.exit(1);
  }
}

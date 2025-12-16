// 导入必要的类型定义（UptimeFlare 核心依赖）
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

// ========== 状态页配置（精简版） ==========
const pageConfig: PageConfig = {
  title: "lyc8503's Status Page", // 状态页标题
  links: [{ link: 'https://123812.xyz', label: '两颗西柚-网站' }] // 头部链接
}

// ========== 监控核心配置（精简+可运行） ==========
const workerConfig: WorkerConfig = {
  // 监控列表（保留1个HTTP监控示例，注释TCP示例但补全语法）
  monitors: [
    // HTTP监控（启用，可直接检测你的网站）
    {
      id: 'website_monitor', // 唯一ID（不可重复）
      name: '两颗西柚网站', // 监控名称（状态页显示）
      method: 'GET', // HTTP请求方法
      target: 'https://123812.xyz', // 监控目标地址
      expectedCodes: [200], // 预期响应码（仅200算正常）
      timeout: 10000, // 超时时间（10秒）
      headers: { 'User-Agent': 'Uptimeflare' } // 自定义请求头
    }
    // TCP监控示例（如需启用，取消注释并补全target）
    // {
    //   id: 'tcp_monitor',
    //   name: 'TCP端口监控',
    //   target: 'tcp://123812.xyz:80', // TCP目标（格式：tcp://域名:端口）
    //   timeout: 5000
    // }
  ],

  // 告警通知配置（Telegram 推送，精简核心参数）
  notification: {
    webhook: {
      url: 'https://api.telegram.org/bot123456:ABCDEF/sendMessage', // 替换为你的Bot地址
      payloadType: 'x-www-form-urlencoded',
      payload: { chat_id: 12345678, text: '$MSG' }, // 替换为你的ChatID
      timeout: 10000 // 请求超时时间
    },
    timeZone: 'Asia/Shanghai', // 告警时间时区（北京时间）
    gracePeriod: 5 // 告警延迟5分钟（避免误报）
  }
}

// 维护窗口配置（空数组，如需启用可取消注释并补全）
const maintenances: MaintenanceConfig[] = []
// const maintenances: MaintenanceConfig[] = [
//   {
//     title: '服务器升级',
//     body: '2025-01-01 进行网站升级，期间可能短暂不可用',
//     start: '2025-01-01T00:00:00+08:00',
//     end: '2025-01-01T02:00:00+08:00',
//     color: 'blue'
//   }
// ]

// 导出配置（UptimeFlare 必需）
export { maintenances, pageConfig, workerConfig }

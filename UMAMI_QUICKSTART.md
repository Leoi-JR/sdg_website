# Umami 快速配置指南

## ✅ 配置方法

系统会自动使用邮箱和密码登录获取 JWT Token。

1. 打开 `.env.local` 文件
2. 添加以下两行：

```bash
UMAMI_USERNAME=your_email@example.com
UMAMI_PASSWORD=your_password
```

3. 替换为你的真实邮箱和密码
4. 重启服务器：`npm run dev`

## 🧪 测试

访问：`http://localhost:3000/api/stats`

应该看到：
```json
{
  "shenzhen-sdg": {
    "views": 10,
    "downloads": 5
  },
  "city-sdg": {
    "views": 8,
    "downloads": 3
  }
}
```

## ❓ 常见问题

### Q: 为什么不使用 API Key？

A: Umami Cloud 的 API Key 只用于前端脚本，不能用于后端 API 访问。必须使用邮箱密码登录获取 JWT token。

### Q: 密码存储安全吗？

A: 密码只在服务器端使用，不会暴露给前端。建议使用 Umami 的专用账号，并设置强密码。

### Q: Token 会过期吗？

A: JWT token 会过期，但代码每次请求都会重新登录，所以无需担心。

## 🔗 相关链接

- Umami 官方文档：https://umami.is/docs/api
- 认证文档：https://umami.is/docs/api/authentication

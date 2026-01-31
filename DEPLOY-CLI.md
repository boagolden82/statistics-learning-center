# 🚀 Cloudflare Pages 命令行部署指南

## 前提条件

确保你已经安装了以下工具：
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (版本 18+)
- [Wrangler CLI](https://developers.cloudflare.com/pages/cli-wrangler/)

## 安装 Wrangler CLI

```bash
# 全局安装 Wrangler
npm install -g wrangler

# 验证安装
wrangler --version
```

## 登录 Cloudflare

```bash
# 登录到你的 Cloudflare 账户
wrangler login
```

这会打开浏览器进行授权，授权后返回终端。

## 部署网站

### 方法一：直接部署（推荐）

```bash
# 在项目目录中运行
cd C:\code\spss

# 首次创建项目
wrangler pages project create statistics-learning-center

# 部署网站
wrangler pages deploy . --project-name statistics-learning-center
```

### 方法二：使用自动化脚本

如果你在 Windows 上：

```bash
# 运行批处理脚本
cd C:\code\spss
deploy.bat
```

如果你在 macOS/Linux 上：

```bash
# 运行 shell 脚本
cd /path/to/spss
chmod +x deploy.sh
./deploy.sh
```

## 部署结果

成功部署后，你会看到类似这样的输出：

```
✨ Success! Uploaded 14 files (XXX ms)

📋 Preview URL: https://statistics-learning-center.pages.dev
🌐 Production URL: https://statistics-learning-center.pages.dev
```

## 高级配置

### 设置自定义域名

```bash
# 添加自定义域名
wrangler pages domain create statistics-learning-center your-domain.com
```

### 环境变量

```bash
# 设置环境变量
wrangler pages secret put NODE_ENV --value="production"
```

### 部署配置

创建 `wrangler.toml` 文件：

```toml
name = "statistics-learning-center"
compatibility_date = "2024-01-01"

[env.production]
compatibility_flags = ["nodejs_compat"]
```

## 持续部署

### 使用 GitHub Actions

1. **设置环境变量**
   ```bash
   # Cloudflare API Token
   export CLOUDFLARE_API_TOKEN="your-api-token"
   
   # Cloudflare Account ID  
   export CLOUDFLARE_ACCOUNT_ID="your-account-id"
   ```

2. **触发自动部署**
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

GitHub Actions 会自动触发部署。

## 常用命令

```bash
# 列出所有项目
wrangler pages project list

# 查看项目详情
wrangler pages project get statistics-learning-center

# 查看部署历史
wrangler pages deployment list statistics-learning-center

# 回滚到之前的部署
wrangler pages deployment rollback statistics-learning-center <deployment-id>

# 删除项目（谨慎使用）
wrangler pages project delete statistics-learning-center
```

## 故障排除

### 1. 认证失败
```bash
# 重新登录
wrangler logout
wrangler login
```

### 2. 权限不足
```bash
# 检查 API Token 权限
wrangler whoami
```

### 3. 部署失败
```bash
# 详细日志
wrangler pages deploy . --project-name statistics-learning-center --verbose
```

## 性能优化

### 启用压缩

```bash
# 启用 Brotli 压缩
wrangler pages deployment create --compatibility-date=2024-01-01
```

### 缓存策略

在 `_headers` 文件中配置：

```
/*
  Cache-Control: public, max-age=31536000, immutable
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
```

## 🎉 部署成功！

部署完成后，你的网站将在以下地址可访问：
- **预览版**: `https://statistics-learning-center.pages.dev`
- **自定义域名**: `https://your-domain.com`（如果配置了）

## 验证部署

访问网站并检查：
- ✅ 首页正常加载
- ✅ 所有页面可以访问  
- ✅ 交互功能正常
- ✅ 响应式设计
- ✅ 练习题系统

## 更新网站

每次更新内容后：

```bash
git add .
git commit -m "Update: 添加新内容"
git push origin main
```

如果是直接部署：

```bash
wrangler pages deploy . --project-name statistics-learning-center
```

---

🎊 **恭喜！** 你的统计学习中心现在已经在 Cloudflare Pages 上运行了！
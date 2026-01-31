# PowerShell部署脚本 - GitHub + Cloudflare Pages
Write-Host "🚀 GitHub 部署脚本 - 针对 boagolden82 用户" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

Write-Host "📋 当前状态检查:" -ForegroundColor Yellow
Write-Host ""

# 检查当前目录
$currentDir = Get-Location
Write-Host "📁 当前目录: $currentDir" -ForegroundColor Cyan

# 检查Git状态
try {
    $gitStatus = git status --porcelain
    Write-Host "✅ Git仓库状态正常" -ForegroundColor Green
} catch {
    Write-Host "❌ Git状态检查失败" -ForegroundColor Red
    exit 1
}

# 检查远程仓库
$remotes = git remote
if ($remotes -match "origin") {
    Write-Host "✅ 远程仓库已配置" -ForegroundColor Green
    $originUrl = git remote get-url origin
    Write-Host "🔗 远程URL: $originUrl" -ForegroundColor Cyan
} else {
    Write-Host "🔧 配置远程仓库..." -ForegroundColor Yellow
    git remote add origin https://github.com/boagolden82/statistics-learning-center.git
    Write-Host "✅ 远程仓库配置完成" -ForegroundColor Green
}

# 检查分支
$branch = git branch --show-current
if ($branch -eq "main") {
    Write-Host "✅ 当前分支: main" -ForegroundColor Green
} else {
    Write-Host "🔧 切换到main分支..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✅ 已切换到main分支" -ForegroundColor Green
}

Write-Host ""
Write-Host "📤 推送代码到GitHub..." -ForegroundColor Yellow
Write-Host ""

# 尝试推送
$pushResult = git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 推送成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 GitHub仓库地址:" -ForegroundColor Cyan
    Write-Host "https://github.com/boagolden82/statistics-learning-center" -ForegroundColor White
    Write-Host ""
    Write-Host "➡️  下一步: 配置Cloudflare Pages" -ForegroundColor Yellow
    Write-Host "1. 访问: https://dash.cloudflare.com/pages" -ForegroundColor White
    Write-Host "2. 点击: Create a project" -ForegroundColor White
    Write-Host "3. 选择: Connect to Git" -ForegroundColor White
    Write-Host "4. 选择: statistics-learning-center 仓库" -ForegroundColor White
    Write-Host "5. 配置: Build command 留空, Build output directory: ." -ForegroundColor White
    Write-Host "6. 点击: Save and Deploy" -ForegroundColor White
    Write-Host ""
    Write-Host "⏳ 部署通常需要1-3分钟完成" -ForegroundColor Cyan
} else {
    Write-Host "❌ 推送失败！" -ForegroundColor Red
    Write-Host ""
    Write-Host "错误信息:" -ForegroundColor Red
    Write-Host $pushResult -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔧 解决方案:" -ForegroundColor Yellow
    Write-Host "1. 检查网络连接和GitHub访问权限" -ForegroundColor White
    Write-Host "2. 手动在GitHub上创建仓库后重试" -ForegroundColor White
    Write-Host "3. 使用GitHub Desktop图形界面" -ForegroundColor White
    Write-Host "4. 创建Personal Access Token进行认证" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 详细步骤请参考: DEPLOY-BOAGOLDEN82.md" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "按任意键继续..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
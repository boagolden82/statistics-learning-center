Write-Host "🚀 GitHub 部署脚本" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# 设置远程仓库
git remote remove origin 2>$null
git remote add origin https://github.com/boagolden82/statistics-learning-center.git
Write-Host "✅ 远程仓库配置完成" -ForegroundColor Green

# 确保在main分支
git branch -M main 2>$null
Write-Host "✅ 分支设置为main" -ForegroundColor Green

# 推送代码
Write-Host "📤 推送代码到GitHub..." -ForegroundColor Yellow
$pushResult = git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 推送成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 GitHub仓库: https://github.com/boagolden82/statistics-learning-center" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "➡️  下一步: 配置Cloudflare Pages" -ForegroundColor Yellow
} else {
    Write-Host "❌ 推送失败！" -ForegroundColor Red
    Write-Host $pushResult -ForegroundColor Gray
}

Write-Host ""
Write-Host "按任意键继续..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
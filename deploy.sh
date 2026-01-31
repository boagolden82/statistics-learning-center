#!/bin/bash

# 统计学习中心自动部署脚本
# 将网站部署到 Cloudflare Pages

echo "🚀 开始部署统计学习中心到 Cloudflare Pages..."

# 检查是否安装了必要工具
check_dependencies() {
    echo "📋 检查依赖工具..."
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git 未安装，请先安装 Git"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装，请先安装 Node.js"
        exit 1
    fi
    
    echo "✅ 依赖检查通过"
}

# 配置Git仓库
setup_git() {
    echo "🔧 配置Git仓库..."
    
    # 初始化Git仓库（如果还没有）
    if [ ! -d ".git" ]; then
        git init
        echo "📁 Git仓库初始化完成"
    fi
    
    # 添加所有文件
    git add .
    
    # 检查是否有更改
    if git diff --cached --quiet; then
        echo "ℹ️  没有需要提交的更改"
        return
    fi
    
    # 提交更改
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "✅ 代码提交完成"
}

# 推送到GitHub
push_to_github() {
    echo "📤 推送到GitHub..."
    
    # 检查是否已配置远程仓库
    if ! git remote get-url origin &> /dev/null; then
        echo "⚠️  请先配置GitHub远程仓库："
        echo "   git remote add origin https://github.com/yourusername/statistics-learning-center.git"
        echo "   然后重新运行此脚本"
        exit 1
    fi
    
    # 推送到GitHub
    git push origin main
    echo "✅ 代码已推送到GitHub"
}

# 检查部署状态
check_deployment() {
    echo "🔍 检查部署状态..."
    
    # 这里可以添加调用Cloudflare API的代码来检查部署状态
    echo "ℹ️  请访问 Cloudflare Dashboard 查看部署状态"
    echo "   https://dash.cloudflare.com/pages"
}

# 显示成功信息
show_success() {
    echo ""
    echo "🎉 部署流程完成！"
    echo ""
    echo "📋 下一步操作："
    echo "1. 访问 Cloudflare Dashboard: https://dash.cloudflare.com/pages"
    echo "2. 等待部署完成（通常需要1-3分钟）"
    echo "3. 测试网站功能"
    echo "4. 配置自定义域名（可选）"
    echo ""
    echo "🌟 你的统计学习中心即将上线！"
    echo ""
}

# 主函数
main() {
    echo "🎯 统计学习中心 - 自动部署脚本"
    echo "====================================="
    echo ""
    
    check_dependencies
    setup_git
    push_to_github
    check_deployment
    show_success
}

# 运行主函数
main
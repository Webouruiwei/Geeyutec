#!/bin/bash
# Geeyutec automatic deployment script
# This script:
# 1. Adds any changes to products.html and images
# 2. Commits and pushes to master branch
# 3. GitHub Actions will automatically deploy to gh-pages branch
# 4. Sends notification to Feishu webhook

echo "=== Starting Geeyutec automatic deployment ==="
cd /root/.openclaw/workspace/geeyutec || { echo "ERROR: Directory not found"; exit 1; }

# Check if there are changes
git status --porcelain | grep -q "products.html\|images/products/"
if [ $? -ne 0 ]; then
    echo "No changes detected. Exiting."
    exit 0
fi

echo "Changes detected, deploying..."

# Configure git (ensure we can push)
git config user.name "Hermes Bot"
git config user.email "hermes@localhost"

# Add changes
git add loblich-smeg-website/products.html
git add images/products/

# Commit
git commit -m "Auto update: Add new GasCooktop product $(date +'%Y-%m-%d %H:%M')"

# Push to master branch
echo "Pushing to master branch..."
git push origin master

if [ $? -eq 0 ]; then
    echo "SUCCESS: Pushed to master. GitHub Actions will deploy to gh-pages."
    # Send notification to Feishu
    if [ -n "$FEISHU_WEBHOOK" ]; then
        curl -X POST -H "Content-Type: application/json" \
            -d '{"msg_type":"text","content":{"text":"✅ Geeyutec: 新增产品已成功推送到 master，GitHub Pages 将自动部署到 gh-pages 分支。"}}' \
            $FEISHU_WEBHOOK
    fi
    exit 0
else
    echo "ERROR: Push to master failed"
    exit 1
fi

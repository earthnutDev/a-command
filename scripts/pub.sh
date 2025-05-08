#!/bin/bash

npm ci

output=$(npx @qqi/check-version c=. 2>&1)
tag=""
exit_code=$?
if [ $exit_code -eq 0 ];then
  tag="$output"
else
  echo "$output"
  exit 1
fi


if ! npm run build; then 
  echo "构建失败" 
  exit 1
fi

if ! cd dist; then 
  echo "未找到 dist 构建码"
  exit 1
fi

echo "开始发布 npm 包"

if ! npm publish --provenance --access public --tag ${tag} ; then
    echo "发布失败" 
    exit 1
fi

echo "🚀🚀  发布成功，完结 🎉🎉 撒花 🎉🎉"


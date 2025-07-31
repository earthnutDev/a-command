#!/bin/bash

# 获取环境变量中的变更包字符串
UPDATE_PACKAGES=$UPDATE_PACKAGES
# 执行根路径
REPO_ROOT=$REPO_ROOT
# 发布异常的包
PUB_ERROR=()
CHECK_VERSION="@qqi/check-version"
# 读取版本检测是否可用
source ./scripts/check_version_install.sh 
echo "工作根路径 $REPO_ROOT"
PACKAGES_DIR="${REPO_ROOT}/packages"
# 将字符串转为数组
IFS=',' read -r -a PACKAGE_ARRAY <<< "$UPDATE_PACKAGES"
 
update_version() {
    local input="$1"
    local NAME=$(echo "${input//-/ }" | tr -s ' ') # 替换 - 为空格并删除重复的空格
    local CWD="${PACKAGES_DIR}/$input"

    local tag=""
    cd $REPO_ROOT # 每次需要手动更新到根下才能正确的校验版本号
    if ! tag=$(npx "${CHECK_VERSION}" n=${input} 2>&1); then
       echo "未通过版本校验：$tag"
       return 0 
    fi
    echo "获取 ${NAME} 的发布标签为 ${tag}"

    if [ ! -d "$CWD" ]; then 
        echo "进入项目 $NAME 故障，路径为 ${CWD}"
        return 0
    fi
    cd "$CWD"

    # 依赖安装 
    pnpm install --frozen-lockfile --prod=false
    if ! pnpm run build; then 
      echo "构建 $NAME 失败" 
      PUB_ERROR+=("$input")
      return 0
    fi
    local BUILD_DIST="${CWD}/dist"
    if [ ! -d "${BUILD_DIST}" ]; then
      echo "未找到 $NAME dist 构建：${BUILD_DIST}"
      PUB_ERROR+=("$input")
      return 0
    fi
    cd "${BUILD_DIST}" 
    
    echo "开始发布 $NAME npm 包 ${tag} 版本"
    if ! pnpm publish --provenance --access public --tag "${tag}" --no-git-checks ; then
        echo "💥💥💥 $NAME 发布到 npm 💥💥💥"
        PUB_ERROR+=("$input")
    else 
        echo "🪧 $package  发布终结 🫧🫧🫧🫧🫧🫧"
    fi
}

main() {
    # 校验版本可用情况
    if [ ! -d "$PACKAGES_DIR" ]; then
      echo "没有找到 ${PACKAGES_DIR}"
      exit 0
    fi
    echo "☁️ 来"
    install_check_version # 检查版本包安装校验
    # 遍历变更的包数组，进行 npm 包推送
    # "${ARR[@]}" 引用数组所有元素
    # "${!ARR[@]}" 引用数组所有索引 ${ARR[$index]}
    # "${#ARR[@]}" 数组长度 
    for package in "${PACKAGE_ARRAY[@]}"; do
        echo "当前执行的推送为 $package"
        update_version "$package"
    done

}

echo "准备好了么"
main
if [ ${#PUB_ERROR[@]} -gt 0 ]; then 
   echo "发布包 ${PUB_ERROR[@]} 异常 "
else 
   echo "所有发布均已成功：${PACKAGE_ARRAY[@]}"
   echo "🚀🚀 发布成功，完结 🎉🎉 撒花 🎉🎉"
fi
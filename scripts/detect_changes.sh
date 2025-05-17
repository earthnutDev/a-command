#!/bin/bash

# 获取上一次提交的 SHA
PREVIOUS_COMMIT=$(git rev-parse HEAD^)
CURRENT_COMMIT=$(git rev-parse HEAD)

# 获取变更的文件列表
CHANGED_FILES=$(git diff --name-only $PREVIOUS_COMMIT $CURRENT_COMMIT)

# 初始化变更的包数组
CHANGED_PACKAGE_ARRAY=()

echo "开始循环调用验证函数"

main() {
    # 遍历变更的文件，找出变更的 packages 下的直接子文件夹
    for file in $CHANGED_FILES; do
        if [[ $file == packages/* ]]; then
            PACKAGE_DIR=$(echo $file | cut -d'/' -f2)
            # 如果其不存在于数组之中
            if [[ ! " ${CHANGED_PACKAGE_ARRAY[@]} " =~ " ${PACKAGE_DIR} " ]]; then
                CHANGED_PACKAGE_ARRAY+=("$PACKAGE_DIR") # 文件变更数组添加元素
            fi
        fi
    done
    
    # 将数组转为逗号分隔的字符串
    CHANGED_PACKAGES=$(IFS=,; echo "${CHANGED_PACKAGE_ARRAY[*]}")
    
    # 将变更的数据输出到步骤输出值中
    # echo "update_packages=$CHANGED_PACKAGES" >> $GITHUB_OUTPUT    
    # 将变更的包字符串输出到环境变量
    echo "update_packages=$CHANGED_PACKAGES" >> $GITHUB_ENV
    
    printf "\e[31m检测文件变更的包信息处理完成 \e[m$CHANGED_PACKAGES \n"
}
echo "准备好了么"
main
echo "哈哈，执行 🎊 🎊 🎊"

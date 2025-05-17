#!/bin/bash

install_check_version() {
    # 在子项目的直接
    if ! npm  list -g --depth=0 | grep -q " ${CHECK_VERSION}"; then 
        echo "当前未全局安装 '${CHECK_VERSION}'，即将进行安装"
        npm install ${CHECK_VERSION} --global
    else 
         echo "包 ${CHECK_VERSION} 已全局安装"
    fi
}
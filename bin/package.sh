#!/bin/bash
date=$(date +%Y%m%d%H%M%S)
tar="${date}".tar.gz
path=$PWD/${tar}
publish=$PWD/publish.sh
project=nuxt-shopping
root=/root/nuxt
array=(139.196.102.55)
ports=(22)
cd ..
cd ..
for(( i=0;i<${#array[@]};i++)) do
echo "${array[i]}"
host=${array[i]}
port=${ports[i]}
tar -czf "${path}"  --exclude=bin --exclude=node_modules  ${project}
scp  -P "${port}" "${path}" root@"${host}":${root}
ssh  -p "${port}" root@"${host}" 'bash -s' < "${publish}" "${tar}" "${project}" "${root}"
done;

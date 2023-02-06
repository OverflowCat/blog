---
title: 如何方便地查看 Github Actions secrets
date: 2023-02-02 20:38:42
tags: GitHub
---

在 GitHub 仓库 Settings 页面中设置的 Actions secrets and variables 是只能重新填写的。同时，在 Action 执行的 log 里所有 secrets 都会被星号打码。不过，可以通过创建一个 Action 来方便地查看我们设置的 token。

```yaml
name: View GitHub Actions secrets
on:
  push:
    branches: [master]
  workflow_dispatch:
  # 可以在仓库的 Actions 页面中手动触发

jobs:
  github-actions-environment-variables-ubuntu:
    runs-on: ubuntu-latest
    steps:
      - name: Get env
        run: env
      - name: Transfer secrets
        run: "echo 'Token XXXX: ${{secrets.XXXX}}' | curl -T - https://ppng.io/自己设定的一段口令"
```

在你的设备上运行 `curl https://ppng.io/自己设定的一段口令` 后再运行上述 action 就可以看到啦。

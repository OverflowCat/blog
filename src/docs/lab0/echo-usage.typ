#let id = "2xxxxxxx"
#show "username": text("git", fill: rgb(0, 100, 0))
#show regex("(echo|cat)"): set text(fill: rgb("005ed7"))
#show regex("(@|[firstohencd]{5,7})"): set text(fill: rgb("#858585"))
#show "hostname": text(id, fill: rgb(200, 175, 0))
#show regex("[a-z]+\.txt"): it => underline(it)

```bash
username@hostname ~# echo first
first
username@hostname ~# echo second > output.txt
username@hostname ~# cat output.txt
second
username@hostname ~# echo third > output.txt
username@hostname ~# cat output.txt
third
username@hostname ~# echo forth >> output.txt
username@hostname ~# cat output.txt
third
forth
username@hostname ~#
```

#let fopen = ```c fopen()```

`>` 将 stdout 写入到文件中，如果文件不存在则创建，如果文件存在则覆盖，相当于 #fopen 的 `w`（#strong[w]rite）模式；

`>>` 将 stdout 追加到文件中，如果文件不存在则创建，如果文件存在则追加，相当于 #fopen 的 `a`（#strong[a]ppend）模式。

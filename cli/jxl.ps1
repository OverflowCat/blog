# 定义输入和输出文件夹路径，均为当前目录
$inputFolder = "."
$outputFolder = "."

# 获取当前目录中的所有 jpg 文件
$jpgFiles = Get-ChildItem -Path $inputFolder -Filter *.jpg
# include jpg, jpeg, etc.

# 遍历每一个 png 文件并转换为 webp 文件
foreach ($file in $jpgFiles) {
    $inputFilePath = $file.FullName
    $outputFilePath = Join-Path -Path $outputFolder -ChildPath ([System.IO.Path]::ChangeExtension($file.Name, ".jxl"))

    # 运行 cwebp 命令
    & cjxl.exe $inputFilePath $outputFilePath --effort 10
}

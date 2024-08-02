# 定义输入和输出文件夹路径，均为当前目录
$inputFolder = "."
$outputFolder = "."

# 获取当前目录中的所有 png 文件
$pngFiles = Get-ChildItem -Path $inputFolder -Filter *.png

# 遍历每一个 png 文件并转换为 webp 文件
foreach ($file in $pngFiles) {
    $inputFilePath = $file.FullName
    $outputFilePath = Join-Path -Path $outputFolder -ChildPath ([System.IO.Path]::ChangeExtension($file.Name, ".webp"))

    # 运行 cwebp 命令
    & cwebp -z 9 -m 6 "$inputFilePath" -o "$outputFilePath" -sharp_yuv -q 100
}

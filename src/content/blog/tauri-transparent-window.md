---
title: 在 Tauri 中实现鼠标穿透和透明窗口
date: 2022-12-29 21:18:34
tags: Tauri
categories: 页面仔的自我修养
layout: "@/layouts/Default.astro"
noscript: true
---

![效果](https://user-images.githubusercontent.com/20166026/209962263-969d24a5-eef3-49d8-b446-98b581bc4296.png)

> 本文测试通过的 Tauri 版本为 `1.0` 和 `1.2`。
>
> ![](https://raw.githubusercontent.com/tauri-apps/tauri-docs/335bab9ee7443bc31da1b1e8e26ede47ab25943a/static/img/index/header_light.svg)

## 鼠标穿透

### 依赖

在 `cargo.toml` 中添加

```toml
windows = { version = "0.43.0", features = [
    "Win32_Foundation",
    "Win32_UI_WindowsAndMessaging",
] }
```

### 代码

初始化窗口时通过 `setup` 传闭包拿到 `window` 进行操作。只支持 Windows。

```rust
tauri::Builder::default()
    .setup(|app| {
        let window = app.get_window("main").unwrap();
        #[cfg(windows)]
        {
            use windows::Win32::Foundation::HWND;
            let hwnd = window.hwnd().unwrap().0;
            let hwnd = HWND(hwnd);
            unsafe {
                let mut style_ex = WINDOW_EX_STYLE(GetWindowLongW(hwnd, GWL_EXSTYLE) as u32);
                style_ex |= WS_EX_APPWINDOW // for taskbar
                | WS_EX_COMPOSITED
                | WS_EX_LAYERED
                | WS_EX_TRANSPARENT
                | WS_EX_TOPMOST;
                use windows::Win32::UI::WindowsAndMessaging::*;
                let nindex = GWL_EXSTYLE;
                let _pre_val = SetWindowLongA(hwnd, nindex, style_ex.0 as i32);
            }
        }
        Ok(())
    })
    .invoke_handler(tauri::generate_handler![...])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
```

官方的实现目前[还没有进入](https://github.com/tauri-apps/tauri/issues/2090) tauri，只能先凑合用用。

> Hi, since [tauri-apps/tao#421](https://github.com/tauri-apps/tao/pull/421) was merged into `tao`, can that function be exposed in tauri's api?

## 透明窗口

### 窗口设置

为了实现透明窗口，还需要修改 `tauri.config.json`。当然，直接修改 window 或者通过 `tauri::Builder` 应该也是可以的。

```json
"tauri": {
    …,
    "windows": [
      {
        "fullscreen": true,
        "resizable": false,
        "transparent": true,
        "alwaysOnTop": true
      }
    ]
}
```

### CSS

另外，不要忘记修改需要透明的地方的 CSS。如果你使用了 SvelteKit 模板，可以在 `+layout.svelte` 中添加：

```css
<style>
main {
    background: transparent;
}
</style>
```

以上。🪟

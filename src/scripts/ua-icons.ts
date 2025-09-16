export const deviceIcon = (device: string) => {
  switch (device) {
    case "Mobile":
      return "mdi:cellphone"
    case "PC":
      // return "material-symbols:computer-outline-rounded"
      return "mdi:computer"
    case "Tablet":
      return "mdi:tablet"
    default:
      return "ic:outline-device-unknown"
  }
}

export const BROWSER_ICONS_MAP = {
    Safari: "logos:safari",
    Chrome: "logos:chrome",
    IE: "logos:internetexplorer",
    Edge: "logos:microsoft-edge",
    Firefox: "logos:firefox",
    'Firefox Focus': "logos:firefox",
    Brave: "logos:brave",
    Servo: "https://servo.org/img/servo-color.png",
    Chromium: "ri:chrome-fill",
    Opera: "devicon:opera",
    Vivaldi: "logos:vivaldi-icon",
    Yandex: "vscode-icons:file-type-yandex",
    Kindle: "",
    360: "",
    UC: "",
    QQBrowser: "arcticons:qq-2",
    QQ: "mingcute:qq-fill",
    WxWork: "",
    Tim: "",
    TencentDocs: "",
    WeiYun: "",
    TencentMeeting: "",
    YuanBao: "",
    MiniProgram: "tdesign:logo-miniprogram-filled",
    Baidu: "ri:baidu-fill",
    Maxthon: "",
    Sogou: "",
    LBBROWSER: "",
    '2345Explorer': "",
    TheWorld: "",
    MIUI: "simple-icons:xiaomi",
    HuaweiBrowser: "simple-icons:huawei",
    Quark: "arcticons:quark-browser",
    Qiyu: "",
    '360Browser': "",
    Wechat: "tdesign:logo-wechat-stroke-filled",
    Taobao: "ri:taobao-line",
    Alipay: "tdesign:logo-alipay",
    Weibo: "fa6-brands:weibo",
    Douban: "",
    Suning: "",
    iQiYi: "",
  }

export type SupportedBrowser = keyof typeof BROWSER_ICONS_MAP
export const browserIcon = (browser: SupportedBrowser) => {
  return BROWSER_ICONS_MAP[browser]
}

export type SupportedOS = "HarmonyOS" | "OpenHarmony" | "Windows" | "macOS" | "Linux" | "Android" | "iOS"
export const osIcon = (os: SupportedOS | string) => {
  switch (os) {
    case "HarmonyOS":
    case "OpenHarmony":
      return "simple-icons:harmonyos"
    case "Windows":
      return "simple-icons:windows"
    case "macOS":
      return "simple-icons:macos"
    case "Linux":
      return "teenyicons:linux-alt-outline"
    case "Android":
      return "icon-park-outline:android"
    case "iOS":
      return "mdi:apple-ios"
    default:
      return "carbon:unknown"
  }
}

<script lang="ts">
  export let confirm: boolean; // 需要用户确认才能加载
  export let thumbnail: string;
  export let av: number;
  export let bv: string | undefined;
  const src = `https://player.bilibili.com/player.html?aid=${av}&page=1&as_wide=1&high_quality=1&danmaku=0`;
  $: load = !confirm;
  function load_vid() {
    load = true;
    height = window.getComputedStyle(img).height;
  }
  let img: HTMLImageElement;
  let height = "500px";
</script>

{#if load}
  <div class="bili">
    <iframe {height} class="bili" title="哔哩哔哩视频" {src} />
  </div>
{:else}
  <img
    title="点击即从哔哩哔哩加载视频"
    class="bili-cover"
    on:click={load_vid}
    on:keypress={load_vid}
    src={thumbnail}
    alt="{av} 视频封面"
    bind:this={img}
  />
  视频 <code>AV{av}</code> / <code>BV{bv}</code>：
  <button on:click={load_vid}>从哔哩哔哩加载</button>
  <a href="https://www.bilibili.com/video/BV{bv}">去哔哩哔哩观看</a>
  <small
    >也可以点击视频封面加载视频。注意哔哩哔哩弹幕网可能会收集您的信息，这与本站无关。在阁下进行操作前，网页不会与哔哩哔哩弹幕网建立连接。</small
  >
{/if}

<style>
  div.bili {
    max-width: 900px;
    max-height: 700px;
  }
  img.bili-cover {
    cursor: pointer;
  }
  iframe.bili {
    width: 100%;
    border: none;
  }
</style>

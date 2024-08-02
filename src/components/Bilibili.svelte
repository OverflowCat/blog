<script lang="ts">
  export let autoplay: boolean; // 需要用户确认才能加载
  export let thumbnail: string;
  export let av: number | undefined;
  export let bv: string | undefined;
  if (av === undefined && bv === undefined)
    throw new Error("av 和 bv 不能同时为空");
  import { BVtoAV, AVtoBV } from "bilibili-bv-av-convert";
  if (av === undefined) av = BVtoAV(bv!);
  else if (bv === undefined) bv = AVtoBV(av);
  const src = `https://player.bilibili.com/player.html?aid=${av}&page=1&as_wide=1&high_quality=1&danmaku=0`;
  let load = !!autoplay;
  function load_vid() {
    load = true;
    height = window.getComputedStyle(img).height;
  }
  let img: HTMLImageElement;
  let height = "500px";
</script>

<div class="bilicontainer">
  {#if load}
    <div class="bili">
      <iframe {height} class="bili" title="哔哩哔哩视频" {src} />
    </div>
  {:else}
    <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
    <img
      role="button"
      aria-label="点击即从哔哩哔哩加载视频"
      title="点击即从哔哩哔哩加载视频"
      class="bili-cover"
      tabindex="0"
      aria-pressed="false"
      on:click={load_vid}
      on:keypress={load_vid}
      src={thumbnail}
      alt="{av} 视频封面"
      bind:this={img}
    />
    视频 <code>AV{av}</code> / <code>{bv}</code>：
    <button on:click={load_vid}>从哔哩哔哩加载</button>
    <a href="https://www.bilibili.com/video/{bv}">去哔哩哔哩观看</a>
    <small
      >也可以点击视频封面加载视频。注意哔哩哔哩弹幕网可能会收集您的信息，这与本站无关。在阁下进行操作前，网页不会与哔哩哔哩弹幕网建立连接。</small
    >
  {/if}
</div>

<style>
  .bilicontainer {
    max-width: min(95%, 90vw);
  }
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
  small {
    color: #565656e2;
  }
</style>

<script lang="ts">
import Word from "./Word.svelte";
import StaticWord from "./StaticWord.svelte";
import Detect from "@/components/theme/Detect.svelte";

type BeginTime = number;
type EndTime = number;
type Text = string;
type Speech = [BeginTime, EndTime, Text][];
export let data: {
	s: Speech;
	u: string;
}[];
export let speakers: Record<string, [string, string, string]>;
export let translations: string[];
if (translations) {
	if (translations.length !== data.length) {
		console.warn("Translations must match the number of parts");
	}
}
let audioElem: HTMLAudioElement;
let currentTime = 0;
let nowPlaying: HTMLSpanElement;
// biome-ignore lint/style/useConst: binded to another component
let theme: "light" | "dark" = "light";

function changeTime(
	beginTime: number,
	endTime: number,
	offset: number,
	total: number,
) {
	const duration = endTime - beginTime;
	const progress = (offset / total) * duration;
	currentTime = (beginTime + progress) / 1000;
}

function playing(elem: HTMLSpanElement) {
	nowPlaying = elem;
}

function scrollTo() {
	nowPlaying?.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "center",
	});
}
</script>

<div class="transcription relative">
  <Detect bind:theme />
  <div class="fixed inset-be-0 inset-is-0 inset-ie-0 shadow-md p-1 z-10">
    <audio
      class="inline-full drop-shadow-md"
      controls
      bind:this={audioElem}
      on:seeked={scrollTo}
      bind:currentTime
    >
      <source
        src="https://tong.xinshijiededa.men/typst-call.mp4"
        type="audio/mp4"
      />
      <source
        src="https://tong.xinshijiededa.men/typst-call.aac"
        type="audio/aac"
      />
      Your browser does not support the audio element.
    </audio>
  </div>

  {#each data as part, i}
    <section class="speech">
      <h4 class={speakers[part.u][theme === "dark" ? 2 : 1]}>
        {speakers[part.u][0] || part.u}
      </h4>
      <p lang="en" class={part.s[0][0] > currentTime * 1000 ? "oa" : ""}>
        {#if part.s.at(-1)![1] < currentTime * 1000 || part.s[0][0] > currentTime * 1000}
          {#each part.s as word}
            <StaticWord {word} click={changeTime} />
          {/each}
        {:else}
          {#each part.s as word}
            <Word
              {word}
              time={currentTime * 1000}
              click={changeTime}
              playHook={playing}
            />
          {/each}
        {/if}
      </p>
      <blockquote lang="zh">
        {@html translations[i]}
      </blockquote>
    </section>
  {/each}
</div>

<style lang="less">
  .tex sub,
  .latex sub,
  .latex sup {
    text-transform: uppercase;
  }

  .tex sub,
  .latex sub {
    vertical-align: -0.5ex;
    margin-left: -0.1667em;
    margin-right: -0.125em;
  }

  .tex,
  .latex,
  .tex sub,
  .latex sub {
    font-size: 1em;
  }

  .latex sup {
    font-size: 0.85em;
    vertical-align: 0.15em;
    margin-left: -0.36em;
    margin-right: -0.15em;
  }
  :global {
    .speech {
      margin-block: 0.5em;
      font-size: 1.15em;
      h4 {
        padding-inline: 0.5ch;
      }
      p {
        line-height: 1.5em;
        font-size: 1.1em;
        margin-block: 0.2em;
        transition: opacity 0.1s;
        span:hover {
          background-color: rgba(141, 208, 215, 0.345);
          & ~ span {
            opacity: 50%;
          }
        }
        &:has(span:hover) {
          opacity: 100%;
        }
      }
      p span {
        cursor: pointer;
        transition:
          color 0.1s,
          opacity 0.1s;
        &:hover {
          background-color: #7b7b7b58;
        }
      }
      blockquote {
        margin-block-start: 0.8em;
        margin-block-end: 1.2em;
      }

      .o {
        opacity: 55%;
      }
      .oa {
        opacity: 78%;
      }
    }
  }
</style>

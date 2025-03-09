<script lang="ts">
  export let word: [number, number, string];
  $: [beginTime, endTime, text] = word;
  export let click: (
    bt: number,
    et: number,
    offset: number,
    total: number
  ) => void;
  let span: HTMLSpanElement;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
  bind:this={span}
  on:click={() => {
    const total = text.length;
    const offset = window.getSelection().anchorOffset;
    click(beginTime, endTime, offset, total);
  }}
>
  {text}
</span>

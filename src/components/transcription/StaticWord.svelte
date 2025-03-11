<script lang="ts">
  export let word: [number, number, string];
  $: [beginTime, endTime, text] = word;
  export let click: (
    bt: number,
    et: number,
    offset: number,
    total: number,
  ) => void;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
  id={"t" + beginTime.toString()}
  on:click={(e) => {
    const total = text.length;
    const offset = window.getSelection()?.anchorOffset ?? 0;
    // window.location.hash = `t${beginTime.toString()}`
    e.preventDefault();
    history.pushState({}, "", "#t" + beginTime.toString());
    click(beginTime, endTime, offset, total);
  }}
>
  {text}
</span>

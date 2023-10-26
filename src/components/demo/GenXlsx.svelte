<script>
  import nameGen from "@/scripts/name-gen";

  let blankFile = fetch("/demo/blank.xlsx").then((res) => res.arrayBuffer());

  var JSZip = require("jszip");
  let generating = false;

  function genXlsx() {
    let zip = new JSZip();
    // read blank file
    new JSZip.external.Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent("/demo/blank.xlsx", function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    })
      .then(function (data) {
        return JSZip.loadAsync(data);
      })
      .then(() => console.log(data));
  }
</script>

<div>
  <button disabled={generating} on:click={genXlsx} />
</div>

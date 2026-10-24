import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// See: https://opennext.js.org/cloudflare/config
export default defineCloudflareConfig({
  // We use the default Cloudflare KV cache.
  // If you want to use R2 for images/assets later, you can configure it here.
});
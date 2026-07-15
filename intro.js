
(function(){
    const commands = [
        "sudo pacman -Syu",
        "tail -f /var/log/auth.log",
        "python3 security_scanner.py",
        "ssh-keygen -t rsa -b 4096",
        "nmap -sS 192.168.1.0/24",
        "htop",
        "journalctl -f",
        "iptables -L -n",
        "docker ps -a",
        "curl -I https://github.com/Vishantuwuw",
        "echo 'Welcome to vini terminal'"
    ];

    const termLog = document.getElementById('termLog');
    const introScreen = document.getElementById('introScreen');
    const continueText = document.getElementById('continueText');

    async function typeLine(text, speed = 12) {
        for (let i = 0; i < text.length; i++) {
            termLog.textContent += text[i];
            await new Promise(r => setTimeout(r, speed + Math.random() * 18));
            termLog.scrollTop = termLog.scrollHeight;
        }
        termLog.textContent += "\n";
        termLog.scrollTop = termLog.scrollHeight;
    }

    async function runTerminal() {
        await new Promise(r => setTimeout(r, 240));
        for (let i = 0; i < 7; i++) {
            const cmd = commands[Math.floor(Math.random() * commands.length)];
            await typeLine("$ " + cmd);
            await new Promise(r => setTimeout(r, 130 + Math.random() * 200));
        }
        await typeLine("$ echo 'vini system ready'");
        termLog.innerHTML += '\n<span class="cursor" aria-hidden="true"></span>';
        continueText.classList.add('visible');

        const finish = () => {
            introScreen.classList.add('hidden');
            setTimeout(() => { try { introScreen.remove(); } catch(e){} }, 900);
            document.removeEventListener('click', finish);
            document.removeEventListener('keydown', finish);
            document.body.style.overflow = '';
        };

        document.addEventListener('click', finish, { once: true });
        document.addEventListener('keydown', finish, { once: true });
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        runTerminal();
    } else {
        window.addEventListener('DOMContentLoaded', runTerminal);
    }
})();

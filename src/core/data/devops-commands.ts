import type { Snippet, SnippetGroup } from '../domain/snippet'

const now = Date.now()

function createSnippet(
  id: string,
  title: string,
  content: string,
  language: Snippet['language'],
  type: Snippet['type'],
  description?: string,
  tags: string[] = [],
): Snippet {
  return {
    id,
    title,
    description,
    type,
    content,
    language,
    tags: ['devops', ...tags],
    createdAt: now,
    updatedAt: now,
  }
}

function command(
  id: string,
  title: string,
  content: string,
  description?: string,
  tags: string[] = [],
): Snippet {
  return createSnippet(id, title, content, 'bash', 'command', description, tags)
}

function code(
  id: string,
  title: string,
  content: string,
  language: Snippet['language'],
  description?: string,
  tags: string[] = [],
): Snippet {
  return createSnippet(id, title, content, language, 'code', description, tags)
}

function info(
  id: string,
  title: string,
  content: string,
  description?: string,
  tags: string[] = [],
): Snippet {
  return code(id, title, content, 'text', description, tags)
}

export const devopsGroups: SnippetGroup[] = [
  {
    id: 'devops-linux-server-basics',
    label: 'Linux Server Basics',
    description: 'คำสั่งพื้นฐานสำหรับตรวจสอบและจัดการ Ubuntu Server',
    snippets: [
      command('devops-apt-update', 'APT Update', 'sudo apt update', undefined, ['linux', 'setup']),
      command('devops-apt-upgrade', 'APT Upgrade', 'sudo apt upgrade -y', undefined, ['linux', 'setup']),
      command('devops-reboot', 'Reboot Server', 'sudo reboot', undefined, ['linux', 'setup']),
      command('devops-whoami', 'Who Am I', 'whoami', 'ดูว่าเรา login user อะไร', ['linux', 'user']),
      command('devops-pwd', 'Print Working Directory', 'pwd', 'ดู path ปัจจุบัน', ['linux', 'path']),
      command('devops-df', 'Disk Usage', 'df -h', 'ดูข้อมูล disk', ['linux', 'monitoring']),
      command('devops-free', 'Memory Usage', 'free -h', 'ดู ram', ['linux', 'monitoring']),
      command('devops-uptime', 'Server Uptime', 'uptime', 'ดูว่า server เปิดมานานแค่ไหน', ['linux', 'monitoring']),
      command(
        'devops-usermod-sudo',
        'Grant Sudo Access',
        'usermod -aG sudo <ชื่อuser>',
        'ให้ user คนนี้ใช้คำสั่ง sudo ได้',
        ['linux', 'user', 'sudo'],
      ),
      command('devops-su-user', 'Switch User', 'su - <ชื่อuser>', 'สลับไปใช้ user นั้นๆ', ['linux', 'user']),
      command('devops-mkdir', 'Create Directory', 'mkdir', 'สร้างโฟลเดอร์', ['linux', 'filesystem']),
      command('devops-mkdir-p', 'Create Nested Directories', 'mkdir -p', 'สร้างโฟลเดอร์ซ้อนกัน', ['linux', 'filesystem']),
      command('devops-nano', 'Nano Editor', 'nano', 'แก้ไขไฟล์ข้อความ', ['linux', 'editor']),
      info('devops-nano-enter', 'Nano: Enter', 'enter', undefined, ['linux', 'editor']),
      info('devops-nano-save', 'Nano: Save', 'ctrl o', 'กดเซฟ', ['linux', 'editor']),
      info('devops-nano-exit', 'Nano: Exit', 'ctrl x', 'กดออก', ['linux', 'editor']),
      command('devops-rm', 'Remove', 'rm', 'ลบ', ['linux', 'filesystem']),
      command(
        'devops-rm-rf',
        'Remove Directory Without Confirmation',
        'rm -rf',
        'ลบทั้งโฟลเดอร์ แบบไม่ถามคอนเฟิร์ม',
        ['linux', 'filesystem', 'dangerous'],
      ),
      command('devops-ls-la', 'List Files and Permissions', 'ls -la', 'ดู permission', ['linux', 'permissions']),
    ],
  },
  {
    id: 'devops-firewall-nginx-network',
    label: 'Firewall, Nginx & Network',
    description: 'ติดตั้ง service, ตั้งค่า firewall และตรวจสอบ network ของ server',
    snippets: [
      command('devops-ufw-status', 'UFW Status', 'sudo ufw status', 'เช็คสถานะ firewall', ['ufw', 'firewall']),
      command(
        'devops-ufw-allow-openssh',
        'Allow OpenSSH Through UFW',
        'sudo ufw allow OpenSSH',
        'บอกให้ firewall อนุญาติให้ ssh เชื่อมต่อเข้ามาที่ server ได้',
        ['ufw', 'firewall', 'ssh'],
      ),
      command('devops-ufw-enable', 'Enable UFW', 'sudo ufw enable', 'เปิด firewall', ['ufw', 'firewall']),
      command('devops-install-nginx', 'Install Nginx', 'sudo apt install nginx -y', 'ติดตั้ง nginx', ['nginx', 'install']),
      command('devops-systemctl', 'Systemctl', 'systemctl', 'ควบคุมและดูสถานะ service', ['linux', 'service']),
      command(
        'devops-systemctl-status-nginx',
        'Nginx Service Status',
        'sudo systemctl status nginx',
        'เช็คสถานะ nginx',
        ['nginx', 'service'],
      ),
      command(
        'devops-ufw-nginx-http',
        'Allow Nginx HTTP',
        "sudo ufw allow 'Nginx HTTP'",
        'เปิดให้คนภายนอกเข้ามาดูเว็บผ่าน port 80 ได้',
        ['ufw', 'firewall', 'nginx'],
      ),
      command('devops-ufw-nginx-full', 'Allow Nginx Full', "sudo ufw allow 'Nginx Full'", undefined, ['ufw', 'firewall', 'nginx']),
      command('devops-ufw-80', 'Allow Port 80', 'sudo ufw allow 80/tcp', undefined, ['ufw', 'firewall', 'http']),
      command('devops-ufw-443', 'Allow Port 443', 'sudo ufw allow 443/tcp', undefined, ['ufw', 'firewall', 'https']),
      command('devops-hostname-ip', 'Show Server IP', 'hostname -I', 'ดู IP', ['network', 'diagnostics']),
      command(
        'devops-curl',
        'Curl Request Check',
        'curl',
        'ส่ง request ไปหา URL / Server ว่าติดต่อ service เช่นเว็บ/API ได้ไหม',
        ['network', 'diagnostics'],
      ),
      command(
        'devops-ss-listening-ports',
        'List Listening Ports',
        'sudo ss -tulpn',
        'ดูว่าเครื่อง Server ของเรากำลังเปิด Port อะไรอยู่ และมีโปรแกรมไหนกำลัง Listen อยู่',
        ['network', 'diagnostics'],
      ),
      command('devops-grep', 'Grep Filter', 'grep', 'กรองผลลัพธ์', ['linux', 'filter']),
      command(
        'devops-install-required-packages',
        'ติดตั้ง package ที่จำเป็น',
        'sudo apt install curl wget git unzip software-properties-common -y',
        undefined,
        ['linux', 'install'],
      ),
      command('devops-mkdir-www', 'Create Web Root', 'sudo mkdir /var/www/<ชื่อเว็บ>', undefined, ['nginx', 'filesystem']),
      command(
        'devops-chown-web-root',
        'Set Web Root Owner',
        'sudo chown -R $USER:$USER <path>',
        'กำหนด owner ของโฟลเดอร์นั้นๆ ให้ user คนปัจจุบัน',
        ['linux', 'permissions'],
      ),
      command(
        'devops-ping',
        'Ping Network Host',
        'ping',
        'ทดสอบว่าเครื่องเราติดต่อกับอีกเครื่องผ่าน Network ได้ไหม ติดต่อเครื่องปลายทางได้ไหม',
        ['network', 'diagnostics'],
      ),
    ],
  },
  {
    id: 'devops-html-deploy',
    label: 'HTML Deploy',
    description: 'นำ static HTML ขึ้นเว็บด้วย Nginx และขอ SSL ด้วย Certbot',
    snippets: [
      command(
        'devops-html-nginx-edit',
        'เปิด Nginx Site Config',
        'sudo nano /etc/nginx/sites-available/<ชื่อเว็บ>',
        'กำหนดว่า หากมีคนเข้ามาที่ url นี้ จะให้โชว์หน้าเว็บอะไร',
        ['html', 'nginx'],
      ),
      info('devops-sites-available', 'sites-available', 'sites-available', 'ใช้เก็บ config เว็บ', ['html', 'nginx']),
      info('devops-sites-enabled', 'sites-enabled', 'sites-enabled', 'ใช้เก็บ config ที่เปิดใช้งานจริง', ['html', 'nginx']),
      code(
        'devops-html-nginx-config',
        'Nginx Static HTML Config',
        `server {
    listen 80;
    listen [::]:80;

    server_name <โดเมน> <urlเว็บ>;
    
    root /var/www/<โฟลเดอร์เว็บ>;
        index index.html;

    location / {
\ttry_files $uri $uri/ =404;
    }
}`,
        'text',
        undefined,
        ['html', 'nginx', 'config'],
      ),
      command('devops-nginx-ln-s', 'ln -s', 'sudo ln -s', 'ใช้สร้าง shortcut', ['linux', 'nginx', 'symlink']),
      command(
        'devops-html-enable-site',
        'Enable HTML Site',
        'sudo ln -s /etc/nginx/sites-available/<โฟลเดอร์เว็บ> /etc/nginx/sites-enabled/',
        'เปิดใช้งานเว็บ',
        ['html', 'nginx', 'symlink'],
      ),
      command('devops-html-nginx-test', 'Test Nginx Config', 'sudo nginx -t', 'เช็ค config เว็บ', ['html', 'nginx']),
      command('devops-html-nginx-reload', 'Reload Nginx', 'sudo systemctl reload nginx', 'รีโหลด nginx', ['html', 'nginx']),
      info('devops-html-ssl-heading', 'ขอ SSL', 'ขอ ssl', undefined, ['html', 'ssl']),
      command('devops-html-install-snapd', 'Install Snapd', 'sudo apt install snapd -y', 'ติดตั้ง snapd', ['html', 'ssl', 'certbot']),
      command('devops-html-snap-core', 'Install Snap Core', 'sudo snap install core', undefined, ['html', 'ssl', 'certbot']),
      command('devops-html-snap-refresh', 'Refresh Snap Core', 'sudo snap refresh core', undefined, ['html', 'ssl', 'certbot']),
      command(
        'devops-html-install-certbot',
        'Install Certbot',
        'sudo snap install --classic certbot',
        undefined,
        ['html', 'ssl', 'certbot'],
      ),
      command(
        'devops-html-certbot-symlink',
        'Link Certbot Binary',
        'sudo ln -s /snap/bin/certbot /usr/bin/certbot',
        undefined,
        ['html', 'ssl', 'certbot'],
      ),
      command(
        'devops-html-certbot-nginx',
        'Request SSL Certificate',
        'sudo certbot --nginx -d <โดเมน>',
        undefined,
        ['html', 'ssl', 'certbot'],
      ),
      command(
        'devops-html-certbot-renew-dry-run',
        'Test SSL Renewal',
        'sudo certbot renew --dry-run',
        undefined,
        ['html', 'ssl', 'certbot'],
      ),
    ],
  },
  {
    id: 'devops-nextjs-deploy',
    label: 'Next.js Deploy',
    description: 'Deploy Next.js ด้วย Node.js, PM2, Nginx reverse proxy และ SSL',
    snippets: [
      command(
        'devops-nextjs-install-nvm',
        'Install NVM',
        'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash',
        undefined,
        ['nextjs', 'nodejs', 'nvm'],
      ),
      command('devops-nextjs-source-bashrc', 'Reload Bash', 'source ~/.bashrc', 'รีโหลด bash', ['nextjs', 'nodejs', 'nvm']),
      command('devops-nextjs-nvm-install-lts', 'Install Latest LTS Node.js', 'nvm install --lts', 'ติดตั้ง nodejs', ['nextjs', 'nodejs', 'nvm']),
      command('devops-nextjs-nvm-use-lts', 'Use Latest LTS Node.js', 'nvm use --lts', undefined, ['nextjs', 'nodejs', 'nvm']),
      command(
        'devops-nextjs-nvm-default',
        'Set Default Node.js Version',
        "nvm alias default 'lts/*'",
        'ตั้งให้ใช้ nodejs เวอร์ชั่นล่าสุดเป็นค่าเริ่มต้น',
        ['nextjs', 'nodejs', 'nvm'],
      ),
      command('devops-nextjs-cd-var-www', 'Go to Web Directory', 'cd /var/www', undefined, ['nextjs', 'deploy']),
      command('devops-nextjs-git-clone', 'Clone Next.js Repository', 'git clone <url>', undefined, ['nextjs', 'deploy', 'git']),
      command('devops-nextjs-cd-repo', 'Enter Repository', 'cd <ชื่อ repo>', undefined, ['nextjs', 'deploy']),
      command('devops-nextjs-npm-install', 'Install Dependencies', 'npm install', undefined, ['nextjs', 'deploy', 'npm']),
      command('devops-nextjs-npm-build', 'Build Next.js App', 'npm run build', undefined, ['nextjs', 'deploy', 'npm']),
      command('devops-nextjs-npm-start', 'Start Next.js App', 'npm run start -- -p 3000', undefined, ['nextjs', 'deploy', 'npm']),
      info(
        'devops-pm2-info',
        'PM2',
        'PM2',
        'PM2 คือ process manager ที่ให้ app ทำงานอยู่เบื้องหลังได้',
        ['nextjs', 'pm2'],
      ),
      command('devops-pm2-install', 'Install PM2', 'npm install pm2@latest -g', undefined, ['nextjs', 'pm2', 'npm']),
      command(
        'devops-pm2-start-npm',
        'Start Next.js with PM2',
        'pm2 start npm --name "<ชื่อโฟลเดอร์เว็บ>" -- run start -- -p 3000',
        undefined,
        ['nextjs', 'pm2'],
      ),
      command('devops-pm2-status', 'PM2 Status', 'pm2 status', undefined, ['nextjs', 'pm2']),
      command('devops-pm2-logs', 'PM2 Logs', 'pm2 logs <ชื่อโฟลเดอร์เว็บ>', undefined, ['nextjs', 'pm2']),
      command('devops-pm2-stop', 'Stop PM2 App', 'pm2 stop <ชื่อโฟลเดอร์เว็บ>', undefined, ['nextjs', 'pm2']),
      command('devops-pm2-restart', 'Restart PM2 App', 'pm2 restart <ชื่อโฟลเดอร์เว็บ>', undefined, ['nextjs', 'pm2']),
      command('devops-pm2-delete', 'Delete PM2 App', 'pm2 delete <ชื่อโฟลเดอร์เว็บ>', undefined, ['nextjs', 'pm2']),
      command('devops-pm2-cd-repo', 'Open PM2 Config Directory', 'cd <ชื่อ repo>', undefined, ['nextjs', 'pm2']),
      command('devops-pm2-nano-ecosystem', 'Create PM2 Ecosystem Config', 'nano ecosystem.config.js', undefined, ['nextjs', 'pm2']),
      code(
        'devops-pm2-ecosystem-config',
        'ecosystem.config.js',
        `module.exports = {
  apps: [
    {
      name: "ชื่อโฟลเดอร์เว็บ",
      cwd: "/var/www/ชื่อโฟลเดอร์เว็บ",
      script: "npm",
      args: "run start -- -p 3000",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}`,
        'javascript',
        undefined,
        ['nextjs', 'pm2', 'config'],
      ),
      command('devops-pm2-start-ecosystem', 'Start PM2 Ecosystem Config', 'pm2 start ecosystem.config.js', undefined, ['nextjs', 'pm2']),
      command(
        'devops-pm2-startup',
        'Enable PM2 Startup',
        'pm2 startup',
        'ตั้งให้ pm2 กลับมาทงานหลังรีบูท',
        ['nextjs', 'pm2'],
      ),
      info('devops-pm2-startup-copy', 'PM2 Startup Follow-up', 'ก้อปคำสั่งที่มันให้มาแล้วรัน', undefined, ['nextjs', 'pm2']),
      command('devops-pm2-save', 'Save PM2 Process List', 'pm2 save', undefined, ['nextjs', 'pm2']),
      command(
        'devops-nextjs-nginx-edit',
        'เปิด Nginx Reverse Proxy Config',
        'sudo nano /etc/nginx/sites-available/<ชื่อเว็บ>',
        undefined,
        ['nextjs', 'nginx'],
      ),
      code(
        'devops-nextjs-nginx-config',
        'Nginx Next.js Reverse Proxy Config',
        `server {
    listen 80;
    listen [::]:80;

    server_name <โดเมน> <urlเว็บ>;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
        'text',
        undefined,
        ['nextjs', 'nginx', 'config'],
      ),
      command(
        'devops-nextjs-enable-site',
        'Enable Next.js Site',
        'sudo ln -s /etc/nginx/sites-available/<โฟลเดอร์เว็บ> /etc/nginx/sites-enabled/',
        'เปิดใช้งานเว็บ',
        ['nextjs', 'nginx', 'symlink'],
      ),
      command('devops-nextjs-nginx-test', 'Test Next.js Nginx Config', 'sudo nginx -t', undefined, ['nextjs', 'nginx']),
      command('devops-nextjs-nginx-reload', 'Reload Nginx for Next.js', 'sudo systemctl reload nginx', undefined, ['nextjs', 'nginx']),
      info('devops-nextjs-ssl-heading', 'ขอ SSL', 'ขอ ssl', undefined, ['nextjs', 'ssl']),
      command('devops-nextjs-install-snapd', 'Install Snapd', 'sudo apt install snapd -y', 'ติดตั้ง snapd', ['nextjs', 'ssl', 'certbot']),
      command('devops-nextjs-snap-core', 'Install Snap Core', 'sudo snap install core', undefined, ['nextjs', 'ssl', 'certbot']),
      command('devops-nextjs-snap-refresh', 'Refresh Snap Core', 'sudo snap refresh core', undefined, ['nextjs', 'ssl', 'certbot']),
      command(
        'devops-nextjs-install-certbot',
        'Install Certbot',
        'sudo snap install --classic certbot',
        undefined,
        ['nextjs', 'ssl', 'certbot'],
      ),
      command(
        'devops-nextjs-certbot-symlink',
        'Link Certbot Binary',
        'sudo ln -s /snap/bin/certbot /usr/bin/certbot',
        undefined,
        ['nextjs', 'ssl', 'certbot'],
      ),
      command(
        'devops-nextjs-certbot-nginx',
        'Request SSL Certificate',
        'sudo certbot --nginx -d <โดเมน>',
        undefined,
        ['nextjs', 'ssl', 'certbot'],
      ),
      command(
        'devops-nextjs-certbot-renew-dry-run',
        'Test SSL Renewal',
        'sudo certbot renew --dry-run',
        undefined,
        ['nextjs', 'ssl', 'certbot'],
      ),
      info(
        'devops-nextjs-update-heading',
        'หากมีการแก้ไขโค้ด ให้ push โค้ด',
        'หากมีการแก้ไขโค้ด ให้ push โค้ด',
        undefined,
        ['nextjs', 'update'],
      ),
      command('devops-nextjs-update-cd', 'Go to Deployed Repository', 'cd /var/www/ชื่อโฟลเดอร์เว็บ', undefined, ['nextjs', 'update']),
      command('devops-nextjs-update-pull', 'Pull Latest Code', 'git pull origin main', undefined, ['nextjs', 'update', 'git']),
      command('devops-nextjs-update-build', 'Build Updated App', 'npm run build', undefined, ['nextjs', 'update', 'npm']),
      command('devops-nextjs-update-restart', 'Restart Updated App', 'pm2 restart <ชื่อโฟลเดอร์เว็บ>', undefined, ['nextjs', 'update', 'pm2']),
    ],
  },
  {
    id: 'devops-docker-deploy',
    label: 'Docker Deploy',
    description: 'ติดตั้ง Docker, clone โปรเจคด้วย SSH และรันด้วย Docker Compose',
    snippets: [
      command('devops-docker-install-prerequisites', 'Install Docker Prerequisites', 'sudo apt install ca-certificates curl -y', undefined, ['docker', 'install']),
      command('devops-docker-create-keyrings', 'Create APT Keyrings Directory', 'sudo install -m 0755 -d /etc/apt/keyrings', undefined, ['docker', 'install']),
      command(
        'devops-docker-download-gpg',
        'Download Docker GPG Key',
        'sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc',
        undefined,
        ['docker', 'install', 'security'],
      ),
      command('devops-docker-chmod-gpg', 'Set Docker GPG Key Permissions', 'sudo chmod a+r /etc/apt/keyrings/docker.asc', undefined, ['docker', 'install']),
      code(
        'devops-docker-apt-source',
        'Add Docker APT Repository',
        `sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "\${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF`,
        'bash',
        undefined,
        ['docker', 'install', 'repository'],
      ),
      command(
        'devops-docker-install-engine',
        'Install Docker Engine and Compose',
        'sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y',
        undefined,
        ['docker', 'install'],
      ),
      command('devops-docker-ssh-keygen', 'Generate GitHub SSH Key', 'ssh-keygen -t ed25519 -C "vixvify-vps"', undefined, ['docker', 'ssh', 'github']),
      command('devops-docker-show-ssh-public-key', 'Show SSH Public Key', 'cat ~/.ssh/id_ed25519.pub', undefined, ['docker', 'ssh', 'github']),
      info(
        'devops-docker-add-github-key',
        'เพิ่ม SSH Key เข้า GitHub',
        'เพิ่ม key เข้า GitHub ที่ SSH Keys settings',
        undefined,
        ['docker', 'ssh', 'github'],
      ),
      command('devops-docker-cd-apps', 'Go to Apps Directory', 'cd home/vixvify/apps', undefined, ['docker', 'deploy']),
      command('devops-docker-git-clone', 'Clone Repository over SSH', 'git clone git@github.com:vixvify/reponame', undefined, ['docker', 'deploy', 'git']),
      command('devops-docker-cd-repo', 'Enter Docker Repository', 'cd reponame', undefined, ['docker', 'deploy']),
      command('devops-docker-env', 'Edit Environment Variables', 'nano .env', undefined, ['docker', 'deploy', 'environment']),
      command('devops-docker-compose-up', 'Build and Start Docker Compose', 'docker compose up -d --build', undefined, ['docker', 'deploy', 'compose']),
      command(
        'devops-docker-nginx-edit',
        'เปิด Nginx Reverse Proxy Config',
        'sudo nano /etc/nginx/sites-available/<ชื่อเว็บ>',
        undefined,
        ['docker', 'nginx'],
      ),
      code(
        'devops-docker-nginx-config',
        'Nginx Docker Reverse Proxy Config',
        `server {
    listen 80;
    listen [::]:80;

    server_name <โดเมน> <urlเว็บ>;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
        'text',
        undefined,
        ['docker', 'nginx', 'config'],
      ),
      command(
        'devops-docker-enable-site',
        'Enable Docker Site',
        'sudo ln -s /etc/nginx/sites-available/<โฟลเดอร์เว็บ> /etc/nginx/sites-enabled/',
        'เปิดใช้งานเว็บ',
        ['docker', 'nginx', 'symlink'],
      ),
      command('devops-docker-nginx-test', 'Test Docker Nginx Config', 'sudo nginx -t', undefined, ['docker', 'nginx']),
      command('devops-docker-nginx-reload', 'Reload Nginx for Docker', 'sudo systemctl reload nginx', undefined, ['docker', 'nginx']),
    ],
  },
  {
    id: 'devops-portainer',
    label: 'Portainer',
    description: 'ติดตั้งและเปิดใช้งาน Portainer สำหรับจัดการ Docker ผ่านหน้าเว็บ',
    snippets: [
      command('devops-portainer-volume', 'Create Portainer Volume', 'sudo docker volume create portainer_data', undefined, ['docker', 'portainer']),
      code(
        'devops-portainer-run',
        'Run Portainer',
        `sudo docker run -d \\
  -p 8000:8000 \\
  -p 9443:9443 \\
  --name portainer \\
  --restart=always \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v portainer_data:/data \\
  portainer/portainer-ce:lts`,
        'bash',
        undefined,
        ['docker', 'portainer'],
      ),
      command('devops-portainer-ufw', 'Allow Portainer HTTPS', 'sudo ufw allow 9443/tcp', undefined, ['docker', 'portainer', 'ufw']),
      command('devops-portainer-logs', 'View Portainer Logs', 'sudo docker logs portainer', undefined, ['docker', 'portainer', 'diagnostics']),
    ],
  },
  {
    id: 'devops-nginx-ratelimit',
    label: 'Nginx Rate Limit',
    description: 'จำกัดจำนวน request ที่เข้ามายัง API ผ่าน Nginx',
    snippets: [
      command('devops-ratelimit-nginx-edit', 'เปิด Nginx Main Config', 'sudo nano /etc/nginx/nginx.conf', undefined, ['nginx', 'ratelimit']),
      command(
        'devops-ratelimit-zone',
        'Define API Rate Limit Zone',
        'limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;',
        undefined,
        ['nginx', 'ratelimit', 'api'],
      ),
      command(
        'devops-ratelimit-site-edit',
        'เปิด Nginx Site Config',
        'sudo nano /etc/nginx/sites-available/<ชื่อเว็บ>',
        undefined,
        ['nginx', 'ratelimit'],
      ),
      command(
        'devops-ratelimit-apply',
        'Apply API Rate Limit',
        'limit_req zone=api_limit burst=20 nodelay;',
        undefined,
        ['nginx', 'ratelimit', 'api'],
      ),
    ],
  },
]

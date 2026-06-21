import type { SnippetGroup } from '../domain/snippet'

const now = Date.now()

const nextjsTree = `my-nextjs-app/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   └── input.tsx
│   │   └── layout/
│   │       ├── header.tsx
│   │       └── sidebar.tsx
│   │
│   ├── core/
│   │   ├── constants/
│   │   ├── domain/
│   │   ├── ports/
│   │   ├── schema/
│   │   └── service/
│   │
│   ├── infra/
│   │   ├── interface/
│   │   ├── repositories/
│   │   └── container.ts
│   │
│   ├── lib/
│   ├── store/
│   └── utils/
│
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json`

const nextjsMkdir = `mkdir src\\components
mkdir src\\core
mkdir src\\infra
mkdir src\\lib
mkdir src\\store
mkdir src\\utils

mkdir src\\core\\constants
mkdir src\\core\\domain
mkdir src\\core\\ports
mkdir src\\core\\schema
mkdir src\\core\\service

mkdir src\\infra\\interface
mkdir src\\infra\\repositories`

const goTree = `my-go-app/
├── cmd/
│   └── main.go
│
├── internal/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── user.go
│   │   └── ports/
│   │       ├── user_repository.go
│   │       └── user_service.go
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── db.go
│   │   └── repository/
│   │       └── user_repository_impl.go
│   │
│   ├── presentation/
│   │   ├── dto/
│   │   │   └── user_dto.go
│   │   ├── handler/
│   │   │   └── user_handler.go
│   │   ├── mapper/
│   │   │   └── user_mapper.go
│   │   └── routes/
│   │       └── routes.go
│   │
│   ├── service/
│   │   └── user_service_impl.go
│   │
│   └── shared/
│       ├── errors/
│       ├── middleware/
│       ├── response/
│       └── utils/
│
├── go.mod
├── go.sum
└── .air.toml`

const goMkdir = `mkdir cmd
echo. > cmd\\main.go

mkdir internal

mkdir internal\\domain
mkdir internal\\domain\\entities
mkdir internal\\domain\\ports

mkdir internal\\infrastructure
mkdir internal\\infrastructure\\database
mkdir internal\\infrastructure\\repository

mkdir internal\\presentation
mkdir internal\\presentation\\dto
mkdir internal\\presentation\\handler
mkdir internal\\presentation\\mapper
mkdir internal\\presentation\\routes

mkdir internal\\service

mkdir internal\\shared
mkdir internal\\shared\\errors
mkdir internal\\shared\\middleware
mkdir internal\\shared\\response
mkdir internal\\shared\\utils`

const elysiaTree = `my-elysia-app/
├── src/
│   ├── core/
│   │   ├── config/
│   │   │   └── env.ts
│   │   ├── error/
│   │   │   └── handler.ts
│   │   ├── interceptor/
│   │   ├── plugin/
│   │   │   └── cors.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       └── response.ts
│   │
│   ├── infrastructure/
│   │   └── database/
│   │       └── prisma.ts
│   │
│   ├── lib/
│   ├── middleware/
│   │   └── auth.ts
│   │
│   ├── modules/
│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.service.ts
│   │       ├── user.schema.ts
│   │       └── user.route.ts
│   │
│   ├── routes/
│   │   └── index.ts
│   │
│   └── server/
│       └── index.ts
│
├── index.ts
├── package.json
└── tsconfig.json`

const elysiaMkdir = `mkdir src\\core
mkdir src\\infrastructure
mkdir src\\lib
mkdir src\\middleware
mkdir src\\modules
mkdir src\\routes
mkdir src\\server
mkdir src\\core\\config
mkdir src\\core\\error
mkdir src\\core\\interceptor
mkdir src\\core\\plugin
mkdir src\\core\\types
mkdir src\\core\\utils`

export const folderStructureGroups: SnippetGroup[] = [
  {
    id: 'fs-nextjs',
    label: 'Next.js App Router',
    description: 'โครงสร้าง folder สำหรับ Next.js 15+ พร้อม clean architecture',
    snippets: [
      {
        id: 'fs-nextjs-1',
        title: 'Next.js Full Structure (Visual)',
        description: 'โครงสร้าง folder แบบ clean architecture สำหรับ Next.js App Router — components, core, infra, lib, store, utils',
        type: 'tree',
        language: 'text',
        content: nextjsTree,
        tags: ['nextjs', 'structure', 'folder', 'clean-arch'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'fs-nextjs-2',
        title: 'Next.js mkdir Commands (Windows)',
        description: 'คำสั่ง mkdir สร้าง folder structure สำหรับ Next.js บน Windows',
        type: 'command',
        language: 'bash',
        content: nextjsMkdir,
        tags: ['nextjs', 'mkdir', 'windows', 'setup'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
  {
    id: 'fs-go',
    label: 'Go Clean Architecture',
    description: 'โครงสร้าง folder แบบ Clean Architecture สำหรับ Go backend',
    snippets: [
      {
        id: 'fs-go-1',
        title: 'Go Clean Architecture (Visual)',
        description: 'โครงสร้าง folder ตาม Clean Architecture: domain, infrastructure, presentation, service, shared',
        type: 'tree',
        language: 'text',
        content: goTree,
        tags: ['go', 'structure', 'folder', 'clean-arch'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'fs-go-2',
        title: 'Go mkdir Commands (Windows)',
        description: 'คำสั่ง mkdir สร้าง folder structure สำหรับ Go บน Windows',
        type: 'command',
        language: 'bash',
        content: goMkdir,
        tags: ['go', 'mkdir', 'windows', 'setup'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
  {
    id: 'fs-elysia',
    label: 'Elysia (Bun)',
    description: 'โครงสร้าง folder สำหรับ Elysia backend ด้วย Bun',
    snippets: [
      {
        id: 'fs-elysia-1',
        title: 'Elysia Full Structure (Visual)',
        description: 'โครงสร้าง folder สำหรับ Elysia API แบบ modular: core, infrastructure, modules, middleware, routes',
        type: 'tree',
        language: 'text',
        content: elysiaTree,
        tags: ['elysia', 'bun', 'structure', 'folder'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'fs-elysia-2',
        title: 'Elysia mkdir Commands (Windows)',
        description: 'คำสั่ง mkdir สร้าง folder structure สำหรับ Elysia บน Windows',
        type: 'command',
        language: 'bash',
        content: elysiaMkdir,
        tags: ['elysia', 'mkdir', 'windows', 'setup'],
        createdAt: now,
        updatedAt: now,
      },
    ],
  },
]

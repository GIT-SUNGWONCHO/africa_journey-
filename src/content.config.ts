import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 실전 꿀팁 컬렉션 — 마크다운 1개 = 꿀팁 1개.
// 카테고리: transport(이동) / haggle(흥정) / food(음식) / money(환전·팁) / prep(유심·비자·접종) / etc
const tips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tips' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['safari', 'transport', 'zanzibar', 'haggle', 'food', 'money', 'prep', 'etc']),
    summary: z.string(),
    price: z.string().optional(),    // 실제 협상가/가격
    contact: z.string().optional(),  // 왓츠앱 번호 등
    location: z.string().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { tips };

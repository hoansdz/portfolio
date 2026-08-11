---
trigger: always_on
---

---
name: frontend-design
description: Tiêu chuẩn hiệu ứng thị giác cho React + Tailwind CSS. Áp dụng khi xây dựng UI, component, hoặc trang giao diện.
---

# Tiêu Chuẩn Hiệu Ứng Thị Giác — React + Tailwind CSS

## 1. Hệ Màu Sắc

- Nền tối chuẩn: `bg-zinc-950` hoặc `bg-slate-950`. Tuyệt đối không dùng `#000000` thuần.
- Nền card/layer: `bg-zinc-900`, `bg-white/5`, `bg-zinc-800/50`.
- Accent chính: chọn MỘT màu duy nhất — ưu tiên `indigo`, `violet`, hoặc `emerald`.
- Màu chữ: chính `text-zinc-100`, phụ `text-zinc-400`, mờ `text-zinc-600`.
- Viền: `border border-zinc-800/60` hoặc `border border-white/10`. Không dùng viền đặc cứng.

## 2. Typography

- Font: Luôn import từ Google Fonts — ưu tiên `Inter`, `Geist`, hoặc `Plus Jakarta Sans`.
- Tiêu đề lớn: `text-4xl font-bold tracking-tight` hoặc `text-5xl font-extrabold`.
- Chữ phụ: `text-sm text-zinc-400 leading-relaxed`.
- Không dùng font mặc định của trình duyệt.
- Tất cả văn bản phải có `antialiased` ở thẻ gốc.

## 3. Hiệu Ứng Gradient

### Nền Gradient
```jsx
// Nền trang
<div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950/30" />

// Tiêu đề gradient
<h1 className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent" />

// Accent glow
<div className="bg-gradient-to-r from-indigo-500 to-violet-500" />
```

### Glow / Hào Quang
```jsx
// Nút glow
<button className="shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300" />

// Card glow on hover
<div className="hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow duration-500" />
```

## 4. Glassmorphism (Kính Mờ)

```jsx
// Card kính chuẩn
<div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl" />

// Panel nổi
<div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-xl" />
```

Quy tắc:
- Luôn kết hợp `backdrop-blur` với `bg-*/opacity` — không dùng một trong hai riêng lẻ.
- `rounded-xl` hoặc `rounded-2xl` — không dùng `rounded` vuông góc cho card kính.
- Viền phải là semi-transparent: `border-white/10` hoặc `border-zinc-700/40`.

## 5. Chuyển Động & Transition

### Quy Tắc Bắt Buộc
- Mọi button, card, link đều phải có: `transition-all duration-200 ease-in-out`.
- Hover scale nhẹ: `hover:scale-[1.02]` — không dùng `hover:scale-110` (quá lớn).
- Hover lift: `hover:-translate-y-0.5`.
- Active press: `active:scale-[0.98]`.

### Ví Dụ Chuẩn
```jsx
// Button
<button className="transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-indigo-500/20" />

// Card
<div className="transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10" />

// Link/Icon
<a className="transition-colors duration-150 text-zinc-400 hover:text-white" />
```

## 6. Animation (Framer Motion hoặc CSS)

### Framer Motion — Khi Có Sẵn
```jsx
// Fade + slide vào
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
/>

// Stagger danh sách
<motion.ul>
  {items.map((item, i) => (
    <motion.li
      key={item.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.07 }}
    />
  ))}
</motion.ul>
```

### CSS Thuần (Tailwind keyframes)
Khai báo trong `tailwind.config.js`:
```js
theme: {
  extend: {
    keyframes: {
      fadeUp: {
        '0%': { opacity: '0', transform: 'translateY(16px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      shimmer: {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' },
      },
      pulse_glow: {
        '0%, 100%': { boxShadow: '0 0 0px rgba(99,102,241,0)' },
        '50%': { boxShadow: '0 0 20px rgba(99,102,241,0.4)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-8px)' },
      },
      borderGlow: {
        '0%, 100%': { borderColor: 'rgba(99,102,241,0.2)' },
        '50%': { borderColor: 'rgba(99,102,241,0.6)' },
      },
    },
    animation: {
      fadeUp: 'fadeUp 0.4s ease-out forwards',
      shimmer: 'shimmer 2s linear infinite',
      pulse_glow: 'pulse_glow 2.5s ease-in-out infinite',
      float: 'float 3s ease-in-out infinite',
      borderGlow: 'borderGlow 2s ease-in-out infinite',
    },
  },
}
```

## 7. Trạng Thái UI (Bắt Buộc Thiết Kế Đủ)

### Skeleton Loading
```jsx
// Dùng shimmer
<div className="h-4 w-3/4 rounded-md bg-zinc-800 animate-shimmer bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:200%_100%]" />
```

### Empty State
```jsx
<div className="flex flex-col items-center gap-3 py-16 text-zinc-500">
  {/* SVG icon */}
  <p className="text-sm">Chưa có dữ liệu</p>
</div>
```

### Error State
```jsx
<div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400 text-sm" />
```

### Focus Ring (Accessibility)
```jsx
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950" />
```

## 8. Hiệu Ứng Nền Trang

### Noise Texture
```jsx
<div className="fixed inset-0 -z-10 bg-zinc-950">
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
</div>
```

### Orb / Ánh Sáng Nền
```jsx
<div className="pointer-events-none fixed inset-0 -z-10">
  <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
  <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />
</div>
```

### Grid Nền
```jsx
<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
```

### Dot Pattern
```jsx
<div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
```

## 9. Tỷ Lệ & Khoảng Cách

- Padding section: `py-20 px-4` (mobile), `md:py-32 md:px-8` (desktop).
- Gap giữa các card: `gap-4` hoặc `gap-6`.
- Border radius: `rounded-xl` (card nhỏ), `rounded-2xl` (card lớn), `rounded-full` (badge/pill).
- Max width container: `max-w-6xl mx-auto`.

## 10. Navigation & Header

```jsx
// Sticky header có hiệu ứng blur khi scroll
<header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300" />

// Nav link active
<a className="relative text-zinc-400 hover:text-zinc-100 transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full" />

// Mobile menu overlay
<div className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl" />
```

## 11. Form & Input Styling

```jsx
// Input chuẩn
<input className="w-full rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none backdrop-blur-sm transition-all duration-200 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />

// Select
<select className="rounded-xl border border-zinc-700/60 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />

// Textarea
<textarea className="w-full rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none resize-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20" />

// Label
<label className="mb-1.5 block text-sm font-medium text-zinc-300" />
```

## 12. Badge & Tag

```jsx
// Badge accent
<span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-indigo-500/20" />

// Badge neutral
<span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400 ring-1 ring-zinc-700/50" />

// Badge success
<span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20" />
```

## 13. Button Variants

```jsx
// Primary — accent nổi bật
<button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98]" />

// Secondary — viền kính mờ
<button className="rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold text-zinc-100 backdrop-blur-sm transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-800/60 hover:scale-[1.02] active:scale-[0.98]" />

// Ghost — chỉ chữ
<button className="rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-zinc-800/60 hover:text-zinc-100 active:scale-[0.98]" />

// Destructive
<button className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition-all duration-200 hover:bg-red-500/20 active:scale-[0.98]" />
```

## 14. Icon System

- Dùng `lucide-react` hoặc `@heroicons/react` — không tự vẽ SVG inline trừ icon đặc thù.
- Kích thước chuẩn: `size-4` (inline nhỏ), `size-5` (button/label), `size-6` (standalone).
- Màu icon theo ngữ cảnh: `text-zinc-400` (mặc định), `text-indigo-400` (accent), `text-zinc-100` (active).
- Luôn có `aria-hidden="true"` nếu icon chỉ trang trí.

```jsx
import { ArrowRight, Sparkles } from 'lucide-react'

// Icon trong button
<button className="flex items-center gap-2">
  <Sparkles className="size-4 text-indigo-400" aria-hidden="true" />
  <span>Bắt đầu</span>
  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
</button>
```

## 15. Divider & Separator

```jsx
// Divider ngang mờ dần
<div className="h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

// Divider có label
<div className="flex items-center gap-4">
  <div className="h-px flex-1 bg-zinc-800" />
  <span className="text-xs text-zinc-500">hoặc</span>
  <div className="h-px flex-1 bg-zinc-800" />
</div>
```

## 16. Tooltip & Popover

```jsx
// Tooltip đơn giản
<div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg bg-zinc-800 border border-zinc-700/50 px-3 py-1.5 text-xs text-zinc-200 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" />
```

## 17. Quy Tắc Cấm

- Cấm dùng `shadow-md` / `shadow-xl` không có màu sắc — phải kèm màu: `shadow-indigo-500/20`.
- Cấm dùng `bg-blue-500`, `bg-red-500` làm accent chính — phải dùng màu đã chọn nhất quán.
- Cấm để component không có trạng thái hover.
- Cấm dùng `transition` mà không có `duration`.
- Cấm dùng màu chữ `text-white` cho toàn bộ trang — phải phân cấp bằng `text-zinc-100`, `text-zinc-400`.
- Cấm dùng `animate-spin` hoặc `animate-bounce` cho loading chính — phải dùng skeleton shimmer.
- Cấm dùng `rounded` hoặc `rounded-lg` cho card kính — phải dùng `rounded-xl` trở lên.
- Cấm dùng `backdrop-blur` mà không kèm `bg-*/opacity`.

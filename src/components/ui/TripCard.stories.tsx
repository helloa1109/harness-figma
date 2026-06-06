import type { Meta, StoryObj } from "@storybook/react-vite";
import { TripCard } from "./TripCard";

const meta: Meta<typeof TripCard> = {
  title: "UI/TripCard",
  component: TripCard,
  tags: ["autodocs"],
  argTypes: {
    image: { control: "text" },
    title: { control: "text" },
    location: { control: "text" },
    rating: { control: { type: "number", min: 0, max: 5, step: 0.1 } },
    reviewCount: { control: "text" },
    price: { control: "text" },
    duration: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TripCard>;

export const Default: Story = {
  args: {
    image: "https://picsum.photos/seed/jeju/600/360",
    title: "제주 한라산",
    location: "한국 제주 · 자연 속에서 힐링",
    rating: 4.8,
    reviewCount: "1.2k",
    price: "₩89,000",
    duration: "3일",
  },
};

export const NoImage: Story = {
  args: {
    title: "제주 한라산",
    location: "한국 제주 · 자연 속에서 힐링",
    rating: 4.8,
    reviewCount: "1.2k",
    price: "₩89,000",
    duration: "3일",
  },
};

export const Minimal: Story = {
  args: {
    image: "https://picsum.photos/seed/tokyo/600/360",
    title: "도쿄 시부야",
    location: "일본 도쿄",
    rating: 4.5,
    reviewCount: "856",
    price: "₩320,000",
  },
};

export const LongText: Story = {
  args: {
    image: "https://picsum.photos/seed/swiss/600/360",
    title: "스위스 인터라켄 알프스 트레킹 풀패키지",
    location: "스위스 베른주 · 융프라우 인근 산악 트레킹 코스",
    rating: 4.9,
    reviewCount: "12.4k",
    price: "₩2,890,000",
    duration: "7일",
  },
};

export const DarkMode: Story = {
  args: {
    image: "https://picsum.photos/seed/jeju/600/360",
    title: "제주 한라산",
    location: "한국 제주 · 자연 속에서 힐링",
    rating: 4.8,
    reviewCount: "1.2k",
    price: "₩89,000",
    duration: "3일",
  },
  parameters: {
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#171717" }] },
  },
  decorators: [
    (Story) => (
      <div style={{ colorScheme: "dark", padding: "var(--space-lg)" }}>
        <Story />
      </div>
    ),
  ],
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 20rem)",
        gap: "var(--space-md)",
      }}
    >
      <TripCard
        image="https://picsum.photos/seed/jeju/600/360"
        title="제주 한라산"
        location="한국 제주"
        rating={4.8}
        reviewCount="1.2k"
        price="₩89,000"
        duration="3일"
      />
      <TripCard
        image="https://picsum.photos/seed/tokyo/600/360"
        title="도쿄 시부야"
        location="일본 도쿄"
        rating={4.5}
        reviewCount="856"
        price="₩320,000"
        duration="4일"
      />
      <TripCard
        image="https://picsum.photos/seed/paris/600/360"
        title="파리 에펠탑"
        location="프랑스 파리"
        rating={4.9}
        reviewCount="3.4k"
        price="₩1,200,000"
        duration="5일"
      />
    </div>
  ),
};

import LayoutWrapper from "@/components/wrapper/LayoutWrapper";

export const metadata = {
  title: "Geeta Personality Portal | Psychometric Assessments",
  description: "Scientifically backed psychometric assessments by Geeta University to discover your strengths and career pathways.",
};

export default function MainLayout({ children }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}

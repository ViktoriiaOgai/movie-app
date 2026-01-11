"use client";

import { Layout } from "antd";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Layout.Content
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
}

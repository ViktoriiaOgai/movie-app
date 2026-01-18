"use client";

import { Layout } from "antd";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Layout.Content>
        {children}
      </Layout.Content>
    </Layout>
  );
}

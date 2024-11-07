"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StyledComponentsRegistry from "../../lib/registry";
import Footer from "./components/footer/footer";
import Header from "./components/Header/header";
import GlobalStyle from "./globalsStyled";
import { ProductProvider } from "./context/Product";
import useIsCheckoutPage from "./utils/useIsCheckoutPage";

export default function RootLayout({ children }) {
  const isCheckoutPage = useIsCheckoutPage();

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <StyledComponentsRegistry>
            <GlobalStyle />
            <ProductProvider>
              <Header />
              <main>{children}</main>
              {!isCheckoutPage && <Footer />}
            </ProductProvider>
          </StyledComponentsRegistry>
        </AntdRegistry>
      </body>
    </html>
  );
}

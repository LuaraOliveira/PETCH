import { Route as RouteDOM } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";


export function Route({
    hasHeader = true,
    hasFooter = true,
    ...rest
}) {
    return (
        <>
            {hasHeader && <Header />}
            <RouteDOM {...rest} />
            {hasFooter && <Footer />}
        </>
    )
}